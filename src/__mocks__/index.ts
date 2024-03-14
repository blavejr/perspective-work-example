import User from "../domain/entities/user";
import Logger from "../domain/loggers/logger.interface";
import Repository from "../domain/repositories/repository.interface";
import { CreateUserDTO } from "../application/use-cases/user/create-user";
import { getUsersDTO } from "../application/use-cases/user/get-all-users";

export class MockRepository implements Repository<User> {
    private users: User[] = [];

    async save(entity: User): Promise<User> {
        this.users.push(entity);
        return entity;
    }

    async findAll(options: any): Promise<User[]> {
        return this.users;
    }
}

export class MockUserService {
    constructor(
        public readonly logger: Logger,
        public readonly userRepository: Repository<User>
        ) { }
    async createUser(dto: CreateUserDTO): Promise<User> {
        return this.userRepository.save(mockNewUser);
    }

    async getAllUsers(dto: getUsersDTO): Promise<Array<User>> {
        return this.userRepository.findAll({ sort: { created_at: dto.created_at } });
    }
}

export class mockCreateUserUseCase {
    constructor(
        private readonly logger: Logger,
        public readonly userService: MockUserService
        ) {}
    async execute(dto: CreateUserDTO): Promise<User> {
        return this.userService.createUser(dto);
    }
}

export class mockGetUsersUseCase {
    constructor(
        private readonly logger: Logger,
        public readonly userService: MockUserService
        ) {}
    async execute(dto: getUsersDTO): Promise<Array<User>> {
        return this.userService.getAllUsers(dto);
    }
}


export class MockLogger implements Logger {
    error(message: string) {
        console.error(message);
    }

    info(message: string) {
        console.log(message);
    }

    warn(message: string) {
        console.warn(message);
    }

    debug(message: string) {
        console.debug(message);
    }

    log(message: string) {
        console.log(message);
    }

    verbose(message: string): void {
        console.log(message);
    }
}


export const mockUserJson = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@test.com',
    password: 'Password123',
    created_at: new Date(),
    uId: '6e23397f-fee5-48b6-bd82-b0d5114ee1bd',
};

export const mockCreateUserDTO: CreateUserDTO = {
    firstName: mockUserJson.firstName,
    lastName: mockUserJson.lastName,
    email: mockUserJson.email,
    password: mockUserJson.password,
};

export const mockNewUser = new User(
    mockUserJson.firstName,
    mockUserJson.lastName,
    mockUserJson.email,
    mockUserJson.created_at,
    mockUserJson.password,
);

export const mockGetUsersDTO: getUsersDTO = {
    created_at: -1,
};