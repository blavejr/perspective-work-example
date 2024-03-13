import UserRepository from '../../../outbound/database/mongoose/user.repository';
import UserModel from '../../../outbound/database/mongoose/user.model';
import UserService from '../../../../application/services/user.service';
import CreateUserUseCase from '../../../../application/use-cases/user/create-user';
import GetAllUsersUseCase from '../../../../application/use-cases/user/get-all-users';
import UserController from '../controllers/user.controller';
import { jest } from '@jest/globals';

jest.mock('../../../outbound/database/mongoose/user.repository');
jest.mock('../../../outbound/database/mongoose/user.model');
jest.mock('../../../../application/services/user.service');
jest.mock('../../../../application/use-cases/user/create-user');
jest.mock('../../../../application/use-cases/user/get-all-users');
jest.mock('../controllers/user.controller');

class MockContainer {
    public readonly userRepository: UserRepository;
    public readonly userService: UserService;
    public readonly createUserUseCase: CreateUserUseCase;
    public readonly getAllUsersUseCase: GetAllUsersUseCase;
    public readonly userController: UserController;

    constructor() {
        this.userRepository = new UserRepository(UserModel);
        this.userService = new UserService(this.userRepository);
        this.createUserUseCase = new CreateUserUseCase(this.userService);
        this.getAllUsersUseCase = new GetAllUsersUseCase(this.userService);
        this.userController = new UserController(this.createUserUseCase, this.getAllUsersUseCase);
    }
}

export default new MockContainer();
