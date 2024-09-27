const express = require('express');
const { verifyToken, isAdmin } = require('../Utilities/Auth');
const { braintreeTokenController, braintreePaymentController, userOrders, allOrders, updateStatus } = require('../Controllers/OrderController');
const orderRouter = express.Router();

orderRouter.get('/braintree/token', braintreeTokenController);
orderRouter.post('/braintree/payment', verifyToken, braintreePaymentController);
orderRouter.get('/my_orders', verifyToken, userOrders); 
orderRouter.get('/all_orders', verifyToken, isAdmin, allOrders);
orderRouter.post('/status', verifyToken, updateStatus);

module.exports = orderRouter;