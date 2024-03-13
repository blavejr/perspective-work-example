export interface findAllOptions {
    sort: { [key: string]: 1 | -1 };
}

export default interface Repository<T> {
    save(entity: T): Promise<T>;
    findAll(options: findAllOptions): Promise<T[]>;
}
