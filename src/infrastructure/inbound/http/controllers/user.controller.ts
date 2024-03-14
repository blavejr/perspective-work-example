import CreateUserUseCase, {
    CreateUserDTO,
} from '../../../../application/use-cases/user/create-user';
import { getUsersDTO } from '../../../../application/use-cases/user/get-all-users';
import { Request, Response } from 'express';
import GetAllUsersUseCase from '../../../../application/use-cases/user/get-all-users';
import userValidatonSchema from '../validation/users.schema';
import { formatResponse, IResponse, IDataObject } from '../utils/response';
import Logger from '../../../../domain/loggers/logger.interface';

export default class UserController {
    constructor(
        private readonly Logger: Logger,
        public readonly createUserUseCase: CreateUserUseCase,
        public readonly getAllUsersUseCase: GetAllUsersUseCase,
    ) {}

    async create(req: Request, res: Response) {
        const userData: CreateUserDTO = req.body;
        await userValidatonSchema.create.validate(userData, { abortEarly: false });
        const user: IDataObject = await this.createUserUseCase.execute(userData);
        const response: IResponse = formatResponse(user);
        res.status(201).json(response);
    }

    async getAllUsers(req: Request, res: Response) {
        const { created } = req.query;
        const queryData: getUsersDTO = { created_at: created === '-1' ? -1 : 1 };
        await userValidatonSchema.getAll.validate(queryData, { abortEarly: false });
        const users: IDataObject = await this.getAllUsersUseCase.execute(queryData);
        const response: IResponse = formatResponse(users);
        res.status(200).json(response);
    }
}
