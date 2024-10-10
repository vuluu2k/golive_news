import React from 'react';
import { FacebookProvider, Share } from 'react-facebook';

function FacebookShareButton(props) {
    const { url, size = 'large' } = props;
    return (
        <FacebookProvider appId={process.env.fbAppId}>
            <Share href={url} size={size} layout='button_count' lazy={true} />
        </FacebookProvider>
    );
}

export default FacebookShareButton;