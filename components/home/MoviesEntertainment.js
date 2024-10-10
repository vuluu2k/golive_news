import styleHome from "../../styles/Home-content-2.module.css";
import { useState } from "react";
import Star from "../../public/images/Sao.svg";
import Film from "../../public/images/film.svg";
import CardImage from "../common/card-image.js";
import Image from "next/image";
import Link from "next/link";

export default function MovieEntertainment(props) {
  const [dataStar, dataMovie] = props.data;
  return (
    <>
      <section className={styleHome.tab_homepage + " movies-entertainment"}>
        <div className={styleHome.most_int_header}>
          <span className={styleHome.most_int_header_title}>
            ĐIỆN ẢNH VÀ GIẢI TRÍ
          </span>
        </div>
        <div className="row movies-entertainment-content mt-3">
          <div className="col-sm-6">
            <div className="card border-0">
              <h4 className="card-title txt-red">
                <Image src={Star} alt="Star" className="mx-2 mb-2" />
                Sao
              </h4>
              <ul className="movies-entertainment-content-list-link">
                {dataStar.map((e, i) => (<li key={i}>
                  {(i === 0) && <CardImage
                    width={488}
                    height={282}
                    title={e.title}
                    srcImg={e.thumbnail}
                    url={e.url}
                    key={i}
                  />
                  }
                  {(i !== 0) && <Link href="/[id]" as={e.url} title={e.title}>{e.title}</Link>}
                </li>))}
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card border-0">
              <h4 className="card-title txt-red">
                <Image src={Film} alt="Phim" className="mx-2 mb-2" />
                Phim
              </h4>
              <ul className="movies-entertainment-content-list-link">
                {dataMovie.map((e, i) => (<li key={i}>
                  {(i === 0) && <CardImage
                    width={488}
                    height={282}
                    title={e.title}
                    srcImg={e.thumbnail}
                    url={e.url}
                    key={i}
                  />
                  }
                  {(i !== 0) && <Link href="/[id]" as={e.url} title={e.title}>{e.title}</Link>}
                </li>))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
