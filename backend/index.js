const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");
const crypto = require('crypto');


const app = express();

const { connectDB } = require('./db');
const userRouter = require('./Routes/UserRoutes');
const productRouter = require('./Routes/ProductRoutes');
const orderRouter = require('./Routes/OrderRoutes');

dotenv.config();

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true
}));
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json({ urlencoded: false}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

// Add CSP middleware here
app.use((req, res, next) => {
    const nonce = crypto.randomBytes(16).toString('base64');
    res.setHeader("Content-Security-Policy", `default-src 'self'; connect-src 'self' https://api.sandbox.braintreegateway.com https://payments.sandbox.braintree-api.com https://origin-analytics-sand.sandbox.braintree-api.com; frame-src 'self' https://assets.braintreegateway.com; style-src 'self' 'unsafe-inline' https://assets.braintreegateway.com; style-src-elem 'self' 'unsafe-inline' https://assets.braintreegateway.com`);
    res.locals.nonce = nonce; // Make nonce available to your templates
    next();
});


const PORT = process.env.HOSTP;

connectDB();

app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use("/images", express.static('uploads'));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
})


app.get('/', (req, res) => {
    res.send("Welcome to GLEE");
 });


 app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


