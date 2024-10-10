import React, { useEffect } from "react"
import Image from "next/image"
import AvatarImage from "../../public/images/Avatar.svg"
import styles from "../../styles/Profile.module.css"
import { useState } from "react"
import VIPIcon from "../../public/icon/VipIcon.svg"
import { timeAgos } from "../../utils/dateHandler"
import AvatarDefault from "../../public/images/avatar-default.jpg"

function ProfileInfo(props) {
  const [info, setInfo] = useState(props.data)

  useEffect(() => {
    setInfo(props.data)
  }, [props.data])

  const {
    username,
    user_title,
    register_date,
    reaction_score,
    vote_score,
    message_count,
    trophy_points,
  } = info
  const linkAvatar = info?.avatar_urls?.l || AvatarDefault

  return (
    <>
      {info ? (
        <section className="profile-info-section">
          <div
            className={
              styles.profile_info_section + " row text-center bg-light-gray"
            }
          >
            <div>
              <Image
                src={linkAvatar === null ? AvatarImage : linkAvatar}
                width="112"
                height="112"
                alt="profile avatar"
              />
            </div>
            <h5 className={styles.username + " txt-red mt-3 txt-bold-500"}>
              {username}
            </h5>
            <p className="level">
              <span className="txt-gray">Cấp thành viên </span>
              <Image src={VIPIcon} alt="level icon" />
              <span className="level-type txt-bold-500">
                {" "}
                {trophy_points === 1 ? "VIP" : "NORMAL"}
              </span>
              <span className="txt-gray"> Ngày tham gia </span>
              <span className="joined-time txt-bold-500">
                {timeAgos(register_date)}
              </span>
            </p>
            <p className="posts">
              <span className="txt-gray">Bài đã đăng: </span>
              <span className="number-of-posts txt-bold-500">
                {message_count}
              </span>
              <span className="txt-bold-500"> | </span>
              <span className="txt-gray">lượt like: </span>
              <span className="number-of-like txt-bold-500">
                {reaction_score}
              </span>
              <span className="txt-bold-500"> | </span>
              <span className="txt-gray">Lượt theo dõi: </span>
              <span className="number-of-follow txt-bold-500">
                {vote_score}
              </span>
            </p>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProfileInfo
