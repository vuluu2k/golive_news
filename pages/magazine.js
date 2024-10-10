import dynamic from "next/dynamic"
const PostDynamic = dynamic(() => import("../components/common/post"))
import { useState } from "react"
const PostSliderDynamic = dynamic(() =>
  import("../components/home/post-slider")
)
const ArticleAuthorHeaderDynamic = dynamic(() =>
  import("../components/common/article-author-header")
)
const ArticleCommentAndTagDynamic = dynamic(() =>
  import("../components/common/article-comment-n-tag")
)
import Layout from "../components/layout"
import HomepageController from "../controller/homepage"
import useIsTouchDevice from "./../utils/useMobileDetect"
import { tagData } from "../mocks/data"
import { useContext } from "react"
import { PopupContext } from "./_app"

// This gets called on every request
export async function getServerSideProps() {
  const selectedPost = await HomepageController.getSelectedPost()
  const stickyPost = await HomepageController.getStickyPost()
  return {
    props: {
      selectedPost,
      title: "Magazine",
      stickyPost,
    },
  }
}

function Magazine(props) {
  const { title, selectedPost, stickyPost } = props
  const { setNewestPost } = useContext(PopupContext)
  setNewestPost(stickyPost)
  const isTouchDevice = useIsTouchDevice()
  const data = [
    {
      title: "Hoa Hậu",
      srcImg: "",
      url: "/test.t123",
      thumbnail: "https://golive.vn/data/dc_thumbnails/1222.jpg",
      title:
        "Hoa khôi FPT Nguyễn Thu Thủy: Sáng đi thi, tối miệt mài chạy sự kiện",
      summary:
        "Vượt qua 11 thí sinh trong đêm chung kết, Nguyễn Thu Thủy đã chính thức trở thành Hoa khôi Đại học FPT Hà Nội 2022.",
      content:
        'Câu nói này của Thùy Tiên làm tôi nhớ đến một nhận định ai đó từng nói rằng: Một trong những sứ mệnh lớn nhất trong cuộc đời thanh xuân tuổi của Thùy Tiên đó là lựa chọn Miss Grand International để làm "sân khấu" cho riêng mình đúng thời điểm - đúng hoàn cảnh và đúng thực lực.' +
        "Sau bao cố gắng để hoàn thiện bản thân với những chuỗi ngày thăng hoa trong cảm xúc, trong đó có cả sự gồng gánh trọng trách trên vai, có lần tôi thấy Thùy Tiên đã rơi nước mắt và rất nhiều lần cô ấy đã khóc... nhưng đó là nước mắt của sự chiến thắng." +
        "Càng lắng nghe Thùy Tiên chia sẻ những giờ phút cuối cùng của nhiệm kỳ, tôi càng ngẫm nghĩ - càng thấy đúng cho nhận định năm kia cô ấy từng nói: Tôi sẽ có một nhiệm kỳ khiến cả Việt Nam tự hào",
    },
    {
      title: "Hoa Hậu",
      srcImg: "",
      url: "/test.t123",
      thumbnail: "https://golive.vn/data/dc_thumbnails/1222.jpg",
      title:
        "Hoa khôi FPT Nguyễn Thu Thủy: Sáng đi thi, tối miệt mài chạy sự kiện",
      summary:
        "Vượt qua 11 thí sinh trong đêm chung kết, Nguyễn Thu Thủy đã chính thức trở thành Hoa khôi Đại học FPT Hà Nội 2022.",
      content:
        'Câu nói này của Thùy Tiên làm tôi nhớ đến một nhận định ai đó từng nói rằng: Một trong những sứ mệnh lớn nhất trong cuộc đời thanh xuân tuổi của Thùy Tiên đó là lựa chọn Miss Grand International để làm "sân khấu" cho riêng mình đúng thời điểm - đúng hoàn cảnh và đúng thực lực.' +
        "Sau bao cố gắng để hoàn thiện bản thân với những chuỗi ngày thăng hoa trong cảm xúc, trong đó có cả sự gồng gánh trọng trách trên vai, có lần tôi thấy Thùy Tiên đã rơi nước mắt và rất nhiều lần cô ấy đã khóc... nhưng đó là nước mắt của sự chiến thắng." +
        "Càng lắng nghe Thùy Tiên chia sẻ những giờ phút cuối cùng của nhiệm kỳ, tôi càng ngẫm nghĩ - càng thấy đúng cho nhận định năm kia cô ấy từng nói: Tôi sẽ có một nhiệm kỳ khiến cả Việt Nam tự hào",
    },
    {
      title: "Hoa Hậu Thùy Tiên",
      srcImg: "",
      url: "/test.t123",
      thumbnail: "https://golive.vn/data/dc_thumbnails/1222.jpg",
      title:
        "Hoa khôi FPT Nguyễn Thu Thủy: Sáng đi thi, tối miệt mài chạy sự kiện",
      summary:
        "Vượt qua 11 thí sinh trong đêm chung kết, Nguyễn Thu Thủy đã chính thức trở thành Hoa khôi Đại học FPT Hà Nội 2022.",
      content:
        'Câu nói này của Thùy Tiên làm tôi nhớ đến một nhận định ai đó từng nói rằng: Một trong những sứ mệnh lớn nhất trong cuộc đời thanh xuân tuổi của Thùy Tiên đó là lựa chọn Miss Grand International để làm "sân khấu" cho riêng mình đúng thời điểm - đúng hoàn cảnh và đúng thực lực.' +
        "Sau bao cố gắng để hoàn thiện bản thân với những chuỗi ngày thăng hoa trong cảm xúc, trong đó có cả sự gồng gánh trọng trách trên vai, có lần tôi thấy Thùy Tiên đã rơi nước mắt và rất nhiều lần cô ấy đã khóc... nhưng đó là nước mắt của sự chiến thắng." +
        "Càng lắng nghe Thùy Tiên chia sẻ những giờ phút cuối cùng của nhiệm kỳ, tôi càng ngẫm nghĩ - càng thấy đúng cho nhận định năm kia cô ấy từng nói: Tôi sẽ có một nhiệm kỳ khiến cả Việt Nam tự hào",
    },
  ]
  const [dataMagazine, setDataMagazine] = useState(data)
  const view_url = "https://golive.vn/magazine"
  const magazineTitle =
    "Chấm điểm 4 bộ váy final walk của dàn Hoa hậu Việt: Váy của Đỗ Hà lộng lẫy nhưng hơi 'Miss Grand'"
  const author = {
    name: "Tường San",
    totalPost: 217,
    profileUrl: "https://golive.vn/members/tuong-san.35/",
    profileAvatar: "https://golive.vn/data/avatars/l/0/35.jpg?1663644790",
    last_activity: 1671497941,
  }
  return (
    <>
      <Layout title={`${title} - ${process.env.siteTitle}`}></Layout>
      <div className="container-lg mb-3">
        <h3 className="my-3 txt-bold mx-0">{magazineTitle}</h3>
        <ArticleAuthorHeaderDynamic
          author={author}
          artDetail={{ shareCount: 289, createdAt: author.last_activity }}
        />
      </div>
      {dataMagazine.map((e, i) => (
        <PostDynamic
          title={e.title}
          srcImg={e.srcImg}
          content={e.content}
          key={i}
          index={i}
        />
      ))}
      <div className="container-lg mb-3">
        <ArticleCommentAndTagDynamic listTag={tagData} url={view_url} />
      </div>
      <div className="bg-red">
        <div className="container-lg mb-2">
          <div className="row">
            <div className="col-12">
              <PostSliderDynamic
                dataSelected={selectedPost}
                isTouchDevice={isTouchDevice}
                sliderTitle="SPECIAL"
                iconType="special"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Magazine
