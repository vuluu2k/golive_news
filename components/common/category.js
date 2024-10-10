import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from "../../styles/Home.module.css";
import { timeAgos } from '../../utils/dateHandler';

function CategoryLayout(props) {
    const { data, categoryTitle, categorySlug } = props;
    const categoryData = data.slice(0, 3);

    return (
        <div className={styles.category_mobile_section + ' row mt-3'}>
            <h2 className={styles.category_mobile_title + ' txt-red ' + styles[categorySlug]}>{categoryTitle}</h2>
            {categoryData.map((item, index) => {
                return (
                    <div className={(index === 0 ? styles.category_mobile_first : '') + ' col-12 col-sm-6 col-md-4 col-lg-4'} key={index}>
                        {index === 0 && (
                            <div className='h-100'>
                                <Link href="/[id]" as={item.url} title={item.title}>
                                    <Image src={item.thumbnail} alt={item.title} width={304} height={241} layout='responsive' className={styles.img_thumbnail_catagory}/>
                                </Link>
                                <Link href="/[id]" as={item.url} title={item.title}>
                                    <h3 className={styles.title + ' mt-2'}>{item.title}</h3>
                                </Link>
                                <p className={styles.summary}>{item.summary}</p>
                                <div>
                                    {/* <Link href="/[id]" as={item.categoryUrl} title={item.category}>
                                        <span className={styles.category_title + ' txt-red'}>{item.category}</span>
                                    </Link> */}
                                    <Link href="/members/[id]" as={item.profile_url} title={item.username}>
                                        <span className={styles.username_text + " txt-red username-text"}>
                                            {item.username}
                                        </span>
                                    </Link>
                                    <span className={styles.datetime}>{timeAgos(item.datetime)}</span>
                                </div>
                            </div>
                        )}
                        {index !== 0 && (
                            <div className={'row mt-3 h-100' + styles.mobile_layout}>
                                <div className="col">
                                    <Link
                                        href="/[id]"
                                        as={item.url}
                                        title={item.title}>
                                        <Image src={item.thumbnail} alt={item.title} width={304} height={241} layout='responsive' className={styles.img_thumbnail_catagory_small} />
                                    </Link>
                                </div>
                                <div className="col ps-0">
                                    <Link
                                        href="/[id]"
                                        as={item.url}
                                        title={item.title}>
                                        <h3 className={styles.title}>{item.title}</h3>
                                    </Link>
                                    <div>
                                        <Link href="/members/[id]" as={item.profile_url} title={item.username}>
                                            <span className={styles.username_text + " txt-red username-text"}>
                                                {item.username}
                                            </span>
                                        </Link>
                                        {/* <span className="text-muted"> •</span> */}
                                        <span className={styles.datetime + " txt-mid-gray"}>
                                            {timeAgos(item.datetime)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CategoryLayout;