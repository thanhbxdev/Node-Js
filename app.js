import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import cors from 'cors'

const app = express();
dotenv.config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

// app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(expressValidator());
// Routes Middlewares
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
//Connect
mongoose.connect(process.env.MONGGOO_URI, {
    useNewUrlParser: false,
    useCreateIndex: true,
}).then(() => {
    console.log('Database Connected');
});
mongoose.connection.on('Error', err => {
    console.log(`Dat connect failde, ${ err.message }`);
});
//
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running port', port)
})