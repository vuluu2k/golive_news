import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

function FacebookComment(props) {
    const { url } = props;
    return (
        <FacebookProvider appId={process.env.fbAppId}>
            <Comments href={url} width="100%"/>
        </FacebookProvider>
    );
}

export default FacebookComment;