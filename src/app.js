import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoute.js';
import productsRouter from './routes/productsRoute.js';
import sellsRouter from './routes/sellsRoute.js';
import cartsRouter from './routes/cartRoute.js';

dotenv.config()

const PORT = process.env.PORT;

const server = express();
server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(productsRouter);
server.use(sellsRouter);
server.use(cartsRouter);

server.listen(PORT, () => {
    console.log("It's alive!");
});