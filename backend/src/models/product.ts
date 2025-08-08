import { IModelList } from "../interface/common.js";
import productQueries from "../queries/product.js";
import funcService from "../service/func.js";
import queryService from "../service/query.js";

const productModel = {
   async getProductList(limit: number, offset: number): Promise<IModelList>  {
      const logBase = funcService.generateLogBase("productModel", "getProductList", { limit, offset });
      try {
         const resultRows = await queryService.execQueryList(productQueries.getProductList, [limit == 0 ? 0 : limit * offset, offset], logBase);
         return { total: resultRows.length, list: resultRows };
      } catch (error) {
         return { total: 0, list: [] };
      }
   },
   async getProductDetail(productCode: string) : Promise<object | null>  {
      const logBase = funcService.generateLogBase("productModel", "getProductDetail", { productCode });
      try {
         const result= await queryService.execQuery(productQueries.getProductDetail, [productCode], logBase);
         return result;
      } catch (error) {
         return null;
      }
   },
};
export default productModel;
