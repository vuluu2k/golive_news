import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Head from "next/head"
const AdvertisementDynamic = dynamic(() =>
  import("./../components/common/advertisement")
)
const ArticleHorizontalDynamic = dynamic(() =>
  import("../components/common/article-horizontal")
)
import ButtonPlus from "../components/button/ButtonPlus"
import { useContext } from "react"
import { PopupContext } from "./_app"
import HomepageController from "../controller/homepage"

import { searchPostData } from "../mocks/data"

const Search = (props) => {
  const { keyword, stickyPost } = props
  const [foundPosts, setFoundPosts] = useState([])
  const { setNewestPost } = useContext(PopupContext)
  setNewestPost(stickyPost)
  useEffect(() => {
    if (!keyword) return
    setFoundPosts(
      searchPostData.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }, [])

  return (
    <>
      <Head>
        <title>{`Tìm kiếm - ${keyword} - ${process.env.siteTitle}`}</title>
        <meta
          property="og:title"
          content={`Tìm kiếm - ${keyword} - ${process.env.siteTitle}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta
          property="og:image"
          content={
            foundPosts[0]?.thumbnail || process.env.DEFAULT_THUMBNAIL_URL
          }
        />
        <meta
          property="og:description"
          content={`Tìm kiếm - ${keyword} - ${process.env.siteTitle}`}
        />
        <meta
          name="twitter:title"
          content={`Tìm kiếm - ${keyword} - ${process.env.siteTitle}`}
        />
        <meta
          name="twitter:description"
          content={`Tìm kiếm - ${keyword} - ${process.env.siteTitle}`}
        />
        <meta
          name="description"
          content={`Tìm kiếm - ${keyword} - ${process.env.siteTitle}`}
        ></meta>
        <meta
          name="twitter:image"
          content={
            foundPosts[0]?.thumbnail || process.env.DEFAULT_THUMBNAIL_URL
          }
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="container-lg">
        <div className="row mb-3">
          <div className="col-lg-9 col-12 mt-3">
            {foundPosts.length ? (
              <>
                <h3>{`Danh sách bài viết hiển thị cho '${keyword}'`}</h3>
                {foundPosts.map((e, i) => (
                  <ArticleHorizontalDynamic
                    key={i}
                    title={e.title}
                    srcImg={e.thumbnail}
                    musicText={e.category}
                    username={e.username}
                    time={e.datetime}
                    width={260}
                    height={180}
                    url={e.url}
                    categoryUrl={e.category_url}
                    profileUrl={e.profile_url}
                    border={true}
                  />
                ))}
                <div className="d-flex justify-content-center">
                  <ButtonPlus alt="Xem thêm" />
                </div>
              </>
            ) : (
              <h3>Không tìm thấy bài viết</h3>
            )}
          </div>
          <div className="col-lg-3 col-0">
            <AdvertisementDynamic />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  try {
    const stickyPost = await HomepageController.getStickyPost()
    const { keyword } = ctx.query
    return {
      props: {
        keyword,
        stickyPost,
      },
    }
  } catch (error) {
    console.log("error====", error)
    return {
      notFound: true,
    }
  }
}

export default Search
