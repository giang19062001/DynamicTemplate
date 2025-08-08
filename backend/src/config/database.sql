
-- product
create schema sc_product


CREATE SEQUENCE sc_product.seq_product_code START WITH 1;


CREATE TABLE sc_product.tbl_product_info (
    seq SERIAL PRIMARY KEY,
    product_code VARCHAR DEFAULT ('PRD' || LPAD(NEXTVAL('sc_product.seq_product_id')::VARCHAR, 4, '0')) UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT NOT NULL,
    product_price numeric NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- cate
create schema sc_category

CREATE SEQUENCE sc_category.seq_category_code START WITH 1;

CREATE TABLE sc_category.tbl_category_info (
    seq SERIAL PRIMARY KEY,
    category_code VARCHAR DEFAULT ('CAT' || LPAD(NEXTVAL('sc_category.seq_category_code')::VARCHAR, 4, '0')) UNIQUE,
    category_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

select * from sc_product.tbl_product_info



-- template
create schema sc_template


CREATE SEQUENCE sc_product.seq_product_code START WITH 1;



CREATE TABLE sc_template.tbl_template_info (
    seq SERIAL PRIMARY KEY,
    template_code VARCHAR DEFAULT ('TEM' || LPAD(NEXTVAL('sc_template.seq_template_code')::VARCHAR, 4, '0')) UNIQUE,
    template_name VARCHAR(255),
    template_json JSONB NOT NULL,
    template_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
select * from  sc_template.tbl_template_info 
