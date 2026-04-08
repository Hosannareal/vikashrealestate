require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { checkDbConnection } = require('./config/db');
const propertyRoutes = require('./routes/propertyRoutes');
const landRoutes = require('./routes/landRoutes');

// Initialize App
const app = express();

// Connect DB
checkDbConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/lands', landRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));