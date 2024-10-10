module.exports = {
  getStickyPost: async () => {
    try {
      const stickyThreads = await fetch(
        `${process.env.DEV_API_URL}/post/sticky`
      )
      let posts = (await stickyThreads.json()) || []
      posts = posts.map((post) => {
        const {
          title,
          view_url,
          post_date,
          thread_id,
          snippet,
          Forum: { title: forumTitle, view_url: forumViewUrl },
          User: { username, view_url: profile_url, avatar_urls: user_avata },
        } = post
        return {
          title,
          category: forumTitle,
          url: view_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
          category_url: forumViewUrl.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
          datetime: post_date,
          summary: snippet,
          thumbnail: `${process.env.THUMBNAIL_URL_PREFIX}${thread_id}.jpg`,
          username,
          profile_url: profile_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
          user_avata,
        }
      })
      return posts
    } catch (error) {
      console.log("====================================")
      console.log(error)
      console.log("====================================")
      return []
    }
  },
  getSelectedPost: async () => {
    try {
      const selectedThreads = await fetch(
        `${process.env.DEV_API_URL}/forum/${process.env.highlightPostsForumsID}`
      )
      let posts = (await selectedThreads.json()) || { data: [] }
      posts = posts.data.map((post) => {
        const {
          title,
          view_url,
          post_date,
          thread_id,
          Forum: { title: forumTitle, view_url: forumViewUrl },
          User: { username, view_url: profile_url },
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
        }
      })
      return posts
    } catch (error) {
      console.log("====================================")
      console.log(error)
      console.log("====================================")
      return []
    }
  },
  getPostByCategoryID: async ({
    page = 1,
    withEndpoint = true,
    categoryID,
    includeSnippet = false,
    getHighlight = false,
    ordViewCount = false,
  }) => {
    try {
      const selectedThreads = await fetch(
        `${
          withEndpoint ? process.env.DEV_API_URL : "/api"
        }/forum/${categoryID}?page=${page}&includeSnippet=${includeSnippet}&getHighlight=${getHighlight}&ordViewCount=${ordViewCount}`
      )
      const posts = (await selectedThreads.json()) || { data: [] }
      const postData = posts.data.map((post) => {
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
        data: postData,
        last_page: posts.pagination.last_page,
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
  },
  getTrendingPost: async (page = 1, withEndpoint = true) => {
    try {
      const trendingThreads = await fetch(
        `${
          withEndpoint ? process.env.DEV_API_URL : "/api"
        }/post/trending?page=${page}`
      )
      let posts = (await trendingThreads.json()) || { data: [] }
      // limit to 6 posts
      const postData = posts.data.map((post) => {
        const {
          title,
          view_url,
          post_date,
          thread_id,
          Forum: { title: forumTitle, view_url: forumViewUrl },
          User: { username, view_url: profile_url, avatar_urls: user_avata },
        } = post
        return {
          title,
          category: forumTitle,
          url: view_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
          category_url: forumViewUrl.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
          datetime: post_date,
          summary: "",
          thumbnail: `${process.env.THUMBNAIL_URL_PREFIX}${thread_id}.jpg`,
          username,
          profile_url: profile_url.replace(/^https?:\/\/[a-z\:0-9.]+/, ""),
          user_avata,
        }
      })
      return {
        data: postData,
        last_page: posts.pagination.last_page,
      }
    } catch (error) {
      console.log("====================================")
      console.log(error)
      console.log("====================================")
      return {
        data: [],
        last_page: 1,
      }
    }
  },
  getAllNodes: async () => {
    try {
      const allNodes = await fetch(
        `${process.env.DEV_API_URL}/nodes`
      )
      let nodes = (await allNodes.json()) || { data: [] }
      return {
        data: nodes
      }
    } catch (error) {
      console.log("====================================")
      console.log(error)
      console.log("====================================")
      return {
        data: [],
        last_page: 1,
      }
    }
  },
}
