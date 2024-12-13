"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = swaggerSetup;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
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
    apis: [path_1.default.join(__dirname, './routes/*.ts'), path_1.default.join(__dirname, './routes/*.js')],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
function swaggerSetup(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
}
