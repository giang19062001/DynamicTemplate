export interface IPaging {
   offset?: number;
   limit?: number;
}

export interface IModelList {
   total: number;
   list: any[];
}

export interface IFilters {
   filterName: string;
   filterCode: string;
}

export interface IError {
   message: string;
   code: number;
}

export interface IApiSuccessResponse<T = any> {
   success: true;
   statusCode: number;
   message: string;
   data: T | null;
   error: null;
}

export interface IApiErrorResponse {
   success: false;
   statusCode: number;
   message: string;
   data: null;
   error: IError;
}
