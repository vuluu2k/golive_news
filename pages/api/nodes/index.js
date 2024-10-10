import axiosInstance from "../../../utils/axios"
import { getCache, setCache } from "../../../utils/redis"

export default async function handler(req, res) {
    try {
        const existCache = await getCache(`all_Nodes`);
        if (existCache) {
            return res.status(200).json(existCache);
        }
        const { data: { nodes } } = await axiosInstance.get(`/nodes`);
        let dataResult = {
            data: nodes
        }
        let promises = dataResult.data.map((node) => {
            return new Promise(async (resolve, reject) => {
                if (node.parent_node_id === 0) {
                    return resolve(node);
                }
                const thread = await axiosInstance.get(`/threads/${node.type_data.last_thread_id}`);
                const {
                    data: {
                        thread: {
                            User: {
                                avatar_urls: {
                                    s
                                }
                            },
                            view_url
                        }
                    },
                } = thread;
                node.type_data.last_thread_avatar = s;
                node.type_data.last_thread_url = view_url.replace(/^https?:\/\/[a-z\:0-9.]+/, "");
                return resolve(node);
            });
        });
        dataResult = await Promise.all(promises);
        await setCache(`all_Nodes`, dataResult);
        res.status(200).json(dataResult);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Có lỗi xảy ra!" });
    }
}
