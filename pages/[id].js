import Layout from "../components/layout"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { PopupContext } from "./_app"
const PostDetailDynamic = dynamic(() =>
  import("../components/post/post-detail")
)
const RelatedPostDynamic = dynamic(() =>
  import("../components/post/related-post")
)
const NotMissDynamic = dynamic(() => import("../components/home/NotMiss"))
import Head from "next/head"
import { format_Date_YYYYMMDD } from "../utils/dateHandler"
import HomepageController from "../controller/homepage"
import CONST from "../utils/const"
import useIsTouchDevice from "../utils/useMobileDetect"
const CategoryFirstPostSectionDynamic = dynamic(() =>
  import("./../components/home/category-first-post-section")
)
const ArticleHorizontalDynamic = dynamic(() =>
  import("../components/common/article-horizontal")
)
const YoutubeVideoDynamic = dynamic(() => import("../components/VideoYoutube"))
const PostSliderDynamic = dynamic(() =>
  import("./../components/home/post-slider")
)
const ArticleLGDynamic = dynamic(() =>
  import("../components/common/article-lg")
)
const AdvertisementDynamic = dynamic(() =>
  import("./../components/common/advertisement")
)
import ButtonLoading from "./../components/button/ButtonLoading"
import ButtonPlus from "../components/button/ButtonPlus"
import { dataYoutubeVideo } from "../mocks/data"
import { NotificationContainer, NotificationManager } from "react-notifications"

