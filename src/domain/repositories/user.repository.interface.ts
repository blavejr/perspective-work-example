import Repository from './repository.interface';

export default interface UserRepository<T> extends Repository<T> {
    findByEmail(email: string): Promise<T>;
}
