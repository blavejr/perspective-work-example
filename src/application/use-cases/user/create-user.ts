// Use cases do a single thing, by combining multiple services.

import { UseCase } from '../interface.use-case';
import UserService from '../../services/user.service';
import { IUserJSON } from '../../../domain/entities/user';

// DTOs are used to define the shape of the data that is passed between the layers of the application.
export interface CreateUserDTO {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export default class CreateUserUseCase implements UseCase {
    constructor(public readonly userService: UserService) {}

    async execute(dto: CreateUserDTO):Promise<IUserJSON> {
        const createdUser = await this.userService.createUser(dto);
        return createdUser.toJSON();
    }
}
