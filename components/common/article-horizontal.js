import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { timeAgos } from "../../utils/dateHandler";
import { useState } from "react";

export default function ArticleHorizontal(props) {
  const { title, srcImg, musicText, username, time, width, height, url, categoryUrl, profileUrl, border: isBorder } = props;
  const [src, setSrc] = useState(srcImg);
  if(process.browser){
    const images =  document.querySelectorAll("img.article-horizontal-img");
    images.forEach((e, i) => {
      e.removeAttribute("style")
      e.setAttribute("style", `width: 100%; color: transparent; object-fit: cover;`)
    })
  }
  return (
    <>
      <div className={(isBorder ? styles.card : '') + " card mb-3 mt-3 border-0"}>
        <div className={styles.row_padding + " row g-0"}>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6">
            <Link href="/[id]" as={url} title={title}>
              <Image
                src={src}
                onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
                alt={title}
                width={width}
                height={height}
                layout="responsive"
                className="article-horizontal-img"
              />
            </Link>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6">
            <div className="card-body text-left pt-sm-0">
              <Link href="/[id]" as={url} title={title}><h5 className="card-title txt-bold">{title}</h5></Link>
              <div>
                <Link href="/[id]" as={categoryUrl} title={title}>
                  <span className={styles.category_title + " txt-red"}>
                    {musicText}
                  </span>
                </Link>
                <span className="txt-red"> • </span>
                <Link href="/members/[id]" as={profileUrl} title={title}>
                  <span className={styles.username_text + " txt-gray username-text"}>
                    {username}
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
    </>
  );
}
