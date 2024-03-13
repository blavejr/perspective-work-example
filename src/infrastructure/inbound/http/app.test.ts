import app from './app';
import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { describe, it, beforeAll, afterAll, expect, jest } from '@jest/globals';

let mongoServer: MongoMemoryServer;

const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'password12345',
    email: 'john@doe.com',
    uId: '6e23397f-fee5-48b6-bd82-b0d5114ee1bd'
};

beforeAll(async () => {
    // Setup the in-memory database
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    // Disconnect from the in-memory database
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Express App', () => {
    describe('Unkown Routes', () => {
        it('responds with 404 for unknown routes', async () => {
            const response = await supertest(app).get('/unknown-route');
            expect(response.status).toBe(404);
        });
    });

    describe('User Routes', () => {
        it('creates a new user POST /user', async () => {
            const response = await supertest(app).post('/user').send(mockUser);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('uId');
            expect(response.body).toHaveProperty('firstName', mockUser.firstName);
            expect(response.body).toHaveProperty('lastName', mockUser.lastName);
            expect(response.body).toHaveProperty('email', mockUser.email);
            expect(response.body).not.toHaveProperty('password');
        });

        it('gets all the users in the database GET /user', async () => {
            const response = await supertest(app).get('/user');
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(1);
            expect(response.body[0]).toHaveProperty('uId');
            expect(response.body[0]).toHaveProperty('firstName', mockUser.firstName);
            expect(response.body[0]).toHaveProperty('lastName', mockUser.lastName);
            expect(response.body[0]).toHaveProperty('email', mockUser.email);
            expect(response.body[0]).not.toHaveProperty('password');
        });
    });
});
