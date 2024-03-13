import validator from 'validator';
import ValidationError from '../errors/validationError.error';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// The format of User shared with other layers
export interface IUserJSON {
    firstName: string;
    lastName: string;
    email: string;
    created_at: Date;
    uId: string;
    [key: string]: string | Date;
}

export default class User {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly created_at: Date,
        // undefined when creating a new user from data source
        public readonly password: string | undefined = undefined,
        // undefined when creating a new user from user input
        public readonly uId: string | undefined = undefined,
    ) {
        this.validate();
        // If the entity is being created from a user input, it must have a password
        if (uId === undefined) {
            if (!this.isValidPassword(password)) {
                throw new ValidationError('Invalid Password');
            }
            // hash the password and generate a uId
            this.password = this.hashPassword(password);
            this.uId = uuidv4();
        }
        // If the entity is being created from a data source, no need to have a password
        // But it must have a uId
        if (password === undefined) {
            if (!this.isValidID(uId)) {
                throw new ValidationError('Invalid uId');
            }
            this.password = undefined;
            this.uId = uId;
        }
    }

    // The entity is responsible for validating its own data
    validate(): void {
        const validationErrors: Array<string> = [];

        if (!this.isValidName(this.firstName)) {
            validationErrors.push('Invalid first name');
        }
        if (!this.isValidName(this.lastName)) {
            validationErrors.push('Invalid last name');
        }
        if (!this.isValidEmail(this.email)) {
            validationErrors.push('Invalid email address');
        }

        if (validationErrors.length > 0) {
            const errorMessage = validationErrors.join(', ');
            throw new ValidationError(errorMessage);
        }
    }

    private isValidName(name: string): boolean {
        if (this.isEmptyString(name)) return false;
        return validator.isLength(name, { min: 1, max: 255 });
    }

    private isValidPassword(password: string): boolean {
        if (this.isEmptyString(password)) return false;
        return validator.isLength(password, { min: 6, max: 255 });
    }

    private isValidID(id: string): boolean {
        if (this.isEmptyString(id)) return false;
        return validator.isUUID(id);
    }

    private isValidEmail(email: string): boolean {
        if (this.isEmptyString(email)) return false;
        return validator.isEmail(email);
    }

    private isEmpty(value: any): boolean {
        return value === null || value === undefined;
    }

    private isEmptyString(value: string): boolean {
        if (this.isEmpty(value)) return true;
        if (validator.isEmpty(value)) return true;
        return false;
    }

    // The entity is responsible for converting itself to a JSON object and sharing only the data it wants to share
    toJSON(): IUserJSON {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            created_at: this.created_at,
            uId: this.uId,
        };
    }

    // The entity is responsible for hashing and checking its own password
    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    comparePassword(plainTextPassword: string): boolean {
        return bcrypt.compareSync(plainTextPassword, this.password);
    }
}
