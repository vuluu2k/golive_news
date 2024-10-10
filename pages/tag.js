import { useState } from "react";
import styles from "../styles/tag-page.module.css";
import { searchPostData } from "../mocks/data";
import Advertisement from "./../components/common/advertisement";
import HomepageController from "../controller/homepage"
import dynamic from "next/dynamic";
import Head from "next/head";
import { useContext } from "react"
import { PopupContext } from "./_app"
const ArticleHorizontalDynamic = dynamic(() =>
  import("../components/common/article-horizontal")
);
const ArticleLGDynamic = dynamic(() =>
  import("../components/common/article-lg")
);
import ButtonPlus from "./../components/button/ButtonPlus";
import useIsTouchDevice from "./../utils/useMobileDetect";

function Tag(props) {
  const { tagName } = props;
  const [data, setData] = useState(searchPostData);
  const isTouchDevice = useIsTouchDevice();

  return (
    <>
      <Head>
        <title>{`Từ khóa - ${tagName} - ${process.env.siteTitle}`}</title>
        <meta
          property="og:title"
          content={`Từ khóa - ${tagName} - ${process.env.siteTitle}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.SITE_URL} />
        <meta
          property="og:image"
          content={data[0]?.thumbnail || process.env.DEFAULT_THUMBNAIL_URL}
        />
        <meta
          property="og:description"
          content={`Từ khóa - ${tagName} - ${process.env.siteTitle}`}
        />
        <meta
          name="twitter:title"
          content={`Từ khóa - ${tagName} - ${process.env.siteTitle}`}
        />
        <meta
          name="twitter:description"
          content={`Từ khóa - ${tagName} - ${process.env.siteTitle}`}
        />
        <meta
          name="description"
          content={`Từ khóa - ${tagName} - ${process.env.siteTitle}`}
        ></meta>
        <meta
          name="twitter:image"
          content={data[0]?.thumbnail || process.env.DEFAULT_THUMBNAIL_URL}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="container-lg my-3">
        <div className="row ">
          <div className="col-12">
            <div className="d-flex">
              <div className="d-flex flex-column">
                <h3 className="txt-bold">Tìm kiếm theo từ khóa</h3>
                <div
                  className="bg-red w-100"
                  id={styles.title_under_line}
                ></div>
              </div>
              <div
                className="flex-grow-1"
                id={styles.more_title_under_line}
              ></div>
            </div>
          </div>
          <div className="col-lg-9 col-12">
            <div className="mt-3">
              <div className="bg-red txt-white px-3" id={styles.tag_name}>
                {tagName}
              </div>
            </div>
            <div className="mt-3 txt-gray">
              Golive cập nhật tin tức, sự kiện, hình ảnh, video clip hot nhất
              24h qua về chủ đề <strong>{tagName}</strong>
            </div>
            <div className="mt-3">
              {data
                .slice(0, 10)
                .map((e, i) =>
                  !isTouchDevice ? (
                    <ArticleHorizontalDynamic
                      key={i}
                      title={e.title}
                      srcImg={e.thumbnail}
                      musicText={e.category}
                      username={e.username}
                      time={e.datetime}
                      width={260}
                      height={180}
                      url={e.url}
                      categoryUrl={e.category_url}
                      profileUrl={e.profile_url}
                      border={true}
                    />
                  ) : (
                    <ArticleLGDynamic
                      isTouchDevice={isTouchDevice}
                      zoom={true}
                      showSummary={true}
                      position={i + 1}
                      key={i}
                      title={e.title}
                      category={e.category}
                      datetime={e.datetime}
                      summary={e.summary}
                      thumbnail={e.thumbnail}
                      url={e.url}
                      categoryUrl={e.category_url}
                    />
                  )
                )}
            </div>
            <div className="d-flex justify-content-center">
              <ButtonPlus alt="Xem thêm" />
            </div>
          </div>
          <div className="col-lg-3 col-0">
            <Advertisement />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { tagName } = ctx.query;
    const stickyPost = await HomepageController.getStickyPost()
    return {
      props: {
        tagName,
        stickyPost
      },
    };
  } catch (error) {
    console.log("error====", error);
    return {
      notFound: true,
    };
  }
}

export default Tag;
