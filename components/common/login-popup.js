import { useState } from "react"
import { LoginForm, RegisterForm } from "./login-register-form"
import styles from "../../styles/Popup.module.css"

function LoginPopup() {
  const [isLoginTab, setIsLoginTab] = useState(true)

  const onLoginSubmit = (data) => console.log(data)
  const onRegisterSubmit = (data) => console.log(data)

  return (
    <section id={styles.popup_content} className="bg-white d-flex flex-column">
      <div className="row mx-0">
        <div
          className={`col-6 ${styles.popup_title} ${styles.popup_tab} ${
            styles.popup_header
          } ${isLoginTab ? `txt-red ${styles.popup_tab_active}` : ""}`}
          onClick={() => setIsLoginTab(true)}
        >
          Đăng nhập
        </div>
        <div
          className={`col-6 ${styles.popup_title} ${styles.popup_tab} ${
            styles.popup_header
          } ${!isLoginTab ? `txt-red ${styles.popup_tab_active}` : ""}`}
          onClick={() => setIsLoginTab(false)}
        >
          Tạo tài khoản
        </div>
      </div>

      {isLoginTab ? (
        <div className="row mx-0" style={{ flex: 1 }}>
          <div className="col-6 d-flex">
            <div className="container" style={{ marginTop: 25 }}>
              <div className={`row justify-content-center ${styles.popup_txt}`}>
                Đăng nhập với email
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <LoginForm onFormSubmit={onLoginSubmit} />
                  </div>
                </div>
              </div>
              <div
                className={`row mt-3 ${styles.popup_txt} justify-content-center`}
              >
                Quên mật khẩu?
              </div>
            </div>
            <div id={styles.popup_devider} className="bg-light-gray"></div>
          </div>

          <div className="col-6">
            <div className="container" style={{ marginTop: 25 }}>
              <div className={`row justify-content-center ${styles.popup_txt}`}>
                Đăng nhập với
              </div>
              <div className="container">
                <div className="row">
                  <div className={`col-12`}>
                    <div
                      id={styles.login_fb_btn}
                      className={`${styles.popup_item_outline} ${styles.popup_item_outline_red} ${styles.popup_title} txt-red bg-white d-flex flex-column justify-content-center text-center`}
                    >
                      Facebook
                    </div>
                  </div>

                  <div className={`col-12`}>
                    <div
                      id={styles.login_gg_btn}
                      className={`${styles.popup_item_outline} ${styles.popup_item_outline_red} ${styles.popup_title} txt-red bg-white d-flex flex-column justify-content-center text-center`}
                    >
                      <div>Google</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div
                      id={styles.login_apple_btn}
                      className={`${styles.popup_item_outline} ${styles.popup_item_outline_red} ${styles.popup_title} txt-red bg-white d-flex flex-column justify-content-center text-center`}
                    >
                      <div>Apple</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row mx-0" id="sign_up" style={{ flex: 1 }}>
          <div className="col-6 d-flex">
            <div className="container" style={{ marginTop: 25 }}>
              <div className={`row justify-content-center ${styles.popup_txt}`}>
                Tạo tài khoản Golive
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <RegisterForm onFormSubmit={onRegisterSubmit} />
                  </div>
                </div>
              </div>
            </div>
            <div id={styles.popup_devider} className="bg-light-gray"></div>
          </div>

          <div className="col-6">
            <div className="container" style={{ marginTop: 25 }}>
              <div className={`row justify-content-center ${styles.popup_txt}`}>
                Tạo tài khoản với
              </div>
              <div className="container">
                <div className="row">
                  <div className={`col-12`}>
                    <div
                      id={styles.login_fb_btn}
                      className={`${styles.popup_item_outline} ${styles.popup_item_outline_red} ${styles.popup_title} txt-red bg-white d-flex flex-column justify-content-center text-center`}
                    >
                      Facebook
                    </div>
                  </div>

                  <div className={`col-12`}>
                    <div
                      id={styles.login_gg_btn}
                      className={`${styles.popup_item_outline} ${styles.popup_item_outline_red} ${styles.popup_title} txt-red bg-white d-flex flex-column justify-content-center text-center`}
                    >
                      <div>Google</div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div
                      id={styles.login_apple_btn}
                      className={`${styles.popup_item_outline} ${styles.popup_item_outline_red} ${styles.popup_title} txt-red bg-white d-flex flex-column justify-content-center text-center`}
                    >
                      <div>Apple</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4 d-flex justify-content-center">
            <p>Khi bấm tạo tài khoản bạn đã đồng ý với quy định của&nbsp;</p>
            <strong className="txt-red ">Golive.vn</strong>
          </div>
        </div>
      )}
    </section>
  )
}

export default LoginPopup
