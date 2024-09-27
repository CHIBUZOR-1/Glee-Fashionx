const express = require('express');
const productRouter = express.Router();
const dotenv = require("dotenv").config();
const multer = require('multer');
const { verifyToken, isAdmin } = require('../Utilities/Auth');
const { addProduct, productList, removeProduct, getProductCategories, cardsByCartegory, getProductDetails, updateProduct, cateProducts, filterProducts, c_and_p_filter, searchProducts, newArrivals, reviews, getReviews, relatedProducts } = require('../Controllers/ProductController');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
    filename:(req,file,cb)=> {
        return cb(null, `${file.originalname}`);
    }
});

const upload = multer({storage:storage});

productRouter.post('/add_product', verifyToken, isAdmin, upload.array("images", 4),  addProduct);
productRouter.get('/all_products', productList);
productRouter.delete('/delete_product/:id', verifyToken, isAdmin, removeProduct);
productRouter.put('/update_product/:id', verifyToken, isAdmin, updateProduct);
productRouter.get('/categories', getProductCategories);
productRouter.post('/product_details', getProductDetails);
productRouter.post('/card_categories', cardsByCartegory);
productRouter.post('/category_products', cateProducts);
productRouter.post('/filter-products', filterProducts);
productRouter.post('/filter_categories', c_and_p_filter);
productRouter.get('/search', searchProducts);
productRouter.get('/new-arrivals', newArrivals);
productRouter.put('/add_review/:id', verifyToken, reviews);
productRouter.get('/get_reviews/:id', getReviews);
productRouter.get('/related_products/:id/category/:cats', relatedProducts);

module.exports = productRouter;