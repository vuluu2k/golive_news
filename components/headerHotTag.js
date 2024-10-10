import styles from "../styles/layout/HeaderHotTag.module.css"
import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Marquee from "react-fast-marquee"
import useIsTouchDevice from "../utils/useMobileDetect"
import ScrollContainer from "react-indiana-drag-scroll"
import { useRouter } from "next/router"
import { PopupContext } from "../pages/_app"

function HeaderHotTag(props) {
  const { newestPost } = useContext(PopupContext)
  const [hotTags, setHotTags] = useState([])

  const router = useRouter()
  const pushTagPage = (url) => {
    router.push({
      pathname: url,
    })
  }

  useEffect(() => {
    setHotTags(
      newestPost.map((item) => ({ value: `# ${item.title}`, url: item.url }))
    )
  }, [newestPost])

  const isTouchDevice = useIsTouchDevice()

  const HotTagItem = (props) => {
    const { tagContent } = props
    return (
      <div
        className={`bg-white txt-red d-flex flex-column justify-content-center ${styles.hot_tag_item}`}
      >
        {tagContent}
      </div>
    )
  }

  const HotTagItemPC = ({ tagContent, url }) => {
    return (
      <div
        className={`${styles.hottag_item_pc} bg-white txt-red me-2 m-auto`}
        onClick={() => {
          pushTagPage(url)
        }}
      >
        {tagContent}
      </div>
    )
  }

  return (
    <section
      id={styles.header_hot_tag}
      className="bg-red d-flex flex-column justify-content-center"
    >
      <div className="container-lg">
        <div className="d-flex" id={styles.header_hot_tag_wrapper}>
          {/* {isTouchDevice ? (
            <>
              <Image
                src="/trending_up_icon.png"
                className={styles.mobile_footer_icon}
                alt="mail icon"
                width="24"
                height="24"
              />
              <Marquee
                pauseOnHover={true}
                gradient={false}
                className="ms-3 flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
                style={{ width: "100vw" }}
                play={true}
              >
                {hotTags.map((e, i) => (
                  <HotTagItem tagContent={e} key={i} />
                ))}
              </Marquee>
            </>
          ) : ( */}
          <div className="d-flex w-100">
            <Image
              src="/trending_up_icon.png"
              className={`${styles.mobile_footer_icon} me-2`}
              alt="mail icon"
              width="24"
              height="24"
            />
            <ScrollContainer
              className="scroll-container"
              style={{ display: "flex" }}
            >
              {hotTags.map((e, i) => (
                <HotTagItemPC tagContent={e.value} key={i} url={e.url} />
              ))}
            </ScrollContainer>
          </div>
          {/* )} */}
        </div>
      </div>
    </section>
  )
}

export default HeaderHotTag
