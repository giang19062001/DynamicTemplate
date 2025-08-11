import { ICount, IModelList } from "../interface/common.js";
import productQueries from "../queries/product.js";
import funcService from "../service/func.js";
import queryService from "../service/query.js";

const productModel = {
   async getProductList(offset: number, limit: number): Promise<IModelList> {
      const logBase = funcService.generateLogBase("productModel", "getProductList", { limit, offset });
      try {
         const resultCnt: ICount[] = await queryService.execQueryList(productQueries.getProductTotalList, [], logBase);

         console.log("offset", offset, offset === 0 ? offset : offset * limit);
         console.log("limit", limit);

         const resultRows = await queryService.execQueryList(productQueries.getProductList, [offset === 0 ? offset : offset * limit, limit], logBase);
         return { total: Number(resultCnt[0]?.cnt ?? 0), list: resultRows };
      } catch (error) {
         return { total: 0, list: [] };
      }
   },
   async getProductDetail(productCode: string): Promise<object | null> {
      const logBase = funcService.generateLogBase("productModel", "getProductDetail", { productCode });
      try {
         const result = await queryService.execQuery(productQueries.getProductDetail, [productCode], logBase);
         return result;
      } catch (error) {
         return null;
      }
   },
};
export default productModel;
