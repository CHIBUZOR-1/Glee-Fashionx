const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    name: {type: String},
    title: {type: String, required: true},
    comment : {type: String, required: true},
    rating : {type: Number, default: 0}
}, {
    timestamps: true
})

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    brand_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    old_price: {
        type: Number,
    },
    new_price: {
        type: Number,
        required: true
    },
    images: [],
    category: {
        type: String,
        required: true
    },
    sub_category: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    isNewArrival: { type: Boolean, default: false },
    size: {
        type: String,
        default: "S",
        enum: ["S", "M", "L", "XL", "XXL"]
    },
    reviews: [reviewSchema],
    totalRating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;