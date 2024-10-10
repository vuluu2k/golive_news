import styles from "../styles/layout/Header.module.css"
import { useContext, useState } from "react"
import { PopupContext } from "../pages/_app"
import Link from "next/link"
import { useRouter } from "next/router"
import useIsTouchDevice from "./../utils/useMobileDetect"
import Image from "next/image"

export default function Header() {
  const { popupStatus, setPopupStatus } = useContext(PopupContext)
  const [searchTitle, setSearchTitle] = useState("")
  const router = useRouter()
  const isTouchDevice = useIsTouchDevice()

  const handleSearchInputChange = (e) => {
    setSearchTitle(e.target.value)
  }

  const handleSearchPost = () => {
    if (searchTitle) {
      router.push({
        pathname: "/search",
        query: {
          keyword: searchTitle,
        },
      })
    }
  }

  return (
    <>
      {!isTouchDevice ? (
        <section id="golive-header" className="container-lg">
          <div
            className={`bg-white d-flex justify-content-between ${styles.golive_header_content}`}
          >
            <div
              id={styles.golive_header_logo}
              onClick={() => {
                router.push("/")
              }}
            ></div>
            <div className="d-flex my-auto">
              <div id={styles.search_wrapper} className="position-relative">
                <input
                  type="text"
                  id={styles.golive_header_search_input}
                  className="txt-16-12"
                  placeholder="Tìm kiếm"
                  value={searchTitle}
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearchPost()
                  }}
                ></input>
                <div
                  id={styles.search_icon}
                  className="position-absolute"
                  onClick={handleSearchPost}
                ></div>
              </div>
              <button className="txt-red txt-16-12 border-0 bg-white">
                Đăng ký
              </button>
              <button
                className="bg-red txt-white txt-16-12 border-0"
                id={styles.login_btn}
                onClick={() => {
                  setPopupStatus({
                    ...popupStatus,
                    darkBg: true,
                    loginPopup: true,
                  })
                }}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section
          id="golive-header"
          className={`container-lg ${styles.golive_header_content}`}
        >
          <div className="row h-100">
            <div className="col-3 m-auto p-0 d-flex justify-content-center">
              <Link href="/" className="d-flex">
                <div id={styles.golive_header_logo}></div>
              </Link>
            </div>
            <div className="col-6 m-auto d-flex justify-content-center">
              <div
                className={`${styles.txt_14_600} txt-red d-flex`}
                onClick={() => {
                  setPopupStatus({
                    ...popupStatus,
                    newestPopup: !popupStatus.newestPopup,
                  })
                }}
              >
                <p
                  className={`${
                    popupStatus.newestPopup ? "txt-gray" : "txt-red"
                  } m-auto`}
                >
                  MỚI NHẤT
                </p>
                <Image
                  src={
                    popupStatus.newestPopup
                      ? "/icon/arrow_up_gray_icon.svg"
                      : "/icon/arrow_down_red_icon.svg"
                  }
                  alt="arrow icon"
                  className="m-auto"
                  width="24"
                  height="24"
                />
              </div>
            </div>
            <div className="col-3 m-auto d-flex justify-content-end">
              <Image
                src="/icon/user_icon.svg"
                alt="user_icon"
                className="me-2"
                width="20"
                height="20"
                onClick={() => {
                  setPopupStatus({
                    ...popupStatus,
                    loginPopup: true,
                    darkBg: true,
                  })
                }}
              />
              <Image
                src="/icon/bar_icon.svg"
                alt="category"
                className=""
                width="20"
                height="20"
                onClick={() => {
                  setPopupStatus({
                    ...popupStatus,
                    categoryPopup: true,
                    newestPopup: false,
                  })
                }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
