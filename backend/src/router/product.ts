import express from "express";
import productController from "../controllers/product.js"; 
const router = express.Router();

router.post("/getProductListLayout", productController.getProductListLayout);
router.post("/getProductList", productController.getProductList);
router.post("/getProductDetail", productController.getProductDetail);

export default router;
