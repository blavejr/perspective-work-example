import 'dotenv/config';
import app from './app';
import mongoose from 'mongoose';
import config from './utils/config';
import { createTerminus } from '@godaddy/terminus';
import { createServer, Server } from 'http';

const server: Server = createServer(app);

function onSignal(): Promise<any> {
    console.log('Server is starting cleanup');
    return Promise.all([
        mongoose.disconnect(),
        new Promise<void>((resolve, reject) => {
            server.close((err) => {
                if (err) {
                    console.error('Error while closing server:', err);
                    reject(err);
                } else {
                    console.log('Server closed');
                    resolve();
                }
            });
        })
    ]);
}

export async function onHealthCheck() {
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve('Everything is healthy');
    }
    return Promise.reject(new Error('MongoDB connection is not healthy'));
}

export function connectDB(mongoURI: string) {
    mongoose.connect(mongoURI);
    const db = mongoose.connection;

    db.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    db.on('error', (error: any) => {
        console.error('MongoDB connection error:', error);
    });
    db.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });
}

export function startServer(server: Server, port: number): Server {
    createTerminus(server, {
        signal: 'SIGINT',
        healthChecks: { '/healthcheck': onHealthCheck },
        onSignal
    });

    return server.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

connectDB(config.mongodbUri);
startServer(server, config.serverPort);
