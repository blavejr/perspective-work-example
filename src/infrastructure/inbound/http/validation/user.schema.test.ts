import validationSchemas from './users.schema';
import { describe, expect, it } from '@jest/globals';

// TODO: mock move this to global __mocks__ folder
const validData = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    email: 'john.doe@example.com',
};

const invalidData = {
    firstName: 'John',
    lastName: 'Doe',
};

describe('User Validation Schemas', () => {
    describe('create user schema', () => {
        it('should validate object with firstName, lastName, password, and email fields', async () => {
            const isValid = await validationSchemas.create.isValid(validData);
            expect(isValid).toBe(true);
        });

        it('should invalidate object with missing required fields', async () => {
            try {
                await validationSchemas.create.validate(invalidData, { abortEarly: false });
                throw new Error('Validation succeeded unexpectedly');
            } catch (error) {
                expect(error.errors).toHaveLength(2);
            }
        });
    });

    describe('get all schema', () => {
        it('should validate number with value 1 or -1', async () => {
            const validNumber1 = await validationSchemas.getAll.isValid({created: 1});
            const validNumberNeg1 = await validationSchemas.getAll.isValid({created: -1});
            expect(validNumber1).toBe(true);
            expect(validNumberNeg1).toBe(true);
        });

        it('should invalidate numbers other than 1 or -1', async () => {
            const invalidNumber0 = await validationSchemas.getAll.isValid(0);
            const invalidNumber2 = await validationSchemas.getAll.isValid(2);

            expect(invalidNumber0).toBe(false);
            expect(invalidNumber2).toBe(false);
        });

        it('should invalidate non-number values', async () => {
            const invalidString = await validationSchemas.getAll.isValid('invalid');
            const invalidObject = await validationSchemas.getAll.isValid({ created: 'invalid' });

            expect(invalidString).toBe(false);
            expect(invalidObject).toBe(false);
        });
    });
});
