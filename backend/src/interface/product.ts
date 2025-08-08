import { ICate } from "./category.js";
import { IFilters } from "./common.js";
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
      filters: IFilters[];
      categories: ICate[];
      productTotal: number;
      productList: IProduct[];
   };
}
