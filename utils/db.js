#!/usr/bin/node

// Class DBclient that connects to the database and provides methods to interact with it

import dotenv from 'dotenv';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;

// const mongo = require('mongodb');

dotenv.config();

class DBClient {
  /**
     * Constructs a new instance of the database connection.
     * @constructor
     */
  constructor() {
    // define connection url and database name
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.database = database;
    this.client.connect()
      .then(() => console.log('DB connected!'))
      .catch((err) => console.log('Failed to connect to DB:', err));
  }

  isAlive() {
    return this.client.topology && this.client.topology.isConnected();
  }

  async nbUsers() {
    await this.client.connect();
    const db = this.client.db(this.database);
    const users = db.collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    await this.client.connect();
    const db = this.client.db(this.database);
    const files = db.collection('files');
    return files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
