import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/Article-author-header.module.css"
import useIsTouchDevice from "../../utils/useMobileDetect"
import {
  isDateInThisWeek,
  WEEK_DAYS,
  formatAMPM,
} from "../../utils/dateHandler"
import FacebookShareButton from "../social-plugin/share-button-facebook"

function ArticleAuthorHeader(props) {
  const { author, artDetail } = props
  const { name, totalPost, profileUrl, profileAvatar } = author
  const { view_url, createdAt } = artDetail
  const isTouchDevice = useIsTouchDevice()
  const getArticleCreateTime = (createdAt) => {
    const time = new Date(createdAt)
    return `${
      isDateInThisWeek(time)
        ? WEEK_DAYS[time.getDay()]
        : `${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`
    } lúc ${formatAMPM(createdAt)}`
  }
  return (
    <section
      id="art-auth-header"
      className="d-flex justify-content-between mt-2 mb-4"
    >
      <div className="d-flex align-items-center">
        <Link href="/members/[id]" as={profileUrl} title={name}>
          <Image
            src={profileAvatar}
            alt="Author-ava"
            width="25"
            height="25"
            id={styles.author_ava}
            className="m-auto me-2"
          />
        </Link>
        <div className="d-flex flex-column">
          <div className="d-flex">
            <Link href="/members/[id]" as={profileUrl} title={name}>
              <span id={styles.author_name} className="txt-red me-1">
                {name}
              </span>
            </Link>
            <Image
              src="/icon/trace_icon.svg"
              alt="trace-icon"
              width="15"
              height="15"
              className="my-auto"
            />
          </div>
          <div className={styles.txt_10_400}>
            {getArticleCreateTime(createdAt)} • Bài viết: {totalPost}
          </div>
        </div>
      </div>
      <div
        className={`d-flex ${
          isTouchDevice ? "flex-column justify-content-center" : ""
        }`}
      >
        {!isTouchDevice && (
          <button
            id={styles.get_link_btn}
            className="bg-light-gray txt-mid-gray border-0 me-3"
          >
            <Image
              src="/icon/link_icon.svg"
              alt="trace-icon"
              width="15"
              height="15"
            />{" "}
            Copy Link
          </button>
        )}
        <FacebookShareButton url={view_url} size={isTouchDevice ? 'small' : 'large'}/>
      </div>
    </section>
  )
}

export default ArticleAuthorHeader
