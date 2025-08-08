const productQueries = {
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
};
export default productQueries;
