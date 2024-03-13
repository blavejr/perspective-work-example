import { Model } from 'mongoose';
import User from '../../../../domain/entities/user';
import Repository from '../../../../domain/repositories/user.repository.interface';
import { findAllOptions } from '../../../../domain/repositories/repository.interface';

export default class UserRepository implements Repository<User> {
    constructor(private readonly model: Model<User>) {}

    async save(entity: User): Promise<User> {
        return await this.model.create(entity);
    }

    async findAll(
        options: findAllOptions = {
            sort: { created_at: 1 },
        },
    ): Promise<Array<User>> {
        return await this.model.find({}, { password: 0 }).sort(options.sort).lean();
    }

    async findByEmail(email: string): Promise<User> {
        return await this.model.findOne({ email }, { password: 0 }).lean();
    }
}
