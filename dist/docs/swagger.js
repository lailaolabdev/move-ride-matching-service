"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 8001;
const HOST_IP = process.env.IP || process.env.EC2_HOST || 'localhost';
const swaggerOptions = {
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
exports.default = swaggerOptions;
