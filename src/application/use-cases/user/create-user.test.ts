import UserRepository from "../../../infrastructure/outbound/database/mongoose/user.repository";
import UserModel from "../../../infrastructure/outbound/database/mongoose/user.model";
import UserService from "../../../application/services/user.service";
import User from "../../../domain/entities/user";
import { CreateUserDTO } from "../../../application/use-cases/user/create-user";
import CreateUserUseCase from "./create-user";

import { jest, describe, test, expect, beforeAll } from '@jest/globals';

jest.mock("../../../infrastructure/outbound/database/mongoose/user.repository");
jest.mock("../../../infrastructure/outbound/database/mongoose/user.model");
jest.mock("../../../application/services/user.service");

const mockDTO: CreateUserDTO = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    password: 'Password123',
}

const mockUserInstance = new User(
    mockDTO.firstName,
    mockDTO.lastName,
    mockDTO.email,
    new Date(),
    mockDTO.password,
);

describe('CreateUserUseCase', () => {
    let userRepository: UserRepository;
    let userService: UserService;
    let createUserUseCase: CreateUserUseCase;

    beforeAll(() => {
        userRepository = new UserRepository(UserModel);
        userService = new UserService(userRepository);
        createUserUseCase = new CreateUserUseCase(userService);
    });

    describe('execute', () => {
        test('Should call the execute function', async () => {
            const executeSpy = jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(mockUserInstance.toJSON());
            const createdUser = await createUserUseCase.execute(mockDTO);

            expect(executeSpy).toHaveBeenCalledTimes(1);
            expect(executeSpy).toHaveBeenCalledWith(mockDTO);

            expect(typeof createdUser).toBe(typeof mockUserInstance.toJSON());
            executeSpy.mockRestore();
        });

        test('should call the createUser method on UserService', async () => {
            const createUserSpy = jest.spyOn(userService, 'createUser').mockResolvedValue(mockUserInstance);
            createUserUseCase.execute(mockDTO);
            expect(createUserSpy).toHaveBeenCalledTimes(1);
            expect(createUserSpy).toHaveBeenCalledWith(mockDTO);
            createUserSpy.mockRestore();
        })

        test('should check that execute method returns the correct data', async () => {
            // The correct data is returned by the service
            const createUserSpy = jest.spyOn(userService, 'createUser').mockResolvedValue(mockUserInstance);

            // The correct data is given to the use case
            const user = await createUserUseCase.execute(mockDTO);

            // Check that the use case does the correct thing with the data
            expect(user).toMatchObject(mockUserInstance.toJSON());

            expect(user.firstName).toBe(mockDTO.firstName);
            expect(user.lastName).toBe(mockDTO.lastName);
            expect(user.email).toBe(mockDTO.email);
            expect(user.password).not.toBe(mockDTO.password);
            expect(user.created_at).toBeInstanceOf(Date);

            createUserSpy.mockRestore();
        });
    });
});

