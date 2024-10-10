import axiosInstance from "../../../utils/axios"
import { getCache, setCache } from "../../../utils/redis"
import CONST from "./../../../utils/const"
import queryParser from "../../../utils/queryParser"

export default async function handler(req, res) {
  const { REGEX_PARTERN } = CONST
  try {
    const {
      id,
      page = 1,
      includeSnippet = false,
      getHighlight = false,
      ordViewCount = false,
    } = queryParser(req.query)
    const existCache = await getCache(
      `forumDetail_${id}_page_${page}_includeSnippet_${includeSnippet}_getHighlight_${getHighlight}_ordViewCount_${ordViewCount}`
    )
    if (existCache) {
      return res.status(200).json(existCache)
    }
    const forums = await axiosInstance.get(`/forums/${id}`)
    const forumData = forums.data.forum
    const threads = await axiosInstance.get(
      `/forums/${id}/threads?page=${page}${
        ordViewCount ? "order=view_count" : ""
      }`
    )
    const data = getHighlight
      ? threads.data.threads.slice(0, process.env.highlightPostsLimit)
      : threads.data.threads
    var result = data.map((thread) => {
      return {
        ...thread,
        Forum: forumData,
      }
    })
    if (includeSnippet) {
      result = result.map(async (thread, index) => {
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
    }
    const dataResult = {
      data: await Promise.all(result),
      pagination: threads.data.pagination,
    }
    await setCache(
      `forumDetail_${id}_page_${page}_includeSnippet_${includeSnippet}_getHighlight_${getHighlight}_ordViewCount_${ordViewCount}`,
      dataResult
    )
    res.status(200).json(dataResult)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Có lỗi xảy ra!" })
  }
}
