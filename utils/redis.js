#!/usr/bin/node
// Class that connects to redis client and provides methods to interact with it

import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Redis client.
 * @class
 */
class RedisClient {
// Constructor that creates a new redis client instance
// and logs any errors that occur
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
    const getAsync = promisify(this.client.get).bind(this.client);
    // eslint-disable-next-line no-return-await
    return await getAsync(key);
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, value, 'EX', duration);
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }
}

// export the class
const redisClient = new RedisClient();
export default redisClient;
