export interface IDataObject {
    [key: string]: any | Array<any>;
}

export interface IResponse {
    data: IDataObject | Array<IDataObject>;
    count?: number;
    message: string;
}

export function formatResponse(data: IDataObject, message:string = 'Success'): IResponse {
    if (Array.isArray(data)) {
        return {
            data,
            count: data.length,
            message,
        };
    }
    return { data, message };
}
