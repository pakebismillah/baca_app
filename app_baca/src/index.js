import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './config/database.js';
import Book from './models/book.js';
import bookRoutes from './routes/bookroutes.js';
import errorHandler from './middleware/errorHandling.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use(bookRoutes);

//error handling middleware
app.use(errorHandler);

 //server rnning
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected ke', process.env.DB_NAME);

        await sequelize.sync();
        console.log('✅ Database synchronized');


    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
    console.log(`🚀 Server running on port ${PORT}`);
});