import redisClient from '../utils/redis';
import dbClient from '../utils/db';

const getStatus = async (req, res) => {
  try {
    const redisStatus = await redisClient.isAlive();
    const dbStatus = await dbClient.isAlive();
    res.status(200).json({ redis: redisStatus, db: dbStatus });
  } catch (error) {
    res.status(500).json({ redis: false, db: false });
  }
};

const getStats = async (req, res) => {
  try {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    res.status(200).json({ users: usersCount, files: filesCount });
  } catch (error) {
    res.status(500).json({ error: 'Cannot get the stats' });
  }
};

export default { getStatus, getStats };
