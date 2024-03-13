import { connectDB, startServer } from './server';
import mongoose from 'mongoose';
import { Express } from 'express';
import { describe, it, expect, jest, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;
let mongoUri: string;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
});

afterAll(async () => {
    // Disconnect from the in-memory database
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Server', () => {
    beforeEach(() => {
        // We dont want to see the console logs during the tests
        console.log = jest.fn();
        console.error = jest.fn();
    });

    describe('connectDB', () => {
        it('should connect to MongoDB', async () => {
            const mockConnect = jest.spyOn(mongoose, 'connect').mockImplementation(undefined);
            connectDB(mongoUri);
            expect(mockConnect).toHaveBeenCalledWith(mongoUri);
        });
    });

    describe('startServer', () => {
        it('should start the server', async () => {
            const mockListen = jest.fn();
            const mockApp = { listen: mockListen } as unknown as Express;

            startServer(mockApp, 3000);
            expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function));
        });
    });
});
