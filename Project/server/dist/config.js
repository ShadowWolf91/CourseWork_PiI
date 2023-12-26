"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
require("dotenv/config");
exports.CONFIG = {
    PORT: process.env.PORT || 3000,
    JWT_ACCESS: process.env.JWT_ACCESS || "AcCeSs",
    JWT_REFRESH: process.env.JWT_REFRESH || "ReFrEsH",
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3001",
};
//# sourceMappingURL=config.js.map