import UserService from '../../../application/services/user.service';
import CreateUserUseCase from '../../../application/use-cases/user/create-user';
import GetAllUsersUseCase from '../../../application/use-cases/user/get-all-users';
import UserRepository from '../../outbound/database/mongoose/user.repository';
import UserModel from '../../outbound/database/mongoose/user.model';
import UserController from './controllers/user.controller';
import Logger from '../../outbound/loggers/winston/logger';

export class Container {
    public readonly userRepository: UserRepository;
    public readonly userService: UserService;
    public readonly createUserUseCase: CreateUserUseCase;
    public readonly getAllUsersUseCase: GetAllUsersUseCase;
    public readonly userController: UserController;
    public readonly logger: Logger;

    constructor() {
        this.logger = new Logger();
        this.userRepository = new UserRepository(this.logger, UserModel);
        this.userService = new UserService(this.logger, this.userRepository);
        this.createUserUseCase = new CreateUserUseCase(this.logger, this.userService);
        this.getAllUsersUseCase = new GetAllUsersUseCase(this.logger, this.userService);
        this.userController = new UserController(this.logger, this.createUserUseCase, this.getAllUsersUseCase);
    }
}

export default new Container();
