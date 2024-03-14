import { connectDB, startServer } from './server';
import mongoose from 'mongoose';
import { Express } from 'express';
import { describe, it, expect, jest, beforeEach, beforeAll, afterAll } from '@jest/globals';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Server, createServer } from "http";
import Terminus from '@godaddy/terminus';

jest.setTimeout(30000);

let mongoServer: MongoMemoryServer;
let mongoUri: string;
let server: Server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
});

afterAll(async () => {
    // Disconnect from the in-memory database
    // await mongoose.disconnect();
    await mongoServer.stop();

    // Close the Server connection
    if (server) {
        server.close();
    }
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
            const httpServer = createServer();

            const createTerminusSpy = jest.spyOn(Terminus, 'createTerminus');
            startServer(httpServer, 3000);

            expect(createTerminusSpy).toHaveBeenCalled();
            expect(createTerminusSpy.mock.calls[0][0]).toBe(httpServer);
            expect(createTerminusSpy.mock.calls[0][1].signal).toBe('SIGINT'); 
            expect(createTerminusSpy.mock.calls[0][1].healthChecks).toHaveProperty('/healthcheck');
            expect(createTerminusSpy.mock.calls[0][1].onSignal).toBeTruthy();
        });
    });
});
