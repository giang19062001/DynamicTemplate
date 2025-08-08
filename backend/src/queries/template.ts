const templateQueries = {
   getLayoutTemplate: `
      SELECT template_json->'layouts' AS layouts  FROM  sc_template.tbl_template_info LIMIT 1
    `,

};
export default templateQueries;
