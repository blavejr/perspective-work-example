import mongoose from 'mongoose';
import UserModel from './user.model';
import { 
    beforeAll, 
    afterAll, 
    describe, 
    expect, 
    test
 } from "@jest/globals";
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

// As long as the data fits the schema, it should be saved
const userData = {
    email: 'test@example.com',
    password: 'password',
    firstName: 'John',
    lastName: 'Doe',
    uId: '6e23397f-fee5-48b6-bd82-b0d5114ee1bd'
};

describe('UserModel', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    test('should create and save a new user successfully', async () => {
        const user = new UserModel(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.password).toBe(userData.password);
        expect(savedUser.firstName).toBe(userData.firstName);
        expect(savedUser.lastName).toBe(userData.lastName);
        expect(savedUser.created_at).toBeDefined();
    });

    test('Should return all items in collection', async () => {
        const users = await UserModel.find();
        expect(users).toHaveLength(1);
    });
});
