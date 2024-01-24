import { Pool, PoolConfig } from 'pg';
require('dotenv').config();

const poolConfig: PoolConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'github',
};

const pool = new Pool(poolConfig);
export default pool;