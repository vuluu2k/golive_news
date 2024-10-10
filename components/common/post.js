import React from "react";
import Image from "next/image";
import Banner from "../../public/images/MissUniver.svg";
import styles from "../../styles/Magazine.module.css";
import BannerSmall from "../../public/images/banner-2.svg";

function Post(props) {
  const { title, srcImg, content, index } = props;
  return (
    <>
      <Image
        src={Banner}
        className={styles.banner + " img-fluid"}
        alt={title}
        layout="responsive"
      />
      <div className="container-lg">
        {index === 0 && (
          <Image
            src={BannerSmall}
            alt="banner"
            className="img-fluid mt-4"
            layout="responsive"
          />
        )}
        <div className={styles.content_post_magazine + " my-4 txt-black"}>{content}</div>
      </div>
    </>
  );
}

export default Post;
