import UserService from './user.service';
import Repository from '../../domain/repositories/repository.interface';
import User from '../../domain/entities/user';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';
import { mockCreateUserDTO, mockGetUsersDTO, MockRepository, MockLogger } from '../../__mocks__/index';

describe('UserService', () => {
    let userService: UserService;
    let mockRepository: Repository<User>;

    beforeEach(() => {
        mockRepository = new MockRepository();
        const mockLogger = new MockLogger();
        userService = new UserService(mockLogger, mockRepository);
    });

    test('createUser method should save a new user', async () => {
        const repositorySaveSpy = jest.spyOn(mockRepository, 'save');

        const user = await userService.createUser(mockCreateUserDTO);

        expect(repositorySaveSpy).toBeCalledTimes(1);
        expect(repositorySaveSpy).toBeCalledWith(expect.any(User));

        expect(user).toBeDefined();
        expect(user.firstName).toBe(mockCreateUserDTO.firstName);
        expect(user.lastName).toBe(mockCreateUserDTO.lastName);
        expect(user.email).toBe(mockCreateUserDTO.email);
        expect(user.created_at).toBeInstanceOf(Date);

        repositorySaveSpy.mockRestore();
    });

    test('getAllUsers method should return all users', async () => {
        const repositoryFindAllSpy = jest.spyOn(mockRepository, 'findAll');
        const repositorySaveSpy = jest.spyOn(mockRepository, 'save');

        // Add some users to the repository
        const user1 = await userService.createUser(mockCreateUserDTO);
        const user2 = await userService.createUser(mockCreateUserDTO);

        // retrieve all users
        const allUsers = await userService.getAllUsers(mockGetUsersDTO);

        // Check if the repository's save method was called with a user entity
        expect(repositorySaveSpy).toBeCalledTimes(2);
        expect(repositorySaveSpy).toBeCalledWith(expect.any(User));

        // Check if the repository's findAll method was called with the correct options
        expect(repositoryFindAllSpy).toBeCalledTimes(1);
        expect(repositoryFindAllSpy).toBeCalledWith({
            sort: { created_at: mockGetUsersDTO.created_at },
        });

        expect(allUsers.length).toBe(2);
        expect(allUsers[0].toJSON()).toHaveProperty('uId');
        expect(allUsers[1].toJSON()).toHaveProperty('uId');

        repositoryFindAllSpy.mockRestore();
        repositorySaveSpy.mockRestore();
    });
});
