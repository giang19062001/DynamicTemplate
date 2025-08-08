import { Request, Response, NextFunction } from "express";
import { IApiErrorResponse, IApiSuccessResponse, IError } from "../interface/common.js";

const apiResponse = {
   success: <T>(res: Response, data: T | null, message = "Success", statusCode = 200): Response<IApiSuccessResponse<T>> => {
      return res.status(statusCode).json({
         success: true,
         statusCode,
         message,
         data,
         error: null,
      });
   },

   error: (res: Response, error: IError | null, message = "Error", statusCode = 500): Response<IApiErrorResponse> => {
      return res.status(statusCode).json({
         success: false,
         statusCode,
         message,
         data: null,
         error: {
            message: error?.message || message,
            code: error?.code || statusCode,
         },
      });
   },
};

export default apiResponse;

// 200	OK
// 201	Created (POST)
// 204	No Content (DELETE)
// 400	Bad Request
// 401	Unauthorized	(MISSING TOKEN)
// 403	Forbidden
// 404	Not Found
// 409	Conflict
// 500	Internal
