export interface IDataObject {
    [key: string]: any | Array<any>;
}

export interface IResponse {
    items?: any[];
    count?: number;
    message: string;
}

export function formatResponse(data: IDataObject, message: string = 'Success'): IResponse {
    if (Array.isArray(data)) {
        return { items: data, message, count: data.length };
    }
    return { ...data, message };
}
