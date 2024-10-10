import React, { useState } from "react"
import Slider from "react-slick"
import ArticleSelect from "../common/article-select"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import styles from "../../styles/Home.module.css"

const sliderTitleIconClass = {
  selected: styles.selected_icon,
  notmiss: styles.notmiss_icon,
  special: styles.special_icon,
}

function PostSlider(props) {
  const {
    dataSelected,
    isTouchDevice,
    magazine: isMagazinePage,
    sliderTitle,
    iconType,
  } = props

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    mobileFirst: true,
    pauseOnHover: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <section
      className={
        styles.selected_section +
        " bg-red " +
        (isTouchDevice ? "mt-3" : "mt-3") +
        (isMagazinePage ? " container-lg" : "")
      }
    >
      <div
        className={`${styles.slider_title} txt-white ${sliderTitleIconClass[iconType]}`}
      >
        {sliderTitle}
      </div>
      <div className="row">
        <Slider {...settings}>
          {dataSelected.map((item, index) => (
            <ArticleSelect
              key={index}
              title={item.title}
              thumbnail={item.thumbnail}
              url={item.url}
              categoryUrl={item.category_url}
              pageMagazine={isMagazinePage}
            />
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default PostSlider
