const productQueries = {
   getProductTotalList: `
       SELECT COUNT(product_code) AS CNT
       FROM sc_product.tbl_product_info
    `,
   getProductList: `
       SELECT product_code, product_name, product_image, product_price 
       FROM sc_product.tbl_product_info
       OFFSET $1 LIMIT $2;
    `,
   getProductDetail: `
       SELECT product_code, product_name, product_image, product_price 
       FROM sc_product.tbl_product_info
       WHERE product_code = $1;
    `,
   updateProduct: `
      UPDATE sc_product.tbl_product_info
      SET product_name = $1, product_price = $2, updated_at = $3
      WHERE product_code = $4;
    `,
};
export default productQueries;
