import ButtonPlus from "../../components/button/ButtonPlus";
import styles from "../../styles/Home-content-2.module.css";
import CardHorizontal from "../common/card-horizontal";

export default function NotMiss(props) {
  const dataNotMiss = props.data.slice(0, 4);

  return (
    <section className="tab-homepage not-miss mt-5">
      <div className={styles.most_int_header}>
        <span className={styles.most_int_header_title}>ĐỪNG BỎ LỠ</span>
      </div>
      <div className="my-3 text-end d-none d-sm-block">
        <ButtonPlus alt="Xem thêm" />
      </div>
      <div className="row not-miss-content mt-3">
        {dataNotMiss.map((e, i) => (
            <CardHorizontal
              key={i}
              title={e.title}
              srcImg={e.thumbnail}
              width={214}
              height={178}
              text={e.title}
              url={e.url}
              musicText={e.category}
              time={e.datetime}
              categoryUrl={e.category_url}
            />
        ))}
      </div>
      <div className="my-3 text-center d-block d-sm-none">
        <ButtonPlus alt="Xem thêm" />
      </div>
    </section>
  );
}
