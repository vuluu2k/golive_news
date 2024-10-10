import React, { useState } from 'react';
import ButtonPlus from "../button/ButtonPlus";
import styles from "../../styles/Home.module.css";
import ArticleLG from '../common/article-lg';

function MostInterested(props) {
    const [dataMostInterested, setDataMostInterested] = useState(props.data);
    return (
        <section className={styles.section}>
            <div className={styles.most_int_header}>
                <span className={styles.most_int_header_title}>QUAN TÂM NHẤT</span>
            </div>
            <div className="my-3 text-end">
                <ButtonPlus alt="Xem thêm" />
            </div>
            <div className='row'>
                {dataMostInterested.map((item, index) => <ArticleLG key={index} title={item.title} category={item.category} datetime={item.datetime} summary={item.summary} thumbnail={item.thumbnail} url={item.url} categoryUrl={item.category_url} />)}
            </div>
        </section>
    );
}

export default MostInterested;