import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import useIsTouchDevice from "../utils/useMobileDetect";
import LoadingBar from "react-top-loading-bar";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
const LoadingHomepageDynamic = dynamic(() =>
  import("../components/loading/homepage")
);
const HeaderDynamic = dynamic(() => import("../components/header"));
const MobileFooterDynamic = dynamic(() => import("../components/mobilefooter"));
const FooterDynamic = dynamic(() => import("../components/footer"));
const HeaderHotTagDynamic = dynamic(() => import("../components/headerHotTag"));
const PopupWrapperDynamic = dynamic(() =>
  import("../components/common/popup-wrapper")
);
const MobileCategoryPopupDynamic = dynamic(() =>
  import("../components/home/mobile-category-popup")
);
const NewestPopupDynamic = dynamic(() =>
  import("../components/home/newest_popup")
);

export const PopupContext = createContext();

function Golive({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const [popupStatus, setPopupStatus] = useState({
    darkBg: false,
    loginPopup: false,
    newestPopup: false,
    categoryPopup: false,
  });
  const [newestPost, setNewestPost] = useState([]);
  const [progress, setProgress] = useState(0);
  const isTouchDevice = useIsTouchDevice();
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;

    typeof document !== undefined
      ? (require("bootstrap/dist/css/bootstrap.min.css"),
        require("../styles/globals.css"))
      : null;
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
      setProgress(100);
    };
    const handleComplete = () => {
      document.getElementById("__next").scrollIntoView({
        behavior: "smooth",
      });
      setPageLoading(false);
      setProgress(0);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <>
      <PopupContext.Provider
        value={{ popupStatus, setPopupStatus, newestPost, setNewestPost }}
      >
        <div className="d-flex flex-column vh-100">
          <div className="flex-grow-1">
            <div
              className={
                popupStatus.categoryPopup && isTouchDevice ? "d-none" : ""
              }
            >
              <LoadingBar
                color="#f11946"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
              />
              <HeaderDynamic />
              <HeaderHotTagDynamic postData={newestPost} />
              {pageLoading ? (
                <LoadingHomepageDynamic />
              ) : (
                <div
                  className={
                    popupStatus.newestPopup && isTouchDevice ? "d-none" : ""
                  }
                >
                  <Component {...pageProps} />
                </div>
              )}
            </div>
            {popupStatus.newestPopup && isTouchDevice && <NewestPopupDynamic />}
            {popupStatus.categoryPopup && isTouchDevice && (
              <MobileCategoryPopupDynamic />
            )}
          </div>
          <FooterDynamic />
          <MobileFooterDynamic />
          <PopupWrapperDynamic />
        </div>
      </PopupContext.Provider>
    </>
  );
}

export default Golive;
