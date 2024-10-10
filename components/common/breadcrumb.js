import Link from 'next/link';
import React from 'react';

function Breadcrumb(props) {
    const { breadcrumbs } = props;
    const activeBreadcrumb = breadcrumbs.slice(-1)[0];
    const breadcrumbsWithoutActive = breadcrumbs.slice(0, -1);
    return (
        <nav aria-label="breadcrumb" className='mt-3'>
            <ol className="breadcrumb">
                {breadcrumbsWithoutActive.map((item, index) => <li key={index} className="breadcrumb-item">
                    <Link href="/forums" as={item.view_url} key={index} title={item.title}>
                        {item.title}
                    </Link>
                </li>)}
                <li className="breadcrumb-item active" aria-current="page">
                    <Link href="/[id]" as={activeBreadcrumb.view_url} title={activeBreadcrumb.title}>
                        {activeBreadcrumb.title}
                    </Link>
                </li>
            </ol>
        </nav>
    );
}

export default Breadcrumb;