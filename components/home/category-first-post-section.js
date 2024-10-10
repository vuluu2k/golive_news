import VerticalPostCard from "../common/vertical-post-card"
import Image from "next/image"
import Link from "next/link"
import useIsTouchDevice from "./../../utils/useMobileDetect"
import dynamic from "next/dynamic"
const NewestDynamic = dynamic(() => import("../home/newest"))

function CategoryFirstPostSection(props) {
  const { data } = props
  const justTitle = data.slice(3, 5)
  const isTouchDevice = useIsTouchDevice()
  return (
    <>
      {isTouchDevice ? (
        <NewestDynamic data={data} isTouchDevice={isTouchDevice} />
      ) : (
        <>
          <div className="row mt-3">
            <div className="col-8">
              <VerticalPostCard
                wrapperClass="h-100"
                data={data[0]}
                imgClass="first_category_post_img"
              />
            </div>
            <div className="col-4">
              <VerticalPostCard data={data[1]} />
              <VerticalPostCard data={data[2]} />
            </div>
          </div>
          <div className="row bg-gray g-0 mt-3" style={{ height: 1 }}></div>
          <div className="row mt-4">
            {justTitle.map((e, i) => (
              <div className="col-12 d-flex" key={i}>
                <div>
                  <Image
                    src="/icon/dot_icon.svg"
                    alt="dot icon"
                    width="10"
                    height="10"
                    className="my-auto"
                  />
                </div>
                <Link href={e.url}>
                  <div className="ms-3 font-20 txt-bold">{e.title}</div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default CategoryFirstPostSection
