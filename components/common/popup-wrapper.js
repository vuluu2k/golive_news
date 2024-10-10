import styles from "../../styles/Popup-wrapper.module.css"
import { useContext } from "react"
import { PopupContext } from "../../pages/_app"
import useIsTouchDevice from "../../utils/useMobileDetect"
import MobileLoginPopup from "./mobile-login-popup"
import LoginPopup from "./login-popup"

function PopupWrapper() {
  const isTouchDevice = useIsTouchDevice()

  const { popupStatus, setPopupStatus } = useContext(PopupContext)

  return (
    <div id="popup_wrapper">
      {popupStatus.darkBg && (
        <section
          id={styles.black_popup_bg}
          className="bg-black"
          onClick={() => {
            setPopupStatus({ ...popupStatus, darkBg: false, loginPopup: false })
          }}
        ></section>
      )}
      {isTouchDevice && popupStatus.loginPopup && <MobileLoginPopup />}
      {!isTouchDevice && popupStatus.loginPopup && <LoginPopup />}
    </div>
  )
}

export default PopupWrapper
