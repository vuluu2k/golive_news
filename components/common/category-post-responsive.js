import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { timeAgos } from "../../utils/dateHandler";

function CategoryPostResponsive(props) {
  const {
    title,
    category,
    datetime,
    summary,
    thumbnail,
    position,
    url,
    categoryUrl,
    isTouchDevice,
  } = props;
  const [src, setSrc] = useState(thumbnail);

  return (
    <>
        {/* // Style for mobile layout start */}
        <div className={styles.border_bottom}>
          {position === 0 && (
            <Image
              src={src}
              onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
              alt={title}
              width={304}
              height={241}
              layout="responsive"
              className={styles.img_thumbnail_main_mobile}
            />
          )}
          {position !== 0 && (
            <Link href="/[id]" as={url} title={title}>
              <h3 className={styles.title}>{title}</h3>
            </Link>
          )}
          <div>
            <Link href="/[id]" as={categoryUrl} title={category}>
              <span className={styles.category_title + " txt-red"}>
                {category}
              </span>
            </Link>
            <span className={styles.datetime}>{timeAgos(datetime)}</span>
          </div>
          {position === 0 && (
            <p className={styles.summary + " text-muted"}>{summary}</p>
          )}
          {position !== 0 && (
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
                  <p className={styles.summary + " text-muted"}>{summary}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
        {/* // Style for mobile layout end */}
    </>
  );
}

export default CategoryPostResponsive;
