import Image from "next/image";
import PlayIcon from "../../public/images/play.svg";
import styles from "../../styles/Home-content-2.module.css";
import BgImage from "../../public/images/bentrentanglau.png";

export default function ImagePlay(props) {
  const { widthIcon, heightIcon, width, height, main } = props;
  return (
    <div className={styles.image_play}>
      <Image
        src={BgImage}
        width={width}
        height={height}
        layout="responsive"
        alt="image youtube"
      />
      <div className={styles.title_icon + " bg-light-black background-icon"}>
        <Image
          width={widthIcon}
          height={heightIcon}
          src={PlayIcon}
          className={styles.icon_play}
          alt="icon play"
        />
      </div>
      <style jsx>{`
        .background-icon {
          width: ${main ? "100px" : "50px"} ;
          height: ${main ? "100px" : "50px"};
        }
      `}</style>
    </div>
  );
}
