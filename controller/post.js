const getNewest = async ({
  page = 1,
  includeSnippet = false,
  withEndpoint = true,
}) => {
  try {
    const fetchRs = await fetch(
      `${
        withEndpoint ? process.env.DEV_API_URL : "/api"
      }/post/newest?page=${page}&includeSnippet=${includeSnippet}`
    )

    const { posts, pagination } = (await fetchRs.json()) || { data: {} }
    const postDatas = posts.map((post) => {
      const {
        title,
        view_url,
        post_date,
        thread_id,
        Forum: { title: forumTitle, view_url: forumViewUrl },
        User: { username, view_url: profile_url },
        snippet,
      } = post
      return {
        title,
        category: forumTitle,
        url: view_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
        category_url: forumViewUrl.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
        datetime: post_date,
        thumbnail: `${process.env.THUMBNAIL_URL_PREFIX}${thread_id}.jpg`,
        username,
        profile_url: profile_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
        ...(includeSnippet && { summary: snippet }),
      }
    })
    return {
      data: postDatas,
      lastPage: pagination.last_page,
    }
  } catch (error) {
    console.log("====================================")
    console.log(error)
    console.log("====================================")
    return {
      data: [],
      last_page: 1,
      message: "notfound",
    }
  }
}

module.exports = { getNewest }
