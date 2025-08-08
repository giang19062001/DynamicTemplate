const categoryQueries = {
   getCategoryList: `
      SELECT category_code, category_name FROM  sc_category.tbl_category_info
    `,

};
export default categoryQueries;
