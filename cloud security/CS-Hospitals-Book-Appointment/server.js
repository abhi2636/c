require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connect = require('./config/connection');  
const specs = require('./config/swagger.js');
const swaggerUi = require('swagger-ui-express');

// Routes
const appointmentRoute = require('./routes/appointmentRoute.js');

const app = express();

connect();

app.use(express.json());
app.use(cors());

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log("Request Body:", req.body);
    }
    next();
});

// Swagger Docs
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

// Routes
app.use('/v1/appointments', appointmentRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Listening on Port " + (process.env.PORT || 5000));
});
