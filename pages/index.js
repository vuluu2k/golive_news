import dynamic from "next/dynamic"
const NewestDynamic = dynamic(() => import("../components/home/newest"))
const PostSliderDynamic = dynamic(() =>
  import("../components/home/post-slider")
)
const ReadMostDynamic = dynamic(() => import("../components/home/ReadMost"))
const MovieEntertainmentDynamic = dynamic(() =>
  import("../components/home/MoviesEntertainment")
)
const YoutubeVideoDynamic = dynamic(() => import("../components/VideoYoutube"))
const NotMissDynamic = dynamic(() => import("../components/home/NotMiss"))
const GeneralInformationDynamic = dynamic(() =>
  import("../components/home/general-infomation")
)
const MostInterestedDynamic = dynamic(() =>
  import("../components/home/most-interested")
)
import useIsTouchDevice from "../utils/useMobileDetect"
const CategoryMobileDynamic = dynamic(() =>
  import("../components/home/categories-mobile")
)
import HomepageController from "../controller/homepage"
import { useContext, useEffect } from "react"
import { PopupContext } from "../pages/_app"
const AdvertisementDynamic = dynamic(() =>
  import("./../components/common/advertisement")
)
import Head from "next/head"
import { dataYoutubeVideo } from "../mocks/data"
import "react-notifications/lib/notifications.css"

// This gets called on every request
export async function getServerSideProps(ctx) {
  const stickyPost = await HomepageController.getStickyPost()
  const selectedPost = await HomepageController.getSelectedPost()
  const isMobileView = (
    ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent
  ).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)

  let generalData, trendingData, categoryData

  if (isMobileView) {
    const categories = process.env.categoryHomepage
    categoryData = await Promise.all(
      categories
        .filter((item) => item.display_on_homepage)
        .map(async (item) => {
          return {
            ...item,
            dataPost: await HomepageController.getPostByCategoryID({
              categoryID: item.categoryId,
              includeSnippet: true,
              getHighlight: true,
              ordViewCount: true,
            }),
          }
        })
    )
  } else {
    generalData = await HomepageController.getPostByCategoryID({
      categoryID: process.env.generalInfomationID,
    })
    trendingData = await HomepageController.getTrendingPost()
  }

  return {
    props: {
      stickyPost,
      selectedPost,
      generalPost: generalData?.data || [],
      generalPostLastPage: generalData?.last_page || null,
      trendingPost: trendingData?.data || [],
      trendingPostLastPage: trendingData?.last_page || null,
      categoryData: categoryData || [],
    },
  }
}

export default function Homepage(props) {
  const {
    stickyPost,
    selectedPost,
    generalPost,
    generalPostLastPage,
    trendingPost,
    trendingPostLastPage,
    categoryData,
  } = props
  const { popupStatus, setPopupStatus, setNewestPost } =
    useContext(PopupContext)
  setNewestPost(stickyPost)
  const isTouchDevice = useIsTouchDevice()

  useEffect(() => {
    setPopupStatus({ ...popupStatus, newestPopup: false })
  }, [])

  return (
    <>
      <Head>
        <title>{process.env.siteTitle}</title>
        <meta property="og:title" content={process.env.siteTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta property="og:image" content={stickyPost[0]?.thumbnail} />
        <meta property="og:description" content={process.env.siteDesciption} />
        <meta name="twitter:title" content={process.env.siteTitle} />
        <meta name="twitter:description" content={process.env.siteDesciption} />
        <meta name="description" content={process.env.siteDesciption}></meta>
        <meta name="twitter:image" content={stickyPost[0]?.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="container-lg">
        <div className="row">
          <div className="col-lg-9 col-12">
            <>
              {/* Mới nhất */}
              <NewestDynamic data={stickyPost} isTouchDevice={isTouchDevice} />
              {/* Bài viết tuyển chọn */}
              <PostSliderDynamic
                dataSelected={selectedPost}
                isTouchDevice={isTouchDevice}
                sliderTitle="BÀI VIẾT TUYỂN CHỌN"
                iconType="selected"
              />
              {/* Danh sách danh mục -- mobile only */}
              {isTouchDevice && <CategoryMobileDynamic data={categoryData} />}
              {/* Thông tin chung */}
              {!isTouchDevice && (
                <GeneralInformationDynamic
                  generalPost={generalPost}
                  lastPage={generalPostLastPage}
                  border={true}
                />
              )}
              {/* Quan tâm nhất */}
              {!isTouchDevice && (
                <MostInterestedDynamic data={trendingPost.slice(0, 6)} />
              )}
              {/* Bài viết tuyển chọn */}
              {/* <PostSliderDynamic
                dataSelected={selectedPost}
                isTouchDevice={isTouchDevice}
                sliderTitle="SPECIAL"
                iconType="special"
              /> */}
              {/* Read Most */}
              {!isTouchDevice && (
                <ReadMostDynamic
                  trendingPost={trendingPost}
                  lastPage={trendingPostLastPage}
                  border={true}
                  isTouchDevice={isTouchDevice}
                  sliderTitle="SPECIAL"
                  iconType="special"
                  sliderData={selectedPost}
                  isShowSlideInside={true}
                />
              )}
              {/* Movies Entertainment */}
              {!isTouchDevice && (
                <MovieEntertainmentDynamic
                  data={[selectedPost.slice(0, 6), generalPost.slice(0, 6)]}
                />
              )}
              {/* Youtube video */}
              {!isTouchDevice && (
                <YoutubeVideoDynamic data={dataYoutubeVideo} />
              )}
              {/* Not Miss */}
              {!isTouchDevice && <NotMissDynamic data={stickyPost} />}
            </>
          </div>
          <div className="col-lg-3 col-0">
            <AdvertisementDynamic />
          </div>
        </div>
      </div>
    </>
  )
}
