import styles from "../../styles/advertisement.module.css"
import Image from "next/image"

function Advertisement() {
  return (
    <>
      <div className={"mt-3 " + styles.sticky}>
        <Image
          src="/images/advertisement1.png"
          alt="first ad"
          width="14"
          height="14"
          layout="responsive"
          className="mb-2"
        />
        <Image
          src="/images/advertisement2.png"
          alt="second ad"
          width="14"
          height="14"
          layout="responsive"
        />
      </div>
    </>
  )
}

export default Advertisement
