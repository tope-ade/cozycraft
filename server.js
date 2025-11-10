
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');


const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const logger = require('./config/logger');

//initialize express
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//call connectDB function
connectDB();

//API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/subscribe', subscriberRoutes)

//serve frontend static files from /public
app.use(express.static(path.join(__dirname, 'public')));

//fallback for SPA if needed (optional)
app.use((req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => logger.info(`server running on http://localhost:${PORT}`));