import { ICate } from "./category.js";
import { IFilter } from "./common.js";
import { ITemplate } from "./template.js";

export interface IProduct {
   productCode: string;
   productName: string;
   productImage: string;
   productPrice: string;
}

export interface IProductListLayout {
   layouts: ITemplate;
   data: {
      filters: IFilter[];
      categories: ICate[];
      productTotal: number;
      productList: IProduct[];
   };
}
