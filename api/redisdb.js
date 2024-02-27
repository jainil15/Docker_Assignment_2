const redis = require("ioredis");
const dotenv = require("dotenv");

dotenv.config();
const redisClient = new redis.Redis("redis://redisdb:6379");
module.exports = redisClient;
