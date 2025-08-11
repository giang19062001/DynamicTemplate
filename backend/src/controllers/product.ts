import { IError, IPaging } from "../interface/common.js";
import { Request, Response, NextFunction } from "express";
import apiResponse from "../utils/response.js";
import { msgError, msgSuccess } from "../utils/message.js";
import productModel from "../models/product.js";
import { FILTERS, LIMIT, OFFSET } from "../utils/const.js";
import categoryModel from "../models/category.js";
import templateModel from "../models/template.js";
import { IProduct, IProductListLayout } from "../interface/product.js";
import funcService from "../service/func.js";

const productController = {
   async getProductListLayout(req: Request, res: Response, next: NextFunction) {
      try {
         const templateResult = await templateModel.getLayoutTemplate();
         const productResult = await productModel.getProductList(OFFSET, LIMIT);
         const categoryResult = await categoryModel.getCategoryList();
         console.log("templateResult => ", JSON.stringify(templateResult, null, 2));
         const result: IProductListLayout = {
            layouts: templateResult,
            data: {
               filters: FILTERS,
               categories: categoryResult,
               productTotal: productResult.total,
               productList: productResult.list,
            },
         };

         return apiResponse.success(res, result, msgSuccess.fetchSuccess, 200);
      } catch (error: unknown) {
         return apiResponse.error(res, error as IError, msgError.fetchErr, 200);
      }
   },

   async getProductList(req: Request, res: Response, next: NextFunction) {
      try {
         const { offset = OFFSET, limit = LIMIT } = req.body as IPaging;
         const productData = await productModel.getProductList(offset, limit);
         const result = {
            productTotal: productData.total,
            productList: productData.list,
         };
         return apiResponse.success(res, result, msgSuccess.fetchSuccess, 200);
      } catch (error: unknown) {
         return apiResponse.error(res, error as IError, msgError.fetchErr, 200);
      }
   },

   async getProductDetail(req: Request, res: Response, next: NextFunction) {
      try {
         const { productCode } = req.body;
         const productData = await productModel.getProductDetail(productCode);
         if (productData) {
            return apiResponse.success(res, productData, msgSuccess.fetchSuccess, 200);
         } else {
            return apiResponse.error(res, null, msgError.fetchErr, 200);
         }
      } catch (error) {
         return apiResponse.error(res, null, msgError.fetchErr, 200);
      }
   },
   async syncProductFromPos(req: Request, res: Response, next: NextFunction) {
      try {
         const productsSync: IProduct[] = req.body;
         // console.log("productsSync", productsSync);
         let resultSync: Record<string, boolean> = {};
         if (productsSync.length) {
            for (const product of productsSync) {
               const pro = funcService.toCamelCase(product); // product_code => productCode
               const result = await productModel.updateProduct(pro);
               if (result) {
                  resultSync[`${product.productCode}`] = true;
               } else {
                  resultSync[`${product.productCode}`] = false;
               }
            }
         }
         return apiResponse.success(res, resultSync, msgSuccess.fetchSuccess, 200);
      } catch (error) {
         return apiResponse.error(res, null, msgError.fetchErr, 200);
      }
   },
};

export default productController;
