import Image from "next/image"
import styles from "../../styles/Home-content-2.module.css"
import Link from "next/link"
import { timeAgos } from "../../utils/dateHandler"
import { useState } from "react"

function CardHorizontal(props) {
  const { srcImg, width, height, title, url, musicText, time, categoryUrl } =
    props
  const [src, setSrc] = useState(srcImg)
  if (process.browser) {
    const images = document.querySelectorAll("img.card-horizontal-img")
    images.forEach((e, i) => {
      e.removeAttribute("style")
      e.setAttribute("style", `width: 100%; color: transparent;`)
    })
  }
  return (
    <div className="col-sm-6">
      <div className="card mb-3 border-0">
        <div className="row g-0">
          <div className="col-lg-5 col-md-6 col-sm-6">
            <Link href="/[id]" as={url} title={title}>
              <Image
                src={src}
                onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
                width={width}
                height={height}
                alt={title}
                layout="responsive"
                className={styles.image_round + " card-horizontal-img"}
              />
            </Link>
          </div>
          <div className="col-lg-7 col-md-6 col-sm-6">
            <div className="card-body pt-sm-0">
              <Link href="/[id]" as={url} title={title}>
                <h3 className={styles.card_title + " card-title"}>{title}</h3>
              </Link>
              <div>
                <Link href="/[id]" as={categoryUrl} title={title}>
                  <span className={styles.category_title + " txt-red"}>
                    {musicText}{" "}
                  </span>
                </Link>
                <span className={styles.datetime + " txt-mid-gray"}>
                  {timeAgos(time)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-1 bg-light-gray d-none d-sm-block" />
    </div>
  )
}

export default CardHorizontal
