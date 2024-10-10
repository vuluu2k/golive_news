import Image from "next/image"
import { useForm } from "react-hook-form"
import { useState } from "react"
import styles from "../../styles/Popup.module.css"

export const LoginForm = (props) => {
  const { onFormSubmit } = props
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
      <div className="col-12">
        <input
          {...register("username", { required: true })}
          className={`${styles.popup_item_outline} ${styles.popup_txt} ${styles.popup_form_input}`}
          placeholder="Email"
        />
        {/* {errors.userName && (
          <span
            className={`${styles.input_err} ${styles.popup_txt} txt-red`}
          >
            Tên đăng nhập không được để trống
          </span>
          )} */}
      </div>
      <div className="col-12">
        <div className={styles.login_pass_wrapper}>
          <input
            {...register("password", { required: true })}
            className={`${styles.popup_item_outline} ${styles.popup_txt} ${styles.popup_form_input}`}
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "password"}
          />
          <Image
            src={showPassword ? "/eye_icon.png" : "/eye_off_icon.png"}
            alt="eye icon"
            width="24"
            height="24"
            className={styles.login_pass_eye_icon}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            style={{ cusor: "pointer" }}
          />
        </div>
        {/* {errors.password && (
          <span
            className={`${styles.input_err} ${styles.popup_txt} txt-red`}
          >
            Mật khẩu không được để trống
          </span>
          )} */}
      </div>

      <input
        type="submit"
        className={`txt-white border-0 ${styles.popup_item_outline} ${styles.popup_title} bg-red`}
        value="Đăng nhập"
      />
    </form>
  )
}

export const RegisterForm = (props) => {
  const { onFormSubmit } = props
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
      <div className="col-12">
        <input
          {...register("username", { required: true })}
          className={`${styles.popup_item_outline} ${styles.popup_txt} ${styles.popup_form_input}`}
          placeholder="Email"
        />
        {/* {errors.userName && (
          <span
            className={`${styles.input_err} ${styles.popup_txt} txt-red`}
          >
            Tên đăng nhập không được để trống
          </span>
          )} */}
      </div>
      <div className="col-12">
        <div className={styles.login_pass_wrapper}>
          <input
            {...register("password", { required: true })}
            className={`${styles.popup_item_outline} ${styles.popup_txt} ${styles.popup_form_input}`}
            placeholder="Mật khẩu"
            type={showPassword ? "text" : "password"}
          />
          <Image
            src={showPassword ? "/eye_icon.png" : "/eye_off_icon.png"}
            alt="eye icon"
            width="24"
            height="24"
            className={styles.login_pass_eye_icon}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
            style={{ cusor: "pointer" }}
          />
        </div>
        {/* {errors.password && (
          <span
            className={`${styles.input_err} ${styles.popup_txt} txt-red`}
          >
            Mật khẩu không được để trống
          </span>
          )} */}
      </div>

      <input
        type="submit"
        className={`txt-white border-0 ${styles.popup_item_outline} ${styles.popup_title} bg-gray`}
        value="Tạo tài khoản"
      />
    </form>
  )
}
