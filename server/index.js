import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';
import authRoutes from './routes/Auth.js';
import contactRoutes from './routes/Contact.js';
import featureRoutes from './routes/Feature.js'; 
import notificationRoutes from './routes/Firebase.js';

import config from './config/index.js';

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MoTalent Swagger API',
            version: '1.0.0',
            description: 'API Documentation for the MoTalent application',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api/feature', featureRoutes); 
app.use('/api/notifications', notificationRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
