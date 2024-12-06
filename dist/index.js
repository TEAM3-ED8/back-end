"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const swagger_1 = __importDefault(require("./swagger"));
const PORT = process.env.PORT || 8080;
(0, swagger_1.default)(app_1.app);
app_1.app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
