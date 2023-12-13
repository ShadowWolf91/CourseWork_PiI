"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const node_process_1 = require("node:process");
const prismaClient_1 = tslib_1.__importDefault(require("./prismaClient"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const main = async () => {
    try {
        await prismaClient_1.default.$connect();
        app.listen(3000, () => console.log(`Server started on port ${3000}`));
    }
    catch (e) {
        console.error('Connection error. Stopping process...');
        await prismaClient_1.default.$disconnect();
        console.error(e);
    }
};
main().catch(() => console.log('Process stopped'));
process.on('SIGINT', async () => {
    await prismaClient_1.default.$disconnect();
    console.log('Disconnected with SIGINT');
    (0, node_process_1.exit)(0);
});
//# sourceMappingURL=index.js.map