import React from "react"
import HomepageController from "../controller/homepage"
import Layout from "../components/layout"
import Link from "next/link"
import dynamic from "next/dynamic"
const AdvertisementDynamic = dynamic(() =>
  import("./../components/common/advertisement")
)
import styles from "../styles/Forums.module.css"
import { timeAgos } from "../utils/dateHandler"
import { useContext } from "react"
import { PopupContext } from "./_app"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import AvatarImage from "../public/images/Avatar.svg"

// This gets called on every request
export async function getServerSideProps() {
  const allNodes = await HomepageController.getAllNodes()
  const stickyPost = await HomepageController.getStickyPost()
  return {
    props: {
      allNodes,
      stickyPost,
    },
  }
}

function Forums(props) {
  const {
    allNodes: { data: nodes },
    stickyPost,
  } = props
  const { setNewestPost } = useContext(PopupContext)
  setNewestPost(stickyPost)
  var parentNodes = nodes.filter((x) => x.parent_node_id === 0)
  // move children to parent
  parentNodes.forEach((parent) => {
    parent.children = nodes.filter((x) => x.parent_node_id === parent.node_id)
  })
  console.log(parentNodes)
  return (
    <Layout title={`Diễn đàn | ${process.env.siteTitle}`}>
      <div className="container-lg">
        <div className="row">
          <div className="col-lg-9 col-12">
            {parentNodes.map((node, index) => {
              return (
                <div key={index} className="card my-3">
                  <div className={styles.header + " card-header"}>
                    {node.title}
                    <p className={styles.description + " card-text"}>
                      {node.description}
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    {node.children.map((child, index) => {
                      return (
                        <li
                          key={index}
                          className={styles.child_area + " list-group-item + row"}
                        >
                          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <Link
                              href="/[id]"
                              as={child.view_url.replace(
                                /^https?:\/\/[a-z\:0-9.]+/,
                                ""
                              )}
                              title={child.title}
                            >
                              <FontAwesomeIcon icon={faComments} className={child.node_id === 10 ? styles.icon_active : styles.icon} />
                              {child.title}
                            </Link>
                          </div>
                          <div className="row col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12">
                            <div className="col-6">
                              <div className="text-center">
                                <p className={styles.p_no_margin}>Chủ đề</p>
                                <p className={styles.p_no_margin}>{child.type_data.discussion_count}</p>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="text-center">
                                <p className={styles.p_no_margin}>Bài viết</p>
                                <p className={styles.p_no_margin}>{child.type_data.message_count}</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 d-flex align-items-center">
                            <Image
                              src={child.type_data.last_thread_avatar || AvatarImage}
                              width="40"
                              height="40"
                              alt="profile avatar"
                              className="rounded-circle"
                            />
                            <div className={styles.text_wrap}>
                              <Link
                                href="/[id]"
                                as={child.type_data.last_thread_url}
                                title={child.title}
                                className={styles.text_no_wrap}
                              >{child.type_data.last_thread_title}</Link>
                              <p className={styles.p_no_margin}>{timeAgos(child.type_data.last_post_date)} • {child.type_data.last_post_username}</p>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
          <div className="col-lg-3 col-12">
            <AdvertisementDynamic />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Forums
