import axiosInstance from "../../../utils/axios";
import { getCache, setCache } from "../../../utils/redis";
import CONST from "./../../../utils/const";

export default async function handler(req, res) {
  const { REGEX_PARTERN } = CONST;
  try {
    const { id, page = 1 } = req.query;
    const existCache = await getCache(`profilePosts_page_${page}_userID_${id}`);
    if (existCache) {
      return res.status(200).json(existCache);
    }
    // get last 60 threads to find all sticky posts
    const {
      data: { threads },
    } = await axiosInstance.get(`/threads`, {
      params: {
        page,
        starter_id: id,
      },
    });

    const profileThreads = threads.flat();
    const addSnippet = profileThreads.map(async (thread, index) => {
      const { first_post_id: postID } = thread;
      const postData = await axiosInstance.get(`/posts/${postID}`);
      const data = postData.data.post;
      const { message } = data;
      // extract text beetwen [B] and [/B]
      const matchSnippet = message.match(REGEX_PARTERN.SNIPPET);
      const snippet = matchSnippet ? matchSnippet[1] : "";
      return {
        ...thread,
        snippet,
      };
    });
    const result = await Promise.all(addSnippet);
    await setCache(`profilePosts_page_${page}_userID_${id}`, result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Có lỗi xảy ra!" });
  }
}
