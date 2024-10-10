import dynamic from "next/dynamic"
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { PopupContext } from "./_app"
import { getNewest } from "../controller/post"
import { getTrendingPost, getStickyPost } from "../controller/homepage"
import Head from "next/head"
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

function Newest(props) {
  const { data, trendingPost, stickyPost, lastPage } = props
  const { setNewestPost, popupStatus, setPopupStatus } =
    useContext(PopupContext)
  const [displayPosts, setDisplayPosts] = useState(data)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const isTouchDevice = useIsTouchDevice()
  const title = "Bài viết mới nhất"

  useEffect(() => {
    setPopupStatus({
      ...popupStatus,
      newestPopup: false,
      categoryPopup: false,
    })
    setNewestPost(stickyPost)
  }, [])

  const loadMore = async () => {
    setIsLoading(true)
    const page = currentPage + 1
    if (page <= lastPage) {
      const postData = await getNewest({
        page,
        includeSnippet: true,
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
        <title>{`${title} - ${process.env.siteTitle}`}</title>
        <meta
          property="og:title"
          content={`${title} - ${process.env.siteTitle}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta
          property="og:image"
          content={data[0]?.thumbnail || process.env.DEFAULT_THUMBNAIL_URL}
        />
        <meta property="og:description" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={title} />
        <meta name="description" content={title}></meta>
        <meta
          name="twitter:image"
          content={data[0]?.thumbnail || process.env.DEFAULT_THUMBNAIL_URL}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="container-lg">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className={"my-3"}>
              <div className="txt-gray category-title px-3 py-1 d-flex">
                <Image
                  src="/images/star_category.svg"
                  alt="star icon"
                  width="20"
                  height="20"
                  className="my-auto me-2 "
                />
                <div>Bài viết mới nhất</div>
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

              {displayPosts.slice(10, data.length + 1).map((e, i) => (
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
          </div>
          <div className="col-0 col-lg-3">
            <AdvertisementDynamic />
          </div>
        </div>
      </div>
      <NotificationContainer />
    </>
  )
}

export async function getServerSideProps(ctx) {
  try {
    const { page = 1 } = ctx.query
    const stickyPost = await getStickyPost()
    const { data: trendingPost } = await getTrendingPost()
    const { data, lastPage } = await getNewest({ page, includeSnippet: true })
    return {
      props: {
        data,
        stickyPost,
        trendingPost,
        lastPage,
      },
    }
  } catch (error) {
    console.log("error====", error)
    return {
      notFound: true,
    }
  }
}

export default Newest
