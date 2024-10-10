import axiosInstance from "../../../utils/axios"
import { getCache, setCache } from "../../../utils/redis"

export default async function handler(req, res) {
    try {
        const { page = 1 } = req.query;
        const existCache = await getCache(`trendingThreads_page_${page}`);
        if (existCache) {
            return res.status(200).json(existCache);
        }
        const { data: { threads, pagination } } = await axiosInstance.get(`/threads`, {
            params: {
                order: "view_count",
                page
            }
        });
        const dataResult = {
            data: threads,
            pagination
          }
        await setCache(`trendingThreads_page_${page}`, dataResult);
        res.status(200).json(dataResult);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi xảy ra!" });
    }
}
