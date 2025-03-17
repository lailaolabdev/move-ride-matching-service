import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8001;

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Move Taxi Ride Matching Service API documentation',
    },
    servers: [
      {
        url: `http://${process.env.IP}:${PORT}`, // Production server
        description: 'Dev Development server',
      },
      {
        url: `http://localhost:${PORT}`, // Update with your server's URL
        description: 'Local Development server',
      },
    ]
  },
  apis: ['./src/docs/**/*.ts'],  // Adjust the path to match your route files
};

export default swaggerOptions;
