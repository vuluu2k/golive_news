import axiosInstance from "../../../utils/axios";
import { getCache, setCache } from "../../../utils/redis";

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const existCache = await getCache(`postDetail_${id}`);
    if (existCache) {
      return res.status(200).json(existCache);
    }
    const thread = await axiosInstance.get(`/threads/${id}`);
    const {
      data: {
        thread: { first_post_id: postID },
      },
    } = thread;
    const dataPost = await axiosInstance.get(`/posts/${postID}`);
    const data = dataPost.data.post;
    console.log(data);
    const {
      Thread: {
        Forum: { breadcrumbs, title, node_id, view_url },
      },
    } = data;
    const mapBreadcrumbs = await Promise.all([
      ...breadcrumbs.map(async (item) => {
        const nodeData = await axiosInstance.get(`/nodes/${item.node_id}`);
        return {
          ...item,
          view_url: nodeData.data.node.view_url,
        };
      }),
    ]);
    const result = {
      ...data,
      Thread: {
        ...data.Thread,
        Forum: {
          ...data.Thread.Forum,
          breadcrumbs: [
            ...mapBreadcrumbs,
            ...[{ title, node_id, view_url }],
          ].map((breadcrumb) => {
            return {
              ...breadcrumb,
              view_url: breadcrumb.view_url.replace(
                /^https?:\/\/[a-z\:0-9.]+/,
                ""
              ),
            };
          }),
        },
      },
    };
    await setCache(`postDetail_${id}`, result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Có lỗi xảy ra!" });
  }
}
