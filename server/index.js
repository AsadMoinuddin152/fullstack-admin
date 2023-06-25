import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import colors from 'colors';

/*Importing Routes*/
import clientRoutes from './routes/client.js';
import managementRoutes from './routes/management.js';
import generalRoutes from './routes/general.js';
import salesRoutes from './routes/sales.js';

/*Data Imports */
import User from './models/User.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat,
} from './data/index.js';

/*Configurations*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*Routes*/
app.use('/client', clientRoutes);
app.use('/management', managementRoutes);
app.use('/general', generalRoutes);
app.use('/sales', salesRoutes);

/* Mongoose setup */
const PORT = process.env.PORT || 9000;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'admin-panel',
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
                    .bgCyan.white
            );
            console.log(`Database : Connected`.bgGreen);

            /*Only Add data One time*/
            // AffiliateStat.insertMany(dataAffiliateStat);
            // OverallStat.insertMany(dataOverallStat);
            // ProductStat.insertMany(dataProductStat);
            // Product.insertMany(dataProduct);
            // Transaction.insertMany(dataTransaction);
            // User.insertMany(dataUser);
        });
    })
    .catch((error) => {
        console.log(`${error} did not connect`);
    });
