import Head from "next/head"
import useIsTouchDevice from "../utils/useMobileDetect"
import { useRouter } from "next/router"
import { useContext } from "react"
import { PopupContext } from "../pages/_app"

export default function Layout({ children, title = process.env.siteTitle }) {
  const { popupStatus } = useContext(PopupContext)
  const isTouchDevice = useIsTouchDevice()
  const router = useRouter()
  const isMobileHomePage = router.route === "/" && isTouchDevice

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div
        className={`container-lg ${
          isMobileHomePage && isTouchDevice && popupStatus.newestPopup
            ? "popup-foot-border"
            : ""
        }`}
      >
        {children}
      </div>
    </>
  )
}
