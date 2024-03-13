import CreateUserUseCase, { CreateUserDTO } from "../../../../application/use-cases/user/create-user";
import {getUsersDTO} from "../../../../application/use-cases/user/get-all-users";
import { Request, Response } from "express";
import GetAllUsersUseCase from "../../../../application/use-cases/user/get-all-users";
import userValidatonSchema from "../validation/users.schema";

export default class UserController {
    constructor(
        public readonly createUserUseCase: CreateUserUseCase,
        public readonly getAllUsersUseCase: GetAllUsersUseCase
        ) { }

    async create(req: Request, res: Response) {
        const userData: CreateUserDTO = req.body;
        await userValidatonSchema.create.validate(userData, { abortEarly: false });
        const user = await this.createUserUseCase.execute(userData);
        res.status(201).json(user);
    }

    async getAllUsers(req: Request, res: Response) {
        const {created} = req.query;
        const queryData: getUsersDTO = { created_at: created === '-1' ? -1 : 1};
        await userValidatonSchema.getAll.validate(queryData, { abortEarly: false });
        const users = await this.getAllUsersUseCase.execute(queryData);
        res.status(200).json(users);
    }
}