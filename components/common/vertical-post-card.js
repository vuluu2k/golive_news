import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/vertical-post-card.module.css";
import { timeAgos } from "../../utils/dateHandler";
import { useState } from "react";

function VerticalPostCard(props) {
  const { data, imgProps, wrapperClass = "", imgClass = "" } = props;
  const [src, setSrc] = useState(data.thumbnail);
  const {
    category,
    category_url,
    datetime,
    profile_url,
    thumbnail,
    title,
    url,
    username,
  } = data;

  const { height = 200, width = 300 } = imgProps || {};

  return (
    <div className={wrapperClass}>
      <Link href={url}>
        <Image
          className={`${styles.card_thumbnail} ${imgClass}`}
          src={src}
          onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
          alt={title}
          layout="responsive"
          height={height}
          width={width}
        />
      </Link>
      <Link href={url}>
        <h3 className={styles.title}>{title}</h3>
      </Link>
      <span className="d-flex">
        <Link href={category_url}>
          <p className={`txt-red txt-bold ${styles.category}`}>{category}</p>
        </Link>
        <p className={`txt-mid-gray ${styles.timeagos} ms-2`}>
          {timeAgos(datetime)}
        </p>
      </span>
    </div>
  );
}

export default VerticalPostCard;
