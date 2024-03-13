import UserService from '../../../application/services/user.service';
import CreateUserUseCase from '../../../application/use-cases/user/create-user';
import GetAllUsersUseCase from '../../../application/use-cases/user/get-all-users';
import UserRepository from '../../outbound/database/mongoose/user.repository';
import UserModel from '../../outbound/database/mongoose/user.model';
import UserController from './controllers/user.controller';

export class Container {
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

export default new Container();
