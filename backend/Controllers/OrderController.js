const braintree = require('braintree');
const orderModel = require('../Models/OrderModel');
const dotenv = require("dotenv");

dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANTID,
    publicKey: process.env.BRAINTREE_PUBLICKEY,
    privateKey: process.env.BRAINTREE_PRIVATEKEY
})

// Client Token generator
const braintreeTokenController = async(req, res) => {
    try {
        gateway.clientToken.generate({}, function(err, response) {
            if(err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error);
    }
}
// Payment controller
const braintreePaymentController = async(req, res) => {
    try {
        const {carts, nonce, amount, address} = req.body;

        gateway.transaction.sale({
            amount: amount,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            },
        },

        function (err, result) {
            if(result) {
                const order = new orderModel({
                    userId: req.user.userId,
                    products: carts,
                    amount: amount,
                    address: address,
                    payment: result
                }).save();
                res.json({
                    success: true
                })
            } else {
                res.status(500).send(err)
            }
        }
    
    );
        
    } catch (error) {
        console.log(error);
    }
}

// user Orders 

const userOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({userId:req.user.userId}).sort({createdAt: -1});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "An error occured!"
        })
    }
}
// Admin All orders
const allOrders = async(req, res) => {
    try {
        const orders = await orderModel.find({}).sort({createdAt: -1});
        res.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: true,
            message: "An error occured!"
        })
    }
}

// Updating order status 
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status}, {new: true});
        res.json({
            success: true,
            message: "Order status changed"
        })
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            success: false,
            message: "Error Occured!"
        })
    }
}

module.exports = { braintreeTokenController, braintreePaymentController, userOrders, allOrders, updateStatus };