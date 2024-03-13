export default class BaseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
        };
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}
