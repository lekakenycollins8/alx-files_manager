#!/usr/bin/node

import express from 'express';
import routes from './routes/index';

const app = express();
app.use('/', routes);

const PORT = process.env.DB_PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
