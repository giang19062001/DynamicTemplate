import { ICate } from "../interface/category.js";
import { IModelList } from "../interface/common.js";
import categoryQueries from "../queries/category.js";
import funcService from "../service/func.js";
import queryService from "../service/query.js";

const categoryModel = {
   async getCategoryList(): Promise<ICate[]> {
      const logBase = funcService.generateLogBase("categoryModel", "getCategoryList", {});
      try {
         const resultRows = await queryService.execQueryList(categoryQueries.getCategoryList, [], logBase);
         return resultRows;
      } catch (error) {
         return [];
      }
   },
};
export default categoryModel;
