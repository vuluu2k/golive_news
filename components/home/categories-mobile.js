import React from "react";
import CategoryLayout from "../common/category";

function CategoryMobile(props) {
  const categoriesData = props.data;
  return (
    <>
      {categoriesData.map((item, index) => {
        const { dataPost, title, slug } = item;
        return (
          <CategoryLayout
            key={index}
            data={dataPost?.data}
            categoryTitle={title}
            categorySlug={slug}
          />
        );
      })}
    </>
  );
}

export default CategoryMobile;
