// Class that connects to redis client
// and provides methods to interact with redis

const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
    }
}