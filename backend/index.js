const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require("path");


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

const PORT = process.env.HOSTP;

connectDB();

app.get('/', (req, res) => {
    res.send("Welcome to GLEE");
 });
 
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.use("/images", express.static('uploads'));

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/build")));

    app.get("*", (req, res)=> {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
}

 app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


