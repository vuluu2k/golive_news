import ButtonPlus from "../button/ButtonPlus"
import ArticleHorizontal from "../common/article-horizontal"
import style from "../../styles/Home.module.css"
import React, { useState } from "react"
import { getPostByCategoryID } from "../../controller/homepage"
import ButtonLoading from "../button/ButtonLoading"
import { NotificationContainer, NotificationManager } from "react-notifications"

function GeneralInformation(props) {
  let { generalPost, lastPage, border: isBorder } = props
  const [dataPost, setDataPost] = useState(generalPost)
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
    const { data: dataNextPage } = await getPostByCategoryID({
      page: nextPage,
      withEndpoint: false,
      categoryID: process.env.generalInfomationID,
    })
    setDataPost([...dataPost, ...dataNextPage])
    setBtnLoading(false)
  }

  return (
    <>
      <section className="read-most tab-homepage my-4">
        <div className={style.most_int_header}>
          <span className={style.most_int_header_title}>THÔNG TIN CHUNG</span>
        </div>
        <div className="read-most-content">
          {dataPost.map((e, i) => (
            <>
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

export default GeneralInformation
