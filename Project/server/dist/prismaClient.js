"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_client_1 = require("prisma/prisma-client");
const prismaClient = new prisma_client_1.PrismaClient({
    errorFormat: 'minimal',
    log: ['info', 'warn', 'error'],
});
exports.default = prismaClient;
//# sourceMappingURL=prismaClient.js.map