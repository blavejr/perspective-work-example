import { jest, describe, test, expect } from '@jest/globals';
import { mockCreateUserDTO, MockRepository, MockLogger, MockUserService, mockNewUser } from '../../../__mocks__/index';
import CreateUserUseCase from './create-user';

const logger = new MockLogger();
const userRepository = new MockRepository();
const userService = new MockUserService(logger, userRepository);
const createUserUseCase = new CreateUserUseCase(logger, userService);

describe('CreateUserUseCase', () => {
    describe('execute', () => {
        test('Should call the execute function', async () => {
            const executeSpy = jest.spyOn(createUserUseCase, 'execute');
            const createdUser = await createUserUseCase.execute(mockCreateUserDTO);

            expect(executeSpy).toHaveBeenCalledTimes(1);
            expect(executeSpy).toHaveBeenCalledWith(mockCreateUserDTO);

            expect(typeof createdUser).toBe(typeof mockNewUser.toJSON());
            executeSpy.mockRestore();
        });

        test('should call the createUser method on UserService', async () => {
            const createUserSpy = jest.spyOn(userService, 'createUser');
            createUserUseCase.execute(mockCreateUserDTO);
            expect(createUserSpy).toHaveBeenCalledTimes(1);
            expect(createUserSpy).toHaveBeenCalledWith(mockCreateUserDTO);
            createUserSpy.mockRestore();
        })

        test('should check that execute method returns the correct data', async () => {
            // The correct data is returned by the service
            const createUserSpy = jest.spyOn(userService, 'createUser');

            // The correct data is given to the use case
            const user = await createUserUseCase.execute(mockCreateUserDTO);

            // Check that the use case does the correct thing with the data
            expect(user).toMatchObject(mockNewUser.toJSON());

            expect(user.firstName).toBe(mockCreateUserDTO.firstName);
            expect(user.lastName).toBe(mockCreateUserDTO.lastName);
            expect(user.email).toBe(mockCreateUserDTO.email);
            expect(user.password).not.toBe(mockCreateUserDTO.password);
            expect(user.created_at).toBeInstanceOf(Date);

            createUserSpy.mockRestore();
        });
    });
});

