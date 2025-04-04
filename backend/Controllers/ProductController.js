const productModel = require('../Models/ProductModel');
const userModel = require('../Models/UserModel');

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
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortOrder = req.query.sort === 'asc' ? 1 : -1;
        const query= {};
        if (req.query.src) {
            query.$or = [
                {category: {$regex: req.query.src, $options: "i"}},
                {sub_category: {$regex: req.query.src, $options: "i"}},
                {product_name: {$regex: req.query.src, $options: "i"}}
            ];
        }
        // Price filter
        if (req.query.price && req.query.price.length) {
            const [minPrice, maxPrice] = req.query.price.split('-').map(Number);
            console.log([minPrice, maxPrice])
            query.new_price = {$gte: minPrice, $lte: maxPrice};
        }

        // Handle checkbox filters (brand_name)
        if (req.query.brand && req.query.brand.length > 0) {
            query.brand_name = { $in: req.query.brand.split('--') };
        }
        const products = await productModel.find(query).sort({createdAt: sortOrder}).skip(startIndex).limit(limit);
        const totalProducts = await productModel.countDocuments(query);
        const now = new Date();
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthProducts = await productModel.countDocuments({
            ...query,
            createdAt: { $gte: oneMonthAgo },
        });
        res.json({
            success: true,
            message: "Retrieved Product List",
            products,
            totalProducts,
            lastMonthProducts
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



const cateProducts = async (req, res) => {
    try {
        const { que, price, brand } = req.query;
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 6;

        // Initialize query to filter by sub_category
        const query = { sub_category: que };

        // Handle price filter
        if (price && price.length) {
            const [minPrice, maxPrice] = price.split('-').map(Number);
            query.new_price = { $gte: minPrice, $lte: maxPrice };
        }

        // Handle brand filter
        if (brand && brand.length > 0) {
            query.brand_name = { $in: brand.split('--') };
        }

        // Fetch filtered products
        const result = await productModel.find(query).skip(startIndex).limit(limit);
        res.json({
            result,
            success: true,
            error: false, // Correcting the `error` flag
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true
        });
    }
};

const newArrivals = async (req, res) => {
    try {
        const newArrivals = await productModel.find({ isNewArrival: true });
        res.json(newArrivals);
    } catch (error) {
        res.status(500).send('Server Error');
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


 module.exports = {addProduct, relatedProducts, newArrivals, getReviews, reviews, productList, cateProducts, removeProduct, getProductDetails, updateProduct, cardsByCartegory, getProductCategories};