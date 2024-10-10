import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/Home.module.css"
import { timeAgos } from "../../utils/dateHandler"

const ArticleLG = React.memo(function ArticleLg(props) {
  const {
    title,
    category,
    datetime,
    summary,
    thumbnail,
    zoom = false,
    showSummary = false,
    position,
    url,
    categoryUrl,
    isTouchDevice,
  } = props
  const [src, setSrc] = useState(thumbnail)
  const largeArticle = zoom && position === 0 && !isTouchDevice
  const largeSecond = zoom && position === 1 && !isTouchDevice

  return (
    <div
      className={
        (largeArticle
          ? "col-lg-8 col-md-8 col-sm-6"
          : "col-lg-4 col-md-4 col-sm-6") +
        " " +
        (isTouchDevice ? styles.border_bottom : "mb-5 pb-3") +
        " " +
        (largeSecond ? "d-flex flex-column" : "") +
        " mb-3"
      }
    >
      {(!isTouchDevice || position === 0) && (
        <div className={!isTouchDevice && "h-100" + ""}>
          {!largeSecond && (
            <Link href="/[id]" as={url} title={title}>
              <Image
                src={src}
                priority
                onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
                alt={title}
                width={304}
                height={241}
                layout="responsive"
                className={
                  position === 0
                    ? !isTouchDevice
                      ? styles.img_thumbnail_main
                      : styles.img_thumbnail_main_mobile
                    : styles.img_thumbnail_sub
                }
              />
              <h3
                className={
                  styles.title +
                  " " +
                  (largeArticle ? styles.title_large : null)
                }
              >
                {title}
              </h3>
              {showSummary && position === 1 && !isTouchDevice && (
                <p className={styles.summary}>{summary || title}</p>
              )}
            </Link>
          )}
          {largeSecond && (
            <>
              <Link
                href="/[id]"
                as={url}
                className={largeSecond ? styles.newest_second_layout_img : ""}
                title={title}
              >
                <Image
                  src={src}
                  onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
                  alt={title}
                  width={304}
                  height={241}
                  layout="responsive"
                  className={
                    styles.img_thumbnail + (largeSecond ? " h-100" : "")
                  }
                />
              </Link>
            </>
          )}
        </div>
      )}

      {isTouchDevice && position !== 0 && (
        <Link href="/[id]" as={url} title={title}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
      )}

      <div className={position !== 0 ? (isTouchDevice ? "pb-2" : "py-2") : ""}>
        {(!isTouchDevice || position === 0) && largeSecond && (
          <>
            <Link href="/[id]" as={url} title={title}>
              <h3
                className={
                  styles.title +
                  " " +
                  (largeArticle ? styles.title_large : null)
                }
              >
                {title}
              </h3>
            </Link>
            {showSummary && position === 1 && !isTouchDevice && (
              <p className={styles.summary}>{summary || title}</p>
            )}
          </>
        )}
        <Link href="/[id]" as={categoryUrl} title={category}>
          <span className={styles.category_title + " txt-red"}>{category}</span>
        </Link>
        <span className={styles.datetime}>{timeAgos(datetime)}</span>
      </div>

      {isTouchDevice && position === 0 && (
        <p className={styles.summary + " text-muted"}>{summary || title}</p>
      )}
      {isTouchDevice && position !== 0 && (
        <Link href="/[id]" as={url} title={title}>
          <div className={"row mb-2 " + styles.mobile_layout}>
            <div className="col">
              <Image
                src={src}
                onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
                alt={title}
                width={304}
                height={241}
                layout="responsive"
                className={styles.img_thumbnail}
              />
            </div>
            <div className="col ps-0">
              <p className={styles.summary + " text-muted"}>
                {summary || title}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
})

export default ArticleLG
