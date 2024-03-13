import UserRepository from '../../../infrastructure/outbound/database/mongoose/user.repository';
import UserModel from '../../../infrastructure/outbound/database/mongoose/user.model';
import UserService from '../../../application/services/user.service';
import User from '../../../domain/entities/user';
import { getUsersDTO } from '../../../application/use-cases/user/get-all-users';
import GetAllUsersUseCase from './get-all-users';
import bcrypt from 'bcrypt';

import { jest, describe, test, expect, beforeAll, beforeEach } from '@jest/globals';

jest.mock('../../../infrastructure/outbound/database/mongoose/user.repository');
jest.mock('../../../infrastructure/outbound/database/mongoose/user.model');
jest.mock('../../../application/services/user.service');

const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    password: 'Password123',
    created_at: new Date(),
};

const mockUserInstance = new User(
    mockUser.firstName,
    mockUser.lastName,
    mockUser.email,
    mockUser.created_at,
    mockUser.password,
);

const dto: getUsersDTO = {
    created_at: -1,
};

describe('GetAllUsersUseCase', () => {
    let userRepository: UserRepository;
    let userService: UserService;
    let getAllUsersUseCase: GetAllUsersUseCase;

    beforeAll(() => {
        userRepository = new UserRepository(UserModel);
        userService = new UserService(userRepository);
        getAllUsersUseCase = new GetAllUsersUseCase(userService);
        jest.clearAllMocks();
    });

    describe('execute', () => {
        test('Should call the execute function', async () => {
            const executeSpy = jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue([mockUserInstance.toJSON()]);
            const users = await getAllUsersUseCase.execute(dto);

            expect(executeSpy).toHaveBeenCalledWith(dto);
            expect(executeSpy).toHaveBeenCalledTimes(1);

            expect(users).toBeInstanceOf(Array);
            expect(users.length).toBe(1);
            expect(typeof users[0]).toBe(typeof mockUserInstance.toJSON());
            executeSpy.mockRestore();
        });

        test('should call the getAllUsers function on the UserService', async () => {
            const getAllUsersSpy = jest.spyOn(getAllUsersUseCase.userService, 'getAllUsers').mockResolvedValue([mockUserInstance]);
            await getAllUsersUseCase.execute(dto);
            expect(getAllUsersSpy).toHaveBeenCalledTimes(1);
            expect(getAllUsersSpy).toHaveBeenCalledWith(dto);
            getAllUsersSpy.mockRestore();
        });

        test('should check that execute function returns correct data', async () => {
            // The correct data is returned by the service
            const getAllUsersSpy = jest.spyOn(userService, 'getAllUsers').mockResolvedValue([mockUserInstance]);
            
            // The correct data is given to the use case
            const users = await getAllUsersUseCase.execute(dto);

            // Check that the use case does the correct thing with the data
            expect(users).toEqual([mockUserInstance.toJSON()]);

            expect(users[0]).toMatchObject(mockUserInstance.toJSON());
            expect(users[0].firstName).toBe(mockUser.firstName);
            expect(users[0].lastName).toBe(mockUser.lastName);
            expect(users[0].email).toBe(mockUser.email);
            expect(users[0].password).not.toBe(mockUser.password);
            expect(users[0].created_at).toBe(mockUser.created_at);

            getAllUsersSpy.mockRestore();
        });
    });
});
