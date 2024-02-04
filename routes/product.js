import express from "express";


import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import { addCategory, addProductImage, createProduct, deleteCategory, deleteProduct, deleteProductImage, getAdminProducts, getAllCategories, getAllProducts, getProductDetails, updateProduct } from "../controllers/product.js";


const router=express.Router();

router.get("/all",getAllProducts);
router.get("/admin",isAuthenticated,isAdmin,getAdminProducts);

// i remove .all  =>   router.get("/single/:id").all.get(getProductDetails)


router.route("/single/:id").get(getProductDetails).put(isAuthenticated,isAdmin,updateProduct).delete(isAuthenticated,isAdmin,deleteProduct);

router.post("/new",isAuthenticated,isAdmin,singleUpload,createProduct);

router.route("/images/:id").post(isAuthenticated,isAdmin,singleUpload,addProductImage).delete(isAuthenticated,isAdmin,deleteProductImage);

router.post("/category",isAuthenticated,isAdmin,addCategory)




router.get("/categories",getAllCategories);

router.delete("/category/:id",isAuthenticated,isAdmin,deleteCategory)


export default router;