import dynamic from "next/dynamic"
import ButtonPlus from "../button/ButtonPlus"
import ArticleHorizontal from "../common/article-horizontal"
import React, { useState } from "react"
import { getTrendingPost } from "../../controller/homepage"
import ButtonLoading from "../button/ButtonLoading"
import { NotificationContainer, NotificationManager } from "react-notifications"

const PostSliderDynamic = dynamic(() => import("../home/post-slider"))

export default function ReadMost(props) {
  let {
    trendingPost,
    lastPage,
    border: isBorder,
    isTouchDevice,
    sliderTitle,
    iconType,
    sliderData,
    isShowSlideInside,
  } = props
  const [dataPost, setDataPost] = useState(trendingPost)
  const [currentPage, setCurrentPage] = useState(1)
  const [btnLoading, setBtnLoading] = useState(false)

  const loadMore = async () => {
    const nextPage = currentPage + 1
    if (nextPage > lastPage) {
      NotificationManager.warning("Đã hết bài viết")
      return
    }
    setCurrentPage(nextPage)
    setBtnLoading(true)
    const { data: dataNextPage } = await getTrendingPost(nextPage, false)
    setDataPost([...dataPost, ...dataNextPage])
    setBtnLoading(false)
  }

  return (
    <>
      <section className="read-most tab-homepage mt-3">
        <div className="read-most-content">
          {dataPost.map((e, i) => (
            <>
              {(!dataPost.length || i === 4) && isShowSlideInside && (
                <PostSliderDynamic
                  dataSelected={sliderData}
                  isTouchDevice={isTouchDevice}
                  sliderTitle={sliderTitle}
                  iconType={iconType}
                />
              )}
              <ArticleHorizontal
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
                border={isBorder}
              />
            </>
          ))}
        </div>
        <div className="my-3 text-center">
          {!btnLoading && <ButtonPlus alt="Xem thêm" loadMore={loadMore} />}
          {btnLoading && <ButtonLoading />}
        </div>
      </section>
      <NotificationContainer />
    </>
  )
}
