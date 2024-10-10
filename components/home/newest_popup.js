import styles from "../../styles/Newest-popup.module.css"
import Image from "next/image"
import { timeAgos } from "../../utils/dateHandler"
import Link from "next/link"
import { useContext, useState } from "react"
import { PopupContext } from "../../pages/_app"

const NewestPopupPost = ({ postDetail }) => {
  const [src, setSrc] = useState(postDetail.url)
  return (
    <div className="row mt-2">
      <div className={`col-6`}>
        <Link href={`${postDetail.url}`}>
          <Image
            src={src}
            onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}
            alt="post thumnail"
            height="70"
            width="141"
            className={styles.thumb_nail}
            layout="responsive"
          />
        </Link>
      </div>
      <div className={`col-6 ps-0 ${styles.post_content}`}>
        <div className={`row`}>
          <div className="col-12">
            <Link href={`${postDetail.url}`}>
              <div className={`${styles.post_title}`}>{postDetail.title}</div>
            </Link>
          </div>
          <div className="col-12">
            <div
              className={`${styles.description} txt-gray d-flex align-items-center mt-1`}
            >
              <Image
                src={postDetail.user_avata?.h}
                alt="tác giả"
                height="20"
                width="20"
                className={`${styles.author_ava} me-1`}
              />
              <div>
                <Link href={`${postDetail.category_url}`}>
                  <span className="txt-red">{postDetail.category}</span>
                </Link>
                <span> • </span>
                <Link href={`${postDetail.profile_url}`}>
                  <span>{postDetail.username}</span>
                </Link>
                <span> {timeAgos(postDetail.datetime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NewestPopup(props) {
  const { newestPost } = useContext(PopupContext)

  return (
    <div id={styles.newest_popup} className="bg-white mt-2">
      <div className="container-lg mx-0">
        <div className="row">
          <div className="col-12 d-flex">
            <div id={styles.newest_line} className="bg-red me-1 my-auto"></div>
            <span className="txt-gray" id={styles.newest_title}>
              MỚI NHẤT
            </span>
          </div>
        </div>
        <div className="my-4">
          {(newestPost || []).map((e, i) => (
            <NewestPopupPost postDetail={e} key={i} />
          ))}
        </div>
        <div className="row d-flex justify-content-center pb-4">
          <button
            className="bg-red txt-white border-0 bdr-5 d-flex"
            id={styles.loadmore_btn}
          >
            <Image
              src="/icon/plus_icon.svg"
              alt="plus icon"
              width="24"
              height="24"
              className="me-2"
            />
            <p>Xem thêm</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewestPopup
