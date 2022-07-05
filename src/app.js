import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import balanceRouter from './routes/balanceRoutes.js';
import userRouter from './routes/userRoutes.js'

dotenv.config()

const PORT = process.env.PORT;

// Configurações básicas do servidor backend
const server = express();
server.use(cors());
server.use(express.json());

server.use(userRouter);
server.use(balanceRouter);

server.listen(PORT, () => {
    console.log("It's alive!");
});