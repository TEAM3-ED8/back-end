import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { Express } from 'express';
import path from 'path';
const isProduction = process.env.NODE_ENV === 'production';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory System API',
      version: '1.0.0',
      description: '',
    },
    servers: [
      {
        url: isProduction ? process.env.PROD_URL : process.env.DEV_URL,
      },
    ],
  },
  apis: [path.join(__dirname, '/src/routes/*.ts')],
};

const swaggerSpec = swaggerJsDoc(options);

export default (app: Express) => {
    app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };