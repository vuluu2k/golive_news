import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../../styles/Home.module.css";

function ArticleSelect(props) {
    const { title, thumbnail, url, pageMagazine } = props;
    const [src, setSrc] = useState(thumbnail);
    
    return (
        <div className={styles.selected_item + (pageMagazine ? " bg-special" : "")}>
            <Link
                href="/[id]"
                as={url}
                title={title}>
                <Image src={src} alt={title} width={304} height={250} className={styles.img_thumbnail_selected + ' mgz_img_thumbnail_selected'} onError={() => setSrc(process.env.DEFAULT_THUMBNAIL_URL)}/>
                <h3 className={styles.title + ' txt-white ' + styles.title_selected}>{title}</h3>
            </Link>
        </div>
    );
}

export default ArticleSelect;