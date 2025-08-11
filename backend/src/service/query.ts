import pool from "../config/database.js";
import logger from "../config/logger.js";
import { IError } from "../interface/common.js";
import funcService from "./func.js";
const queryService = {
   execQueryList: async (query: string, params: any[], logBase: string): Promise<any[]> => {
      try {
         const { rows } = await pool.query(query, params);
         logger.writeLog("info", `${logBase}: query(${query}) => params(${JSON.stringify(params)})`);
         return funcService.toCamelCase(rows);
      } catch (error: unknown) {
         logger.writeLog("error", `${logBase}: query(${query}) => params(${JSON.stringify(params)}) =>  error(${(error as IError).message})`);
         return [];
      }
   },

   execQueryCnt: async (query: string, params: any[], logBase: string): Promise<number> => {
      try {
         const { rows } = await pool.query(query, params);
         logger.writeLog("info", `${logBase}: query(${query}) => params(${JSON.stringify(params)}) => result(${rows[0]?.cnt})`);
         return parseInt(rows[0]?.cnt) ?? 0;
      } catch (error: unknown) {
         logger.writeLog("error", `${logBase}: query(${query}) => params(${JSON.stringify(params)}) =>  error(${(error as IError).message})`);
         return 0;
      }
   },

   execQueryOne: async (query: string, params: any[], logBase: string): Promise<object | null> => {
      try {
         const { rows } = await pool.query(query, params);
         logger.writeLog("info", `${logBase}: query(${query}) => params(${JSON.stringify(params)})`);
         return funcService.toCamelCase(rows[0]);
      } catch (error: unknown) {
         logger.writeLog("error", `${logBase}: query(${query}) => params(${JSON.stringify(params)}) =>  error(${(error as IError).message})`);
         return null;
      }
   },
   
   execQuery: async (query: string, params: any[], logBase: string): Promise<boolean> => {
      try {
         await pool.query(query, params);
         logger.writeLog("info", `${logBase}: query(${query}) => params(${JSON.stringify(params)})`);
         return true
      } catch (error: unknown) {
         logger.writeLog("error", `${logBase}: query(${query}) => params(${JSON.stringify(params)}) =>  error(${(error as IError).message})`);
         return false;
      }
   },
};

export default queryService;
