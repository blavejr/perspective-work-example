import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import User from '../../../../domain/entities/user';
import Repository from '../../../../domain/repositories/user.repository.interface';
import Logger from '../../../../domain/loggers/logger.interface';
import { findAllOptions } from '../../../../domain/repositories/repository.interface';

export default class UserRepository implements Repository<User> {
    constructor(
        private readonly Logger: Logger,
        private readonly model: Model<User>
        ) {}

    async save(entity: User): Promise<User> {
        return await this.model.create(entity).catch((error: MongoServerError) => {
            this.Logger.error(error.message, error);
            throw new MongoServerError(error);
        });
    }

    async findAll(
        options: findAllOptions = {
            sort: { created_at: 1 },
        },
    ): Promise<Array<User>> {
        try {
            return await this.model.find({}, { password: 0 }).sort(options.sort).lean();
        } catch (error) {
            this.Logger.error(error.message, error);
            throw new MongoServerError(error);
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            return await this.model.findOne({ email }, { password: 0 }).lean();
        } catch (error) {
            this.Logger.error(error.message, error);
            throw new MongoServerError(error);
        }
    }
}
