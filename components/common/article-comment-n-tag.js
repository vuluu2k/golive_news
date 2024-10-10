import Image from "next/image"
import FacebookComment from "../social-plugin/comment-facebook"
import { useRouter } from "next/router"

function ArticleCommentAndTag(props) {
  const { listTag, url, isProfilePage } = props
  const router = useRouter()
  const pushTagPage = (tag) => {
    router.push({
      pathname: "/tag",
      query: {
        tagName: tag,
      },
    })
  }

  const ArticleTagItem = (tagItemProps) => {
    const { value } = tagItemProps
    return (
      <span
        className="bg-light-gray txt-gray cursor-pointer"
        style={{
          padding: "0 5px",
          borderRadius: 5,
          minWidth: "fit-content",
          fontSize: 16,
          fontWeight: 400,
          marginRight: 10,
          marginTop: 8,
        }}
        onClick={() => {
          pushTagPage(value)
        }}
      >
        {value}
      </span>
    )
  }

  return (
    <section id="list_tag_container" className="mt-3">
      <div className={`col-12 txt-black d-flex`}>
        <Image
          src="/icon/message_square_icon.svg"
          alt="mail icon"
          width="20"
          height="20"
          className="my-auto me-1"
        />
        <p className="my-auto txt-bold mx-2">BÌNH LUẬN</p>
      </div>
      <FacebookComment url={url} />

      {!isProfilePage ? (
        <>
          <div className="row mt-3">
            <div className={`col-12 txt-black d-flex`}>
              <Image
                src="/icon/tag_icon.svg"
                alt="mail icon"
                width="15"
                height="15"
                className="my-auto me-1"
              />
              <p className="my-auto txt-red txt-bold">Tag</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="d-flex flex-wrap">
                {listTag.map((e, i) => (
                  <ArticleTagItem value={e} key={i} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  )
}

export default ArticleCommentAndTag
