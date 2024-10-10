import axiosInstance from "../../../utils/axios";
import { getCache, setCache } from "../../../utils/redis";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const existCache = await getCache(`userInfo_${id}`);
    if (existCache) {
      return res.status(200).json(existCache);
    }

    const userInfo = await axiosInstance.get(`/users/${id}`);
    const data = userInfo.data.user;

    await setCache(`userInfo_${id}`, data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!" });
  }
}
