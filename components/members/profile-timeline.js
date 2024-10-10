import React from "react"
import Image from "next/image"
import CopperIcon from "../../public/icon/copper-icon.svg"
import SilverIcon from "../../public/icon/silver-icon.svg"
import GoldIcon from "../../public/icon/gold-icon.svg"
import styles from "../../styles/Profile.module.css"
import { useState } from "react"
import ProfilePost from "../common/profile-post"
import { useRouter } from "next/router"

function ProfileTimeline(props) {
  const { data, tags = [], thread } = props
  const [listTag, setListTag] = useState(tags)
  const router = useRouter()

  const pushTagPage = (tag) => {
    router.push({
      pathname: "/tag",
      query: {
        tagName: tag,
      },
    })
  }
  return (
    <>
      <div
        className={
          styles.armorial_box_shadow +
          " d-flex flex-row justify-content-between my-3 pt-2 pb-4"
        }
      >
        <div className={styles.armorial + " mx-4"}>
          <p className="txt-gray">Huy hiệu đạt được</p>
          <div className={styles.armorial_list}>
            <span className="armorial-icon">
              <Image src={CopperIcon} alt="huy chương đồng" />
            </span>
            <span className="armorial-icon">
              <Image src={SilverIcon} alt="huy chương bạc" />
            </span>
            <span className="armorial-icon">
              <Image src={GoldIcon} alt="huy chương vàng" />
            </span>
          </div>
          <span></span>
        </div>
        <div className="mx-2">
          <button className="txt-red txt-bold-500 bg-white border-0">
            Xem thêm
          </button>
        </div>
      </div>
      <div className={styles.armorial + " row mt-5"}>
        <p className="txt-gray">Chủ đề bài đã viết</p>
        <ul className={styles.tags + " d-flex flex-row flex-wrap"}>
          {listTag.length ? (
            listTag.map((e, i) => (
              <li
                className="txt-red mt-1 cursor-pointer"
                key={i}
                onClick={() => {
                  pushTagPage(e)
                }}
              >
                {e}
              </li>
            ))
          ) : (
            <p className="txt-red">Chưa tạo chủ đề nào!</p>
          )}
        </ul>
      </div>
      <ProfilePost data={thread} />
    </>
  )
}

export default ProfileTimeline
