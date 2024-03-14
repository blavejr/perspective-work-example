import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../../domain/entities/user';
import UserRepository from './user.repository';
import Logger from '../../loggers/winston/logger';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

import {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
    jest,
} from '@jest/globals';

jest.mock('../../loggers/winston/logger');

let mongoServer: MongoMemoryServer;
let userRepository: UserRepository;

const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'password12345',
    email: 'john@doe.com',
    uId: undefined as undefined,
};

const mockUserInstance = new User(
    mockUser.firstName,
    mockUser.lastName,
    mockUser.email,
    new Date(),
    mockUser.password,
    mockUser.uId,
);

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    const logger = new Logger();
    userRepository = new UserRepository(logger, UserModel);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('UserRepository', () => {
    test('save method should save an instance of the User entity', async () => {
        const savedUser = await userRepository.save(mockUserInstance);
        expect(savedUser.firstName).toEqual(mockUser.firstName);
        expect(savedUser.lastName).toEqual(mockUser.lastName);
        expect(savedUser.email).toEqual(mockUser.email);
        expect(savedUser.password).not.toEqual(mockUser.password);
        expect(bcrypt.compareSync(mockUser.password, savedUser.password)).toBe(true);
    });

    test('findAll method should return an array of User entities', async () => {
        const users = await userRepository.findAll();
        expect(users).toHaveLength(1);
        expect(users[0].firstName).toEqual(mockUser.firstName);
        expect(users[0].lastName).toEqual(mockUser.lastName);
        expect(users[0].email).toEqual(mockUser.email);
    });

});
