import mockContainer from './__mocks__/container.mock';
import UserController from './controllers/user.controller';
import UserRepository from '../../outbound/database/mongoose/user.repository';
import UserService from '../../../application/services/user.service';
import CreateUserUseCase from '../../../application/use-cases/user/create-user';
import GetAllUsersUseCase from '../../../application/use-cases/user/get-all-users';
import {  describe, test, expect } from '@jest/globals';

describe('Container', () => {

    describe('Checks that correct instances are created', () => { 
        test('should instantiate UserController', () => {
            expect(mockContainer.userController).toBeInstanceOf(UserController);
        });

        test('should instantiate UserRepository', () => {
            expect(mockContainer.userRepository).toBeInstanceOf(UserRepository);
        });

        test('should instantiate UserService', () => {
            expect(mockContainer.userService).toBeInstanceOf(UserService);
        });

        test('should instantiate CreateUserUseCase', () => {
            expect(mockContainer.createUserUseCase).toBeInstanceOf(CreateUserUseCase);
        });

        test('should instantiate GetAllUsersUseCase', () => {
            expect(mockContainer.getAllUsersUseCase).toBeInstanceOf(GetAllUsersUseCase);
        });
     })

     describe('Checks that constructors are called correct number of times', () => { 
        test('should call UserRepository constructor once', () => {
            expect(UserRepository).toHaveBeenCalledTimes(1);
        });
    
        test('should call UserService constructor once', () => {
            expect(UserService).toHaveBeenCalledTimes(1);
        });
    
        test('should call CreateUserUseCase constructor once', () => {
            expect(CreateUserUseCase).toHaveBeenCalledTimes(1);
        });
    
        test('should call GetAllUsersUseCase constructor once', () => {
            expect(GetAllUsersUseCase).toHaveBeenCalledTimes(1);
        });
    
        test('should call UserController constructor once', () => {
            expect(UserController).toHaveBeenCalledTimes(1);
        });
      })
});
