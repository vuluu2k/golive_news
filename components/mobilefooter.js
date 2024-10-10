import Image from "next/image"
import styles from "../styles/layout/MobileFooter.module.css"

function Mobilefooter() {
  return (
    <section id={styles.mobile_footer} className="txt-white bg-red mt-2">
      <div className="container-fluid">
        <div
          className="d-flex justify-content-center"
          id={styles.mobile_footer_logo_wrapper}
        >
          <Image
            src="/golive_logo_100_25_white.png"
            alt="mail icon"
            width={100}
            height={25}
          />
        </div>
        <div style={{ padding: "0 20px" }}>
          <div className={`row ${styles.mobile_footer_section}`}>
            <div className={`col-12 p-0 ${styles.mobile_footer_title}`}>
              CHỊU TRÁCH NHIỆM NỘI DUNG
            </div>
            <div className={`col-12 p-0 ${styles.mobile_footer_content}`}>
              Ông Nguyễn Công Việt
            </div>
          </div>

          <div className={`row ${styles.mobile_footer_section}`}>
            <div className={`col-12 p-0 ${styles.mobile_footer_title}`}>
              THƯ KÝ BIÊN TẬP
            </div>
            <div className={`col-12 p-0 ${styles.mobile_footer_content}`}>
              Bà Nguyễn Nga Quỳnh
            </div>
          </div>

          <div className={`row ${styles.mobile_footer_section}`}>
            <div className={`col-12 p-0 ${styles.mobile_footer_title}`}>
              HỢP TÁC NỘI DUNG
            </div>
            <div className={`col-12 p-0 ${styles.mobile_footer_content}`}>
              <div className="d-flex justify-content-between">
                <span>
                  <Image
                    src="/mail_icon.png"
                    className={styles.mobile_footer_icon}
                    alt="mail icon"
                    width="15"
                    height="15"
                  />
                  contact@golive.vn
                </span>
                <span>
                  <Image
                    src="/phone_icon.png"
                    className={styles.mobile_footer_icon}
                    alt="mail icon"
                    width="15"
                    height="15"
                  />
                  0388653999
                </span>
              </div>
            </div>
          </div>

          <div className={`row ${styles.mobile_footer_section}`}>
            <div className={`col-12 p-0 ${styles.mobile_footer_title}`}>
              HỢP TÁC QUẢNG CÁO
            </div>
            <div className={`col-12 p-0 ${styles.mobile_footer_content}`}>
              <div className="d-flex justify-content-between">
                <span>
                  <Image
                    src="/mail_icon.png"
                    className={styles.mobile_footer_icon}
                    alt="mail icon"
                    width="15"
                    height="15"
                  />
                  admin@wingroup.vn
                </span>
                <span>
                  <Image
                    src="/phone_icon.png"
                    className={styles.mobile_footer_icon}
                    alt="mail icon"
                    width="15"
                    height="15"
                  />
                  0388653999
                </span>
              </div>
            </div>
          </div>

          <div className={`row ${styles.mobile_footer_section}`}>
            <div className={`col-12 p-0 ${styles.mobile_footer_title}`}>
              TRỤ SỞ
            </div>
            <div className={`col-12 p-0 ${styles.mobile_footer_content}`}>
              155 Trần Đăng Ninh, P. Dịch Vọng, Q. Cầu Giấy, TP Hà Nội
            </div>
          </div>

          <div className={`row ${styles.mobile_footer_section}`}>
            <div className={`col-12 p-0 ${styles.mobile_footer_content}`}>
              Giấy phép thiết lập MXH số 273/GP-BTTTT do Bộ Thông tin và Truyền
              thông cấp ngày 03/06/2022
            </div>
          </div>
        </div>
      </div>
      <div id={styles.mobile_footer_copy_right}>
        <p>
          Copyright © {new Date().getFullYear()} Golive. All rights reserved.
        </p>
      </div>
    </section>
  )
}

export default Mobilefooter
