import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import Layout from "../../components/layout"
import styles from "../../styles/Profile.module.css"
import HomepageController from "../../controller/homepage"
const ProfileMediaDynamic = dynamic(() =>
  import("../../components/members/profile-media")
)
const ProfileTimelineDynamic = dynamic(() =>
  import("../../components/members/profile-timeline")
)
import { useRouter } from "next/router"
const ProfileInfoDynamic = dynamic(() =>
  import("../../components/members/profile-info")
)
const AdvertisementDynamic = dynamic(() =>
  import("../../components/common/advertisement")
)
import Head from "next/head"
import { useContext } from "react"
import { PopupContext } from "../_app"

function ProfilePage(props) {
  const { dataInfo, title, contentType, thread = [], id, stickyPost } = props
  const { asPath } = useRouter()
  const [tabActive, setTabActive] = useState("timeline")
  const [listTags, setListTags] = useState([])
  const { setNewestPost } = useContext(PopupContext)
  setNewestPost(stickyPost)

  useEffect(() => {
    const tabActive = asPath.match(/#([a-z0-9]+)/gi)
    if (tabActive) {
      const tabName = tabActive[0].replace("#", "")
      if (["media", "timeline"].includes(tabName)) {
        setTabActive(tabName)
      }
    }
  }, [asPath])

  useEffect(() => {
    // set list tag
    if (Array.isArray(thread) && thread?.length !== 0) {
      const tags = thread.reduce(
        (current, next) => [...current, ...next.tags],
        []
      )
      setListTags([...new Set(tags)])
    }
  }, [thread])

  // const listTags = [
  //   "#BÀI HÁT HAY NHẤT",
  //   "Thế giới Showbiz",
  //   "Sao & Đời sống",
  //   "MC Trấn Thành",
  //   "HLV Park Hang Seo",
  // ];

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content={`${title} - ${process.env.siteTitle}`}
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content={`${process.env.SITE_URL}members/${id}`}
        />
        <meta property="og:image" content={dataInfo.avatar_urls?.o} />
        <meta property="og:description" content="Thông tin cá nhân" />
        <meta name="description" content="Thông tin cá nhân"></meta>
        <meta
          name="twitter:title"
          content={`${title} - ${process.env.siteTitle}`}
        />
        <meta name="twitter:description" content="Thông tin cá nhân" />
        <meta name="twitter:image" content={dataInfo.avatar_urls?.o} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      {contentType === "notfound" ? (
        <Layout title={`${title} - ${process.env.siteTitle}`}>
          Page is not found
        </Layout>
      ) : (
        <>
          {dataInfo && <ProfileInfoDynamic data={dataInfo} />}
          <div className="container-lg g-0">
            <div className="row">
              <div className="col-lg-9 col-12">
                <Layout title={`${title} - ${process.env.siteTitle}`}>
                  <ul className={styles.profile_tab + " nav nav-tabs mt-3"}>
                    <li
                      className={
                        tabActive === "timeline"
                          ? styles.profile_tab_active
                          : ""
                      }
                      onClick={() => setTabActive("timeline")}
                    >
                      <a data-toggle="tab" href="#timeline">
                        Tường nhà
                      </a>
                    </li>
                    <li
                      className={
                        tabActive === "media" ? styles.profile_tab_active : ""
                      }
                      onClick={() => setTabActive("media")}
                    >
                      <a data-toggle="tab" href="#media">
                        Album và ảnh
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="timeline"
                      className={
                        tabActive === "timeline"
                          ? "active"
                          : "fade" + " tab-pane"
                      }
                    >
                      {dataInfo && (
                        <ProfileTimelineDynamic
                          data={dataInfo}
                          tags={listTags}
                          thread={thread}
                        />
                      )}
                    </div>
                    <div
                      id="media"
                      className={
                        tabActive === "media" ? "active" : "fade" + " tab-pane"
                      }
                    >
                      <ProfileMediaDynamic />
                    </div>
                  </div>
                </Layout>
              </div>
              <div className="col-lg-3 col-0">
                <AdvertisementDynamic />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx) {
  try {
    const { id } = ctx.query
    const userID = id.split(".")[1]
    const stickyPost = await HomepageController.getStickyPost()

    const userInfo = await fetch(`${process.env.DEV_API_URL}/users/${userID}`)
    const data = (await userInfo.json()) || {}
    const thread = await fetch(`${process.env.DEV_API_URL}/profile/${userID}`)
    let threads = (await thread.json()) || []

    threads = threads.map((post) => {
      const {
        title,
        view_url,
        post_date,
        thread_id,
        snippet,
        tags,
        Forum: { title: forumTitle, view_url: forumViewUrl },
        User: { username, view_url: profile_url, avatar_urls, last_activity },
      } = post
      return {
        title,
        category: forumTitle,
        view_url: view_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
        original_url: view_url,
        category_url: forumViewUrl.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
        datetime: post_date,
        snippet,
        thumbnail: `${process.env.THUMBNAIL_URL_PREFIX}${thread_id}.jpg`,
        username,
        profile_url: profile_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
        avatar_urls,
        last_activity,
        tags,
      }
    })

    if (userID && !data.message) {
      return {
        props: {
          dataInfo: data,
          title: "Profile",
          thread: threads,
          id,
          stickyPost,
        },
      }
    }

    return {
      notFound: true,
    }
    // return {
    //   props: {
    //     dataInfo: null,
    //     title: "Trang không tồn tại",
    //     contentType: "notfound",
    //     thread: []
    //   },
    // };
  } catch (error) {
    // return {
    //   props: {
    //     data: null,
    //     title: "Trang không tồn tại",
    //     contentType: "notfound",
    //     thread: []
    //   },
    // };
    return {
      notFound: true,
    }
  }
}

export default ProfilePage
