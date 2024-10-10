import Link from "next/link"
import Styles from "../styles/404.module.css"

function custom404Page() {
  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12">
          <div className="text-center my-5">
            <h2 className="text-uppercase txt-bold">
              Không tìm thấy trang này
            </h2>
            <p className={Styles.err_code}>404</p>
            <Link
              href={"/"}
              className={`btn btn-danger text-white txt-bold gohome_btn`}
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default custom404Page
