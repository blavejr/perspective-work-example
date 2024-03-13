import 'dotenv/config';
import app from './app';
import mongoose from 'mongoose';
import { Express } from 'express';
import config from './utils/config';

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

export function startServer(app: Express, port: number) {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}

connectDB(config.mongodbUri);
startServer(app, config.serverPort);
