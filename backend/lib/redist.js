import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const client = new Redis(process.env.REDIST_URL);

export default client;
