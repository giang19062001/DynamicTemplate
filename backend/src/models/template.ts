import { ITemplate } from "../interface/template.js";
import templateQueries from "../queries/template.js";
import funcService from "../service/func.js";
import queryService from "../service/query.js";
import { DEFAULT_LAYOUT } from "../utils/const.js";

const templateModel = {
   async getLayoutTemplate(): Promise<ITemplate> {
      const logBase = funcService.generateLogBase("categoryModel", "getCategoryList", {});
      try {
         const result = await queryService.execQueryOne(templateQueries.getLayoutTemplate, [], logBase);
         if (result) {
            // .layouts
            return Object.values(result)[0];
         } else {
            return DEFAULT_LAYOUT;
         }
      } catch (error) {
         return DEFAULT_LAYOUT;
      }
   },
};
export default templateModel;
