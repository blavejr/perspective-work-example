import GetAllUsersUseCase from './get-all-users';
import { mockGetUsersDTO, MockRepository, MockLogger, MockUserService, mockNewUser, mockUserJson, mockCreateUserDTO } from '../../../__mocks__/index';
import { jest, describe, test, expect } from '@jest/globals';

const logger = new MockLogger();
const userRepository = new MockRepository();
const userService = new MockUserService(logger, userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(logger, userService);

describe('GetAllUsersUseCase', () => {
    describe('execute', () => {
        test('Should call the execute function', async () => {
            const executeSpy = jest.spyOn(getAllUsersUseCase, 'execute').mockResolvedValue([mockNewUser.toJSON()]);
            const users = await getAllUsersUseCase.execute(mockGetUsersDTO);

            expect(executeSpy).toHaveBeenCalledWith(mockGetUsersDTO);
            expect(executeSpy).toHaveBeenCalledTimes(1);

            expect(users).toBeInstanceOf(Array);
            expect(users.length).toBe(1);
            expect(typeof users[0]).toBe(typeof mockNewUser.toJSON());
            executeSpy.mockRestore();
        });

        test('should call the getAllUsers function on the UserService', async () => {
            const getAllUsersSpy = jest.spyOn(getAllUsersUseCase.userService, 'getAllUsers');
            await getAllUsersUseCase.execute(mockGetUsersDTO);
            expect(getAllUsersSpy).toHaveBeenCalledTimes(1);
            expect(getAllUsersSpy).toHaveBeenCalledWith(mockGetUsersDTO);
            getAllUsersSpy.mockRestore();
        });

        test('should check that execute function returns correct data', async () => {
            // The correct data is returned by the service
            const getAllUsersSpy = jest.spyOn(userService, 'getAllUsers');
            // Add a user to the store so we can check if the use case returns it
            await userService.createUser(mockCreateUserDTO);
            // The correct data is given to the use case
            const users = await getAllUsersUseCase.execute(mockGetUsersDTO);

            // Check that the use case does the correct thing with the data
            expect(users).toEqual([mockNewUser.toJSON()]);

            expect(users[0]).toMatchObject(mockNewUser.toJSON());
            expect(users[0].firstName).toBe(mockUserJson.firstName);
            expect(users[0].lastName).toBe(mockUserJson.lastName);
            expect(users[0].email).toBe(mockUserJson.email);
            expect(users[0].password).not.toBe(mockUserJson.password);
            expect(users[0].created_at).toBe(mockUserJson.created_at);

            getAllUsersSpy.mockRestore();
        });
    });
});
