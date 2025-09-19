import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8001;
const HOST_IP = process.env.IP || process.env.EC2_HOST || 'localhost';

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
        url: `http://${HOST_IP}:${PORT}`,
        description: 'Production server',
      },
      {
        url: `http://localhost:${PORT}`,
        description: 'Local Development server',
      },
    ]
  },
  apis: ['./src/docs/**/*.ts'],
};

export default swaggerOptions;