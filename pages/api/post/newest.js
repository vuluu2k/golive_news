import axiosInstance from "../../../utils/axios"
import { getCache, setCache } from "../../../utils/redis"
import queryParser from "../../../utils/queryParser"
import CONST from "./../../../utils/const"

export default async function handler(req, res) {
  const { REGEX_PARTERN } = CONST
  try {
    const { page = 1, includeSnippet = false } = queryParser(req.query)
    const cacheKey = `newest_page_${page}_includeSnippet_${includeSnippet}`
    const existCache = await getCache(cacheKey)
    // if (existCache) {
    //   return res.status(200).json(existCache)
    // }

    const {
      data: { threads, pagination },
    } = await axiosInstance.get(`/threads?page=${page}`)
    if (includeSnippet) {
      const postDatas = threads.map(async (thread, index) => {
        const { first_post_id: postID } = thread
        const postData = await axiosInstance.get(`/posts/${postID}`)
        const data = postData.data.post
        const { message } = data
        // extract text beetwen [B] and [/B]
        const matchSnippet = message.match(REGEX_PARTERN.SNIPPET)
        const snippet = matchSnippet ? matchSnippet[1] : ""
        return {
          ...thread,
          snippet,
        }
      })
      const result = {
        posts: await Promise.all(postDatas),
        pagination,
      }
      await setCache(cacheKey, result)
      return res.status(200).json(result)
    }
    const result = { posts: threads, pagination }
    await setCache(cacheKey, result)
    return res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Có lỗi xảy ra!" })
  }
}
