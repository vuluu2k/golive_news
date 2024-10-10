import styles from "../styles/Home-content-2.module.css"
import ImagePlay from "./common/image-play"
import { useState } from "react"
import Link from "next/link"
import YouTubeIcon from "../public/images/youtube.svg"
import Image from "next/image"

export default function YoutubeVideo(props) {
  const [dataYoutube, setDataYoutube] = useState(props.data)
  return (
    <section
      className="youtube-video-section bg-light-black pt-3 container"
      id={styles.youtube_section}
    >
      <div className="row g-0">
        <div className="d-flex col-12">
          <Image
            width={30}
            height={30}
            className={styles.icon_youtube + " txt-red"}
            src={YouTubeIcon}
            alt="youtube icon"
          />
          <p className={`txt-white ms-2 ${styles.youtube_title}`}>VIDEO</p>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-7">
          <Link href="/[id]">
            <ImagePlay widthIcon={50} heightIcon={50} main={true} />
            <h3 className={styles.text_play + " txt-white"}>
              [BAE] Tăng Duy Tân - BÊN TRÊN TẦNG LẦU ...
            </h3>
          </Link>
        </div>
        <div className="col-sm-5">
          <div className={styles.scroll} id={styles.style_scrollbar}>
            {dataYoutube.map((e, i) => (
              <Link href="/[id]" as={e.url} key={i} title={e.title}>
                <div className="row mb-3">
                  <div className="col-sm-5">
                    <ImagePlay
                      width={161}
                      height={102}
                      widthIcon={20}
                      heightIcon={20}
                      main={false}
                    />
                  </div>
                  <div className="col-sm-7">
                    <p
                      className={
                        styles.youtube_title + " txt-white youtube-title"
                      }
                    >
                      {e.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
