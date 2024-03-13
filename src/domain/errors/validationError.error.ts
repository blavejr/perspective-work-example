import BaseError from './base.error';

export default class ValidationError extends BaseError {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}
