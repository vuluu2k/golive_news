import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import ArticleCommentAndTag from "./article-comment-n-tag"
import { timeAgos } from "../../utils/dateHandler"
import styles from "../../styles/Profile.module.css"
import AvatarDefault from "../../public/images/avatar-default.jpg"

function ProfilePost(props) {
  const { data } = props
  const [profileData, setProfileData] = useState(data)
  useEffect(() => {
    setProfileData(props.data)
  }, [props.data])
  return (
    <>
      {profileData && profileData.length ? (
        profileData.map((e, i) => {
          const { avatar_urls, username, last_activity } = e
          return (
            <div key={i}>
              <div className="user-info d-flex flex-row">
                <div className="d-flex flex-column">
                  <Image
                    className="rounded-circle"
                    src={avatar_urls?.l || AvatarDefault}
                    width={30}
                    height={32}
                    alt="avatar image"
                  />
                  <p className="user-level txt-golden">VIP</p>
                </div>
                <div className="d-flex flex-column flex-fill px-3">
                  <h5 className={styles.username + " txt-red txt-bold-500"}>
                    {username}
                  </h5>
                  <p className="time-online txt-gray">
                    {timeAgos(last_activity)}
                  </p>
                </div>
              </div>
              <div className="post-content mb-3">
                <Link href={e.view_url}>
                  <h3 className="post-title">{e.title}</h3>
                </Link>
                <p className="post-contents">{e.snippet}</p>
                <Link href={e.view_url}>
                  <Image
                    src={e.thumbnail}
                    alt={e.title}
                    width={400}
                    height={400}
                    layout="responsive"
                  />
                </Link>
                <p className="pt-3">
                  Source:{" "}
                  <u className="fst-italic">
                    <Link href={e.view_url}>{e.original_url}</Link>
                  </u>
                </p>
                <ArticleCommentAndTag
                  url={e.original_url}
                  isProfilePage={true}
                />
              </div>
            </div>
          )
        })
      ) : (
        <></>
      )}
    </>
  )
}

export default ProfilePost
