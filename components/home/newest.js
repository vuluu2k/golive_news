import React, { useState } from 'react';
import ArticleLG from '../common/article-lg';

function Newest(props) {
    const [dataNewest, setDataNewest] = useState(props.data);
    return (
        <section className='row mt-3'>
            {dataNewest.map((item, index) => <ArticleLG isTouchDevice={props.isTouchDevice} zoom={true} showSummary={true} position={index} key={index} title={item.title} category={item.category} datetime={item.datetime} summary={item.summary} thumbnail={item.thumbnail} url={item.url} categoryUrl={item.category_url}/>)}
        </section>
    );
}

export default Newest;