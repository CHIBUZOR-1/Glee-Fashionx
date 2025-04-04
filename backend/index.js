const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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
    res.locals.nonce = crypto.randomBytes(16).toString('base64'); // Generate nonce
    next();
});


app.use((req, res, next) => {
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://embed.tawk.to", "https://cdn.jsdelivr.net",   "https://www.gstatic.com", "https://www.googleapis.com", "https://apis.google.com"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "*.tawk.to", "https://assets.braintreegateway.com"],
                imgSrc: ["'self'", "data:", "https://www.gstatic.com", "blob:", "https://as2.ftcdn.net", "https://res.cloudinary.com", "https://cdn.jsdelivr.net", "*.tawk.to"],
                connectSrc: ["'self'", "https://www.googleapis.com", "https://origin-analytics-sand.sandbox.braintree-api.com", "https://assets.braintreegateway.com", "https://firebasestorage.googleapis.com", "https://payments.sandbox.braintree-api.com", "https://api.sandbox.braintreegateway.com", "https://identitytoolkit.googleapis.com", "blob:", "https://res.cloudinary.com", "*.tawk.to", "wss://*.tawk.to" ],
                fontSrc: ["'self'", "https://fonts.gstatic.com", "*.tawk.to"],
                objectSrc: ["'none'"],
                mediaSrc: ["'self'", "blob:", "https://res.cloudinary.com", "*.tawk.to"],
                frameSrc: ["'self'", "https://accounts.google.com", "*.tawk.to", "https://assets.braintreegateway.com"],
                baseUri: ["'self'"],
                formAction: ["'self'"],
            }
        }
    })(req, res, next);
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
    console.log(`Server listening @ http://localhost:${PORT}`);
});


