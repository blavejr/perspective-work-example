import User from './user';
import ValidationError from '../errors/validationError.error';
import { describe, expect, test } from '@jest/globals';
import bcrypt from 'bcrypt';
import { mockUserJson } from '../../__mocks__/index';

describe('User', () => {
    describe('creation', () => { 
        test('should create a new user instance from user input', () => {
            const user = new User(
                mockUserJson.firstName,
                mockUserJson.lastName,
                mockUserJson.email,
                mockUserJson.created_at,
                mockUserJson.password,
                undefined,
            );
    
            expect(user.firstName).toBe(mockUserJson.firstName);
            expect(user.lastName).toBe(mockUserJson.lastName);
            expect(user.email).toBe(mockUserJson.email);
            expect(user.created_at).toBe(mockUserJson.created_at);
        });
    
        test('should create a new user instance from data source', () => {
            const user = new User(
                mockUserJson.firstName,
                mockUserJson.lastName,
                mockUserJson.email,
                mockUserJson.created_at,
                undefined,
                mockUserJson.uId
            );
    
            expect(user.firstName).toBe(mockUserJson.firstName);
            expect(user.lastName).toBe(mockUserJson.lastName);
            expect(user.email).toBe(mockUserJson.email);
            expect(user.created_at).toBe(mockUserJson.created_at);
        });
     })

    describe('validation', () => {
        test('should throw ValidationError with invalid data', () => {
            expect(
                () => new User('', mockUserJson.lastName, mockUserJson.email, mockUserJson.created_at),
            ).toThrow(ValidationError);
        });
    });

    describe('password hashing', () => {
        test('should hash the password', () => {
            const user = new User(
                mockUserJson.firstName,
                mockUserJson.lastName,
                mockUserJson.email,
                mockUserJson.created_at,
                mockUserJson.password,
            );

            expect(user.password).not.toBe(mockUserJson.password);
            expect(bcrypt.compareSync(mockUserJson.password, user.password)).toBe(true);
        });
    });

    describe('toJSON', () => {
        test('should return a Json Object representation', () => {
            const user = new User(
                mockUserJson.firstName,
                mockUserJson.lastName,
                mockUserJson.email,
                mockUserJson.created_at,
                mockUserJson.password,
                mockUserJson.uId,
            );

            expect(user.toJSON()).toMatchObject({
                firstName: mockUserJson.firstName,
                lastName: mockUserJson.lastName,
                email: mockUserJson.email,
                created_at: mockUserJson.created_at,
            });
        });
    });
});
