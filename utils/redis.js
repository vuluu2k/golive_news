import Redis from "ioredis";

const redisConfig = {
    autoResubscribe: false,
    lazyConnect: true,
    maxRetriesPerRequest: 2, // <-- this seems to prevent retries and allow for try/catch
};
const redis = new Redis(process.env.REDIS_URL, redisConfig);

module.exports = {
    getCache: async (key) => {
        try {
            const data = await redis.get(key);
            return JSON.parse(data);
        } catch (error) {
            return false;
        }
    },
    setCache: async (key, value, expire = 60 * 60 * 1) => {
        try {
            await redis.set(key, JSON.stringify(value), 'EX', expire);
        } catch (error) {
            return false;
        }
    }
}