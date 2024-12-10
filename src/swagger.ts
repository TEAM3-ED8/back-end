import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Express } from 'express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Santas Sight API',
      version: '1.0.0',
      description: 'API for managing Santa\'s operations',
    },
    servers: [
      {
        url: process.env.PROD_URL || 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.ts'), path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJsDoc(options);

export default function swaggerSetup(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

