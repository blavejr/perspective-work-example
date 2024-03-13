import User, { IUserJSON } from '../../../domain/entities/user';
import UserService from '../../services/user.service';
import { UseCase } from '../interface.use-case';

export interface getUsersDTO {
    created_at?: 1 | -1;
}

export default class GetAllUsersUseCase implements UseCase {
    constructor(public readonly userService: UserService) {}
    async execute(dto: getUsersDTO): Promise<Array<IUserJSON>> {
        const users: Array<User> = await this.userService.getAllUsers(dto);
        return users.map((user: User) => user.toJSON());
    }
}
