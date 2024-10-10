import Image from "next/image";
import styles from "../styles/layout/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  const categories = process.env.categoryHomepage;
  let newCategoryArray = [],
    size = 5;
  while (categories.length > 0)
    newCategoryArray.push(categories.splice(0, size));

  return (
    <section id={styles.footer} className="bg-red txt-white">
      <div className="container-lg" style={{ marginBottom: 30 }}>
        <div className="row" style={{ paddingBottom: 50 }}>
          <div className="col-12">
            <Image
              src="/golive_logo_100_25_white.png"
              className={styles.mobile_footer_icon}
              alt="mail icon"
              width="100"
              height="25"
            />
          </div>
          <div
            className="col-12"
            style={{ fontWeight: 600, fontSize: 16, marginTop: 10 }}
          >
            GOLIVE.VN - MXH THÔNG TIN GIẢI TRÍ DÀNH CHO GIỚI TRẺ
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <div
              className={`row d-flex flex flex-column ${styles.footer_title_wrapper}`}
            >
              <div className={`col-12 mb-1 ${styles.footer_title}`}>
                CHUYÊN MỤC
              </div>
              <div className={`col-12`}>
                <div
                  className={`bg-white ${styles.footer_title_underline}`}
                ></div>
              </div>
            </div>
            <div className="row">
              {newCategoryArray.map((e, i) => (
                <div key={i} className="col-4 d-flex flex-column">
                  {e.map((item, index) => (
                    <div key={index} className={`mb-2 ${styles.footer_content}`}>
                      <Link
                        href={`/category/${item.slug}.${item.categoryId}`}
                        title={item.title}
                        className={styles.category_link}
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="col-5">
            <div
              className={`row d-flex flex flex-column ${styles.footer_title_wrapper}`}
            >
              <div className={`col-12 mb-1 ${styles.footer_title}`}>
                LIÊN HỆ
              </div>
              <div className={`col-12`}>
                <div
                  className={`bg-white ${styles.footer_title_underline}`}
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className={`mb-2 ${styles.footer_big_content}`}>
                  Trụ sở Hà Nội
                </div>
                <div className={`mb-2 d-flex ${styles.footer_content}`}>
                  <Image
                    src="/location_icon.png"
                    alt="document icon"
                    width="8"
                    height="12"
                    className="my-auto"
                  />
                  <div className="my-auto ms-1">
                    Trụ sở: 155 Trần Đăng Ninh, P. Dịch Vọng, Q. Cầu Giấy, TP Hà
                    Nội
                  </div>
                </div>
                <div className={`mb-2 ${styles.footer_content}`}>
                  Kết nối với chúng tôi
                </div>
                <div className={`mb-2 ${styles.footer_content}`}>
                  <Image
                    src="/fb_icon.png"
                    alt="document icon"
                    width="14"
                    height="14"
                    className="my-auto"
                  />
                  <Image
                    src="/yt_icon.png"
                    alt="document icon"
                    width="14"
                    height="14"
                    className="my-auto ms-2"
                  />
                  <Image
                    src="/tiktok_icon.png"
                    alt="document icon"
                    width="14"
                    height="14"
                    className="my-auto ms-2"
                  />
                  <Image
                    src="/insta_icon.png"
                    alt="document icon"
                    width="14"
                    height="14"
                    className="my-auto ms-2"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div
              className={`row d-flex flex flex-column ${styles.footer_title_wrapper}`}
            >
              <div className={`col-12 mb-1 ${styles.footer_title}`}>
                HỢP TÁC
              </div>
              <div className={`col-12`}>
                <div
                  className={`bg-white ${styles.footer_title_underline}`}
                ></div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className={`mb-2 d-flex ${styles.footer_big_content}`}>
                  <Image
                    src="/document_icon.png"
                    alt="document icon"
                    width="14"
                    height="14"
                    className="my-auto"
                  />
                  <div className="my-auto ms-1">Hợp tác nôi dung</div>
                </div>
                <div className={`mb-2 ${styles.footer_content}`}>
                  contact@golive.vn
                </div>
                <div className={`mb-2 d-flex   ${styles.footer_big_content}`}>
                  <Image
                    src="/tag_icon.png"
                    alt="document icon"
                    width="14"
                    height="14"
                    className="my-auto"
                  />
                  <div className="my-auto ms-1">Hợp tác quảng cáo</div>
                </div>
                <div className={`mb-2 ${styles.footer_content}`}>
                  Email: admin@wingroup.vn
                </div>
                <div className={`mb-2 ${styles.footer_content}`}>
                  Hotline: 0388 653 999
                </div>
                <div className={styles.footer_big_content}>
                  <div id={styles.advertisement_quote}>
                    <p>NHẬN BÁO GIÁ QUẢNG CÁO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 10, marginBottom: 15 }}>
          <div className="col-12">
            <div className="col-12 bg-light-gray" style={{ height: 0.5 }}></div>
          </div>
        </div>

        <div className="row d-flex">
          <div
            className={`${styles.staff_wrapper} d-flex`}
            style={{ marginRight: 100 }}
          >
            <div className={`${styles.line} bg-white me-1`}></div>
            <div className="d-flex flex-column justify-content-between">
              <div className={styles.footer_content}>
                Chịu trách nhiệm nội dung
              </div>
              <div className={styles.footer_big_content}>Nguyễn Công Việt</div>
            </div>
          </div>

          <div className={`${styles.staff_wrapper} d-flex`}>
            <div className={`${styles.line} bg-white me-1`}></div>
            <div className="d-flex flex-column justify-content-between">
              <div className={styles.footer_content}>Thư ký biên tập</div>
              <div className={styles.footer_big_content}>Nguyễn Nga Quỳnh</div>
            </div>
          </div>
        </div>
      </div>

      {/* license */}
      <div id={styles.footer_license} className="bg-black d-flex">
        <div className="m-auto text-center">
          Giấy phép thiết lập MXH số 273/GP-BTTTT do Bộ Thông tin và Truyền
          thông cấp ngày 03/06/2022
        </div>
      </div>
    </section>
  );
}
