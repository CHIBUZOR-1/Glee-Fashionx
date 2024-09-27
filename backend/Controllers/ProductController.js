const productModel = require('../Models/ProductModel');
const fs = require('fs');
const path = require('path');
const { title } = require('process');
const userModel = require('../Models/UserModel');
const { ObjectId } = require('mongoose').Types;

const addProduct = async (req, res) => {
    try {
        //let image_filename = `${req.file.filename}`;
        const {product_name, isNewArrival, brand_name, description, old_price, new_price, category, sub_category, stock, department} = req.body;
        if(!product_name) {
            return res.send({error: 'name required'});
        }
        if(!brand_name) {
            return res.send({error: 'brand_name required'});
        }
        if(!description) {
            return res.send({error: 'description required'});
        }
        if(!new_price) {
            return res.send({error: 'new_price required'});
        }
        if(!category) {
            return res.send({error: 'category required'});
        }
        if(!sub_category) {
            return res.send({error: 'sub_category required'});
        }
        if(!stock) {
            return res.send({error: 'quantity required'});
        }
        const product = await new productModel({
            product_name,
            brand_name,
            description,
            old_price,
            new_price,
            images: req.files,
            category,
            sub_category,
            department,
            isNewArrival,
            stock
        }).save();
        res.json({
            success: true,
            error: false,
            message: "Product Added"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Unable to add Product"
        })
    }
}

const productList = async (req, res) => {
    try {
        const products = await productModel.find({}).sort({createdAt: -1});
        res.json({
            success: true,
            message: "Retrieved Product List",
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error retrieving product list"
        })
    }

 }


 const updateProduct = async (req, res) => {
    try {
        const {oldPrice, newPrice, newStock, newName, newCategory, newSubCategory} = req.body;
        
        if(!newName) {
            return res.send({error: 'tag required'});
        }
        if(!oldPrice) {
            return res.send({error: 'old price required'});
        }
        if(!newPrice) {
            return res.send({error: 'new price required'});
        }
        if(!newStock) {
            return res.send({error: 'new quantity required'});
        }
        if(!newCategory) {
            return res.send({error: 'category required'});
        }
        if(!newSubCategory) {
            return res.send({error: 'new sub category required'});
        }
        const productUpdate = await productModel.findByIdAndUpdate(req.params.id, {
            product_name: newName,
            old_price: oldPrice,
            new_price: newPrice,
            stock: newStock,
            category: newCategory,
            sub_category: newSubCategory
        }, {new: true});
        res.json({
            success: true,
            error: false,
            message: "Product Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Unable to update Product"
        })
    }
 }

 const cardsByCartegory = async (req, res) => {
    try {
        const { dept } = req.body;
        const product = await productModel.find({ category: dept }).sort({createdAt: -1});
        res.json({
            success: true,
            data: product,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success: false,
            message: 'An error occured'
        })
    }
}

const getProductDetails = async(req, res)=> {
    try {
        const { id } = req.body;
        const product = await productModel.findById(id);
        res.json({
            data: product,
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success:false,
            message: "An error occurred!"
        })
    }
}

 const removeProduct = async (req, res) => { 
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if(product) {
          res.json({
            success: true,
            message: "deleted Successfully",
          });  
        } else {
            res.json({
              success: true,
              message: "delete Usuccessful"
            });
        }
          
        
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message: "Error in Deleting file",
            error: true
        })
    }
 }

 const getProductCategories = async (req, res) => {
    try {
        const categoryTabs = await productModel.distinct('category');
        const catTabList = [];

        for (const category of categoryTabs) {
            const product = await productModel.findOne({category}).sort({sub_category: -1});
            if(product) {
                catTabList.push(product)
            }
        }

        res.json({
            success: true,
            message: "Product categories",
            data: catTabList,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            message: "An error occured",
            success: false
        })
    }
}

const c_and_p_filter = async(req, res) => {
    try {
        const {checked, radio, que} = req.body;
        let args = {};
        if(que)  args.sub_category = que;
        if(checked.length > 0) args.brand_name = checked;
        if(radio.length) args.new_price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Error filtering products"
        })
    }
}

const cateProducts = async (req, res) => {
    try {
        const { que } = req.body;
        const result = await productModel.find({sub_category: que});
        res.json({
            data: result,
            success:true,
            error: true
        }); 
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true
        });
    }
}

const newArrivals = async (req, res) => {
    try {
        const newArrivals = await productModel.find({ isNewArrival: true });
        res.json(newArrivals);
    } catch (error) {
        res.status(500).send('Server Error');
    }
}

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.query;
        const result = await productModel.find({
            $or: [
                {brand_name: {$regex : keyword, $options: "i"}},
                {category: {$regex: keyword, $options: "i"}},
                {sub_category: {$regex: keyword, $options: "i"}},
                {product_name: {$regex: keyword, $options: "i"}}
            ]
        });

        res.json({
            data: result,
            success:true,
            error: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true
        })
    }
}

const filterProducts = async(req, res) => {
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.brand_name = checked;
        if(radio.length) args.new_price = {$gte: radio[0], $lte: radio[1]}
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "Error filtering products"
        })
    }
}

const reviews = async(req, res) => {
    try {
        const {comment, title, rating} = req.body;
        const product = await productModel.findById(req.params.id);
        const username = await userModel.findById(req.user.userId);
        // checking previous review
        const alreadyReviewed = product.reviews.find((r)=> 
            r.user.toString() === req.user.userId.toString()
        );
        if(alreadyReviewed) {
            return res.status(400).send({
                success: false,
                message: "Product Already Reviewed"
            });
        }
        const review = {
            name: username.firstname,
            user: req.user.userId,
            title,
            comment,
            rating: Number(rating)

        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.totalRating = product.reviews.reduce((acc, item)=> item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(200).send({
            success: true,
            message: "Review Added"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error Occured!",
            error
        })
    }
}

const relatedProducts = async(req, res) => {
    try {
        const {id, cats} = req.params;
        const products = await productModel.find({
            sub_category: cats,
            _id: {$ne: id}
        }).limit(4).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: true,
            success: false,
            message: "An Error Ocurred!"
        })
    }
}

const getReviews = async (req, res) => {
    const product = await productModel.findById(req.params.id).select("-user");
    if(!product) {
        return res.status(404).send({
            success: false,
            message: 'Product not found'
        })
    }
    res.status(200).send(
        product.reviews
    );
  };


 module.exports = {addProduct, relatedProducts, newArrivals, getReviews, reviews, c_and_p_filter, productList, filterProducts, cateProducts, removeProduct, getProductDetails, updateProduct, cardsByCartegory, getProductCategories, searchProducts};