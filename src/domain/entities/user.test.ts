import User from './user';
import ValidationError from '../errors/validationError.error';
import { describe, expect, test } from '@jest/globals';
import bcrypt from 'bcrypt';

const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com',
    password: 'Password123',
    created_at: new Date(),
    uId: '6e23397f-fee5-48b6-bd82-b0d5114ee1bd',
};

describe('User', () => {
    describe('creation', () => { 
        test('should create a new user instance from user input', () => {
            const user = new User(
                mockUser.firstName,
                mockUser.lastName,
                mockUser.email,
                mockUser.created_at,
                mockUser.password,
                undefined,
            );
    
            expect(user.firstName).toBe(mockUser.firstName);
            expect(user.lastName).toBe(mockUser.lastName);
            expect(user.email).toBe(mockUser.email);
            expect(user.created_at).toBe(mockUser.created_at);
        });
    
        test('should create a new user instance from data source', () => {
            const user = new User(
                mockUser.firstName,
                mockUser.lastName,
                mockUser.email,
                mockUser.created_at,
                undefined,
                mockUser.uId
            );
    
            expect(user.firstName).toBe(mockUser.firstName);
            expect(user.lastName).toBe(mockUser.lastName);
            expect(user.email).toBe(mockUser.email);
            expect(user.created_at).toBe(mockUser.created_at);
        });
     })

    describe('validation', () => {
        test('should throw ValidationError with invalid data', () => {
            expect(
                () => new User('', mockUser.lastName, mockUser.email, mockUser.created_at),
            ).toThrow(ValidationError);
        });
    });

    describe('password hashing', () => {
        test('should hash the password', () => {
            const user = new User(
                mockUser.firstName,
                mockUser.lastName,
                mockUser.email,
                mockUser.created_at,
                mockUser.password,
            );

            expect(user.password).not.toBe(mockUser.password);
            expect(bcrypt.compareSync(mockUser.password, user.password)).toBe(true);
        });
    });

    describe('toJSON', () => {
        test('should return a Json Object representation', () => {
            const user = new User(
                mockUser.firstName,
                mockUser.lastName,
                mockUser.email,
                mockUser.created_at,
                mockUser.password,
                mockUser.uId,
            );

            expect(user.toJSON()).toMatchObject({
                firstName: mockUser.firstName,
                lastName: mockUser.lastName,
                email: mockUser.email,
                created_at: mockUser.created_at,
            });
        });
    });
});
