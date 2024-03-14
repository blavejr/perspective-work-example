// Services get data from data sources and give data to be written to data sources. They can also contain business logic but rather leave this to use cases.
import User from '../../domain/entities/user';
import Repository from '../../domain/repositories/repository.interface';
import Logger from '../../domain/loggers/logger.interface';
import { CreateUserDTO } from '../use-cases/user/create-user';
import { getUsersDTO } from '../use-cases/user/get-all-users';

export default class UserService {
    constructor(
        private readonly Logger: Logger,
        public readonly userRepository: Repository<User>
        ) { }

    async createUser(dto: CreateUserDTO): Promise<User> {
        // coming from user input no need for uId but must have password
        const userToCreate = new User(
            dto.firstName,
            dto.lastName,
            dto.email,
            new Date(),
            dto.password,
        );
        const createdUser = await this.userRepository.save(userToCreate);
        // coming from data source, no need for password but must have uId
        return new User(
            createdUser.firstName,
            createdUser.lastName,
            createdUser.email,
            createdUser.created_at,
            undefined,
            createdUser.uId
        );
    }

    async getAllUsers(dto: getUsersDTO): Promise<Array<User>> {
        return (await this.userRepository.findAll({ sort: { created_at: dto.created_at } }))
            .map((user) => new User(
                user.firstName,
                user.lastName,
                user.email,
                user.created_at,
                user.uId
            ));
    }
}
