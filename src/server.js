import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import { getEnvVar } from './utils/getEnvVar.js';
import flatsRouter from './routers/flats.js';
import { notFoundHandler } from './utils/notFoundHandler.js';
import { errorHandler } from './utils/errorHandler.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', 3000));

export const startServer = () => {
    const app = express();

    app.use(express.json({ type: ['application/json', 'application/vnd.api+json'] }));
    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.use(flatsRouter);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
