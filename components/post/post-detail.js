import React from "react"
import styles from "../../styles/Content.module.css"
import ArticleAuthorHeader from "../common/article-author-header"
import ArticleCommentAndTag from "../common/article-comment-n-tag"
import Breadcrumb from "../common/breadcrumb"
import { tagData } from "../../mocks/data"
import AvatarDefault from "../../public/images/avatar-default.jpg"

function PostDetail(props) {
  const { data } = props
  var {
    message,
    Attachments,
    post_date,
    Thread: {
      Forum: { breadcrumbs },
      title,
      view_url,
      tags,
    },
    User: {
      username: name,
      avatar_urls: { s: profileAvatar },
      view_url: profileUrl,
      message_count: totalPost,
    },
  } = data;
  profileUrl = profileUrl.replace(/^https?:\/\/[a-z\:0-9.]+/, "");
  profileAvatar = profileAvatar || AvatarDefault;
  view_url = view_url.replace(/^https?:\/\/[a-z\:0-9.]+/, "")

  function handleContent(msg) {
    const attachs = msg.match(/\[ATTACH.*?\](\d+)\[\/ATTACH\]/g) || []
    attachs.map((attach) => {
      const attachId = attach.match(/\[ATTACH.*?\](\d+)\[\/ATTACH\]/)[1]
      const attachData = Attachments.find((item) => item.attachment_id == attachId)
      msg = msg.replace(
        attach,
        `<a href="${attachData.direct_url}"><img src="${attachData.direct_url}" alt="${attachData.filename}" /></a>`
      )
    })
    // replace all [B] => <b> and [/B] => </b>
    msg = msg.replace(/\[B\]/g, "<b>").replace(/\[\/B\]/g, "</b>");
    // replace all [I] => <i> and [/I] => </i>
    msg = msg.replace(/\[I\]/g, "<i>").replace(/\[\/I\]/g, "</i>");
    // replace all [U] => <u> and [/U] => </u>
    msg = msg.replace(/\[U\]/g, "<u>").replace(/\[\/U\]/g, "</u>");
    // replace all [CENTER]...[/CENTER] => <div style="text-align: center">...</div>
    msg = msg.replace(/\[CENTER\]/g, `<div style="text-align: center">`).replace(/\[\/CENTER\]/g, `</div>`);
    // replace all [LEFT]...[/LEFT] => <div style="text-align: left">...</div>
    msg = msg.replace(/\[LEFT\]/g, `<div style="text-align: left">`).replace(/\[\/LEFT\]/g, `</div>`);
    // replace new line
    msg = msg.replace(/\r/g, "<br />").replace(/\n/g, "<br />");
    // convert [URL]https://forms.gle/Wmi9ceSNei8RV9sA8[/URL] to a href
    msg = msg.replace(/\[URL='(.*?)'\](.*?)\[\/URL\]/g, `<a href="$1">$2</a>`);
    // convert [URL]https://tinyurl.com/theeface23ef[/URL] to a href
    msg = msg.replace(/\[URL\](.*?)\[\/URL\]/g, `<a href="$1">$1</a>`);
    // replace all [JUSTIFY]...[/JUSTIFY] => <div style="text-align: justify">...</div>
    msg = msg.replace(/\[JUSTIFY\]/g, `<div style="text-align: justify">`).replace(/\[\/JUSTIFY\]/g, `</div>`);
    // replace all [RIGHT]...[/RIGHT] => <div style="text-align: right">...</div>
    msg = msg.replace(/\[RIGHT\]/g, `<div style="text-align: right">`).replace(/\[\/RIGHT\]/g, `</div>`);
    // replace all [QUOTE]...[/QUOTE] => <blockquote>...</blockquote>
    msg = msg.replace(/\[QUOTE\]/g, `<blockquote>`).replace(/\[\/QUOTE\]/g, `</blockquote>`);
    // replace all [QUOTE="..."]...[/QUOTE] => <blockquote><b>...</b>...</blockquote>
    msg = msg.replace(/\[QUOTE="(.*?)"\]/g, `<blockquote><b>$1</b>`).replace(/\[\/QUOTE\]/g, `</blockquote>`);
    // replace all [CODE]...[/CODE] => <pre>...</pre>
    msg = msg.replace(/\[CODE\]/g, `<pre>`).replace(/\[\/CODE\]/g, `</pre>`);
    // replace all [CODE="..."]...[/CODE] => <pre><b>...</b>...</pre>
    msg = msg.replace(/\[CODE="(.*?)"\]/g, `<pre><b>$1</b>`).replace(/\[\/CODE\]/g, `</pre>`);
    // replace all [IMG]...[/IMG] => <img src="..." />
    msg = msg.replace(/\[IMG\](.*?)\[\/IMG\]/g, `<img src="$1" />`);
    // replace all [IMG alt=""]...[/IMG] => <img src="..." alt="..." />
    msg = msg.replace(/\[IMG alt="(.*?)"\](.*?)\[\/IMG\]/g, `<img src="$2" alt="$1" />`);
    return msg;
  }

  return (
    <>
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <h1 className={styles.content_section_title}>{title}</h1>
      <ArticleAuthorHeader
        author={{ name, totalPost, profileUrl, profileAvatar }}
        artDetail={{ shareCount: 289, createdAt: post_date, view_url }}
      />
      <div
        className={styles.content_section}
        dangerouslySetInnerHTML={{ __html: handleContent(message) }}
      ></div>
      <ArticleCommentAndTag
        listTag={tags.length ? tags : tagData}
        url={view_url}
      />
    </>
  )
}

export default PostDetail
