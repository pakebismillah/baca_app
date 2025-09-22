import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './src/config/database.js';
import bookRoutes from './src/routes/bookroutes.js';
import peminjamanRoutes from './src/routes/peminjamanRoute.js';
import errorHandler from './src/middleware/errorHandling.js';
import aiRoutes from './src/routes/aiRoute.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3000

//middlewares
app.use(cors())
app.use(express.json())

//routes
app.use(bookRoutes);
app.use(aiRoutes);
app.use(peminjamanRoutes);


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