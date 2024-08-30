// Class that connects to redis client
// and provides methods to interact with redis

import { createClient } from 'redis';

class RedisClient {
    constructor() {
        // create a new redis client instance
        this.client = createClient();

        // log error if any
        this.client.on('error', (err) => {
            console.log(`Error: ${err}`);
        });
    }
    isAlive() {
        return this.client.connected;
    }
    async get(key) {
        return this.client.get(key);
    }
    async set(key, value, duration) {
        this.client.setex(key, duration, value);
    }
    async del(key) {
        this.client.del(key);
    }
}

// export the class
const redisClient = new RedisClient();
export default redisClient;