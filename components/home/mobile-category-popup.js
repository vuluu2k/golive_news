import styles from "../../styles/Mobile-category-popup.module.css";
import Image from "next/image";
import nextConfig from "../../next.config";
import Link from "next/link";
import { PopupContext } from "../../pages/_app";
import { useContext } from "react";

function MobileCategoryPopup() {
  const { popupStatus, setPopupStatus } = useContext(PopupContext);
  const category = nextConfig.env.categoryHomepage;

  const CategoryItem = ({ data }) => {
    return (
      <div className="col-6 mt-2">
        <Link href={`/${data.slug}.f${data.categoryId}`}>
          <div className={`${styles.category_item} d-flex py-3 ps-1`}>
            <Image
              src={data.icon}
              alt="category icon"
              width="9"
              height="9"
              className="my-auto mx-1"
            />
            <div className="my-auto">{data.title.toUpperCase()}</div>
          </div>
        </Link>
      </div>
    );
  };
  return (
    <div id={styles.mobile_category_popup} className="mt-3 mb-2 mx-auto">
      <div className="container">
        <div className="w-100 d-flex justify-content-between pt-2 pb-2">
          <div id={styles.title}>CHUYÊN MỤC</div>
          <Image
            src="/icon/x_icon.svg"
            alt="cancel icon"
            width="24"
            height="24"
            onClick={() => {
              setPopupStatus({ ...popupStatus, categoryPopup: false });
            }}
          />
        </div>
      </div>
      <div
        className={`w-100 bg-light-gray`}
        id={styles.header_title_border}
      ></div>
      <div className="container pb-2 mt-2">
        <div className="row">
          {category.map((e, i) => (
            <CategoryItem data={e} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileCategoryPopup;
