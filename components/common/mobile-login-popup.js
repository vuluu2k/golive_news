import styles from "../../styles/Popup-mobile-content.module.css"
import { useState } from "react"
import { LoginForm, RegisterForm } from "./login-register-form"
import Image from "next/image"

function MobileLoginPopup() {
  const [isLoginTab, setIsLoginTab] = useState(true)
  const onLoginSubmit = (data) => console.log(data)
  const onRegisterSubmit = (data) => console.log(data)

  return (
    <section
      id={styles.popup_mobile_content}
      className="bg-white d-flex flex-column"
    >
      <div className="row mx-0">
        <div
          className={`col-6 ${styles.popup_tab} ${styles.popup_title_bold} ${
            styles.popup_header
          } ${isLoginTab ? `txt-red ${styles.popup_tab_active}` : ""}`}
          onClick={() => setIsLoginTab(true)}
        >
          Đăng nhập
        </div>
        <div
          className={`col-6 ${styles.popup_tab} ${styles.popup_title_bold} ${
            styles.popup_header
          } ${!isLoginTab ? `txt-red ${styles.popup_tab_active}` : ""}`}
          onClick={() => setIsLoginTab(false)}
        >
          Tạo tài khoản
        </div>
      </div>
      {isLoginTab ? (
        <div id="login_tab_content">
          <div
            className={`${styles.popup_title} row mx-0 d-flex justify-content-center`}
            style={{ marginTop: 25 }}
          >
            Đăng nhập với email
          </div>
          <div className="container mb-3">
            <div className="row">
              <div className="col-12">
                <LoginForm onFormSubmit={onLoginSubmit} />
              </div>
            </div>
          </div>
          <div className={`row d-flex justify-content-center mg-5`}>
            Quên mật khẩu?
          </div>
          <div id={styles.divider} className="d-flex">
            <div
              className={`${styles.divider_line} bg-light-gray m-auto`}
            ></div>
            <div
              style={{ fontSize: 12, fontWeight: 400 }}
              className="txt-gray mx-3"
            >
              Hoặc
            </div>
            <div
              className={`${styles.divider_line} bg-light-gray m-auto`}
            ></div>
          </div>
          <div className="container d-flex justify-content-between">
            <div
              className={`${styles.popup_item_outline_login_other_btn} ${styles.popup_item_outline_red} d-flex justify-content-center`}
            >
              <Image
                src="/fb_icon_color.png"
                alt="eye icon"
                width="30"
                height="30"
                className="m-auto"
              />
            </div>
            <div
              className={`${styles.popup_item_outline_login_other_btn} ${styles.popup_item_outline_red} d-flex justify-content-center`}
            >
              <Image
                src="/gg_icon.png"
                alt="eye icon"
                width="30"
                height="30"
                className="m-auto"
              />
            </div>
            <div
              className={`${styles.popup_item_outline_login_other_btn} ${styles.popup_item_outline_red} d-flex justify-content-center`}
            >
              <Image
                src="/apple_icon.png"
                alt="eye icon"
                width="30"
                height="30"
                className="m-auto"
              />
            </div>
          </div>
        </div>
      ) : (
        <div id="login_tab_content">
          <div
            className={`${styles.popup_title} row mx-0 d-flex justify-content-center`}
            style={{ marginTop: 25 }}
          >
            Tạo tài khoản với
          </div>
          <div className="container mb-3">
            <div className="row">
              <div className="col-12">
                <RegisterForm onFormSubmit={onRegisterSubmit} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row g-0">
              <div className="col-12 mt-4 d-flex justify-content-center text-center">
                <p>
                  Khi bấm tạo tài khoản bạn đã đồng ý với quy định của{" "}
                  <strong className="txt-red ">Golive.vn</strong>
                </p>
              </div>
            </div>
          </div>
          <div id={styles.divider} className="d-flex">
            <div
              className={`${styles.divider_line} bg-light-gray m-auto`}
            ></div>
            <div
              style={{ fontSize: 12, fontWeight: 400 }}
              className="txt-gray mx-3"
            >
              Hoặc
            </div>
            <div
              className={`${styles.divider_line} bg-light-gray m-auto`}
            ></div>
          </div>
          <div className="container d-flex justify-content-between">
            <div
              className={`${styles.popup_item_outline_login_other_btn} ${styles.popup_item_outline_red} d-flex justify-content-center`}
            >
              <Image
                src="/fb_icon_color.png"
                alt="eye icon"
                width="30"
                height="30"
                className="m-auto"
              />
            </div>
            <div
              className={`${styles.popup_item_outline_login_other_btn} ${styles.popup_item_outline_red} d-flex justify-content-center`}
            >
              <Image
                src="/gg_icon.png"
                alt="eye icon"
                width="30"
                height="30"
                className="m-auto"
              />
            </div>
            <div
              className={`${styles.popup_item_outline_login_other_btn} ${styles.popup_item_outline_red} d-flex justify-content-center`}
            >
              <Image
                src="/apple_icon.png"
                alt="eye icon"
                width="30"
                height="30"
                className="m-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MobileLoginPopup