function DetailArticle(props) {
  const { setNewestPost, popupStatus, setPopupStatus } =
    useContext(PopupContext)
  const {
    data,
    contentType,
    trendingPost,
    id,
    stickyPost,
    last_page,
    categoryID,
  } = props
  const [displayPosts, setDisplayPosts] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  setNewestPost(stickyPost)
  const isPostPage = contentType === "post"
  const thumbnail = isPostPage
    ? data.attach_count === 0
      ? process.env.DEFAULT_THUMBNAIL_URL
      : data?.Attachments?.[0]?.thumbnail_url
    : data.length > 0
    ? data[0]?.thumbnail
    : process.env.DEFAULT_THUMBNAIL_URL
  const isTouchDevice = useIsTouchDevice()

  const json_data = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    "@id": data?.view_url,
    headline: data?.Thread?.title,
    articleBody: data?.message,
    articleSection: data?.Forum?.title,
    author: {
      "@type": data?.User?.user_title,
      name: data?.User?.username,
    },
    datePublished: format_Date_YYYYMMDD(data?.post_date),
    dateModified: format_Date_YYYYMMDD(data?.last_edit_date),
    image: thumbnail,
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: "https://schema.org/ReplyAction",
      userInteractionCount: 0,
    },
    publisher: {
      "@type": "Organization",
      name: process.env.siteTitle,
      logo: {
        "@type": "ImageObject",
        url: process.env.DEFAULT_THUMBNAIL_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": process.env.SITE_URL,
    },
  }

  useEffect(() => {
    setPopupStatus({
      ...popupStatus,
      newestPopup: false,
      categoryPopup: false,
    })
  }, [])

  const getSnippet = (message) => {
    const matchSnippet = message.match(CONST.REGEX_PARTERN.SNIPPET)
    const snippet = matchSnippet ? matchSnippet[1] : ""
    return snippet
  }

  const loadMore = async () => {
    setIsLoading(true)
    const page = currentPage + 1
    if (page <= last_page) {
      const postData = await HomepageController.getPostByCategoryID({
        page,
        categoryID,
        includeSnippet: true,
        getHighlight: false,
        ordViewCount: false,
        withEndpoint: false,
      })

      setCurrentPage(page)
      setDisplayPosts([...displayPosts, ...postData.data])
    } else {
      NotificationManager.warning("Đã hết bài viết")
    }
    setIsLoading(false)
  }

  return (
    <>
      <Head>
        <title>{`${props.title} - ${process.env.siteTitle}`}</title>
        <meta
          property="og:title"
          content={isPostPage ? getSnippet(data?.message) : data[0]?.category}
        />
        <meta
          property="og:type"
          content={isPostPage ? "article" : "category"}
        />
        <meta property="og:url" content={`${process.env.SITE_URL}${id}`} />
        <meta property="og:image" content={thumbnail} />
        <meta
          name="description"
          content={
            isPostPage
              ? getSnippet(data?.message)
              : `category-${data[0]?.category}`
          }
        ></meta>
        <meta
          property="og:description"
          content={
            isPostPage
              ? getSnippet(data?.message)
              : `category-${data[0]?.category}`
          }
        />
        <meta
          name="twitter:title"
          content={isPostPage ? getSnippet(data?.message) : data[0]?.category}
        />
        <meta
          name="twitter:description"
          content={
            isPostPage
              ? getSnippet(data?.message)
              : `category-${data[0]?.category}`
          }
        />
        <meta name="twitter:image" content={thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="container-lg">
        <div className="row">
          <div className="col-lg-9 col-12">
            {isPostPage && (
              <>
                <PostDetailDynamic data={data} />
                {/* Bài viết liên quan */}
                <RelatedPostDynamic data={stickyPost} />
                {/* Đừng bỏ lỡ */}
                <NotMissDynamic data={trendingPost} />
              </>
            )}
            {!isPostPage && (
              <div className={"my-3"}>
                <div className="txt-gray category-title px-3 py-1 d-flex">
                  <Image
                    src="/images/star_category.svg"
                    alt="star icon"
                    width="20"
                    height="20"
                    className="my-auto me-2 "
                  />
                  <div>{data[0].category}</div>
                </div>
                <CategoryFirstPostSectionDynamic
                  data={displayPosts.slice(0, 5)}
                />
                {!isTouchDevice && (
                  <div
                    className="row bg-red g-0 my-4"
                    style={{ height: 3 }}
                  ></div>
                )}
                {/* Youtube video */}
                {!isTouchDevice && (
                  <YoutubeVideoDynamic data={dataYoutubeVideo} />
                )}
                {!isTouchDevice &&
                  displayPosts
                    .slice(5, 10)
                    .map((e, i) => (
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
                {/* Đừng bỏ lỡ */}
                <PostSliderDynamic
                  dataSelected={trendingPost}
                  isTouchDevice={isTouchDevice}
                  sliderTitle="ĐỪNG BỎ LỠ"
                  iconType="notmiss"
                />

                {displayPosts.slice(10, displayPosts.length + 1).map((e, i) => (
                  <>
                    {!isTouchDevice ? (
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
                    ) : (
                      <ArticleLGDynamic
                        isTouchDevice={isTouchDevice}
                        zoom={true}
                        showSummary={true}
                        position={i + 1}
                        key={i}
                        title={e.title}
                        category={e.category}
                        datetime={e.datetime}
                        summary={e.summary}
                        thumbnail={e.thumbnail}
                        url={e.url}
                        categoryUrl={e.category_url}
                      />
                    )}
                  </>
                ))}

                <div className="d-flex justify-content-center">
                  {!isLoading && (
                    <ButtonPlus
                      alt="Xem thêm"
                      className={`mt-3 ${!isTouchDevice ? "w-100" : ""}`}
                      loadMore={loadMore}
                    />
                  )}
                  {isLoading && <ButtonLoading />}
                </div>
              </div>
            )}
            <Head>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(json_data),
                }}
              ></script>
            </Head>
          </div>
          <div className="col-lg-3 col-0">
            <AdvertisementDynamic />
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(ctx) {
  const stickyPost = await HomepageController.getStickyPost()
  const { data: trendingPost } = await HomepageController.getTrendingPost()
  try {
    const { id, page = 1 } = ctx.query
    const threadID = id.split(".")[1].replace("t", "")
    const categoryID = id.split(".")[1].replace("f", "")
    const postRe = /(.*)\.t(.*)/gm
    const categoryRe = /(.*)\.f(.*)/gm
    if (postRe.test(id)) {
      const dataPost = await fetch(
        `${process.env.DEV_API_URL}/post/${threadID}`
      )
      const data = (await dataPost.json()) || {}
      const {
        Thread: { title },
      } = data
      return {
        props: {
          id,
          data: {
            ...data,
            message_parsed: data.message_parsed.replace(
              CONST.REGEX_PARTERN.SHARPEN_IMG,
              ""
            ),
          },
          title,
          contentType: "post",
          stickyPost,
          trendingPost,
        },
      }
    }

    if (categoryRe.test(id)) {
      const postData = await HomepageController.getPostByCategoryID({
        categoryID,
        includeSnippet: true,
        getHighlight: false,
        ordViewCount: false,
      })
      return {
        props: {
          title: postData.data[0]?.category,
          contentType: "category",
          stickyPost,
          trendingPost,
          id,
          categoryID,
          ...postData,
        },
      }
    }

    return {
      notFound: true,
    }
  } catch (error) {
    console.log("error====", error)
    return {
      notFound: true,
    }
    // return {
    //   props: {
    //     data: null,
    //     title: "Trang không tồn tại",
    //     contentType: "notfound",
    //   },
    // };
  }
}

export default DetailArticle
