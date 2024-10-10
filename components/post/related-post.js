import ArticleHorizontal from "../common/article-horizontal"
import style from "../../styles/Home.module.css"
import React, { useState } from "react"

export default function RelatedPost(props) {
  const { data: dataRelated, border: isBorder } = props

  return (
    <>
      <section className="read-most tab-homepage mt-3">
        <div className={style.most_int_header}>
          <span className={style.most_int_header_title}>
            BÀI VIẾT LIÊN QUAN
          </span>
        </div>
        <div className="read-most-content">
          {dataRelated.map((e, i) => (
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
              border={isBorder || true}
            />
          ))}
        </div>
        {/* <div className="my-3 text-center">
          <ButtonPlus alt="Xem thêm" />
        </div> */}
      </section>
    </>
  )
}
