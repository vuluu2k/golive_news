import Image from "next/image";
import Link from "next/link";

function CardImage(props) {
  const { width, height, title, srcImg, url } = props;
  return (
    <div>
      <Link href="/[id]" as={url} title={title}>
        <Image
          src={srcImg}
          width={width}
          height={height}
          alt={title}
          layout="responsive"
        />
        <h3 className="card-title mt-3 text-black">{title}</h3>
      </Link>
    </div>
  );
}

export default CardImage;
