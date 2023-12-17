"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const node_process_1 = require("node:process");
const config_1 = require("./config");
const prismaClient_1 = tslib_1.__importDefault(require("./prismaClient"));
const cardRouter_1 = tslib_1.__importDefault(require("./router/cardRouter"));
const openQuestionRouter_1 = tslib_1.__importDefault(require("./router/openQuestionRouter"));
const subjectRouter_1 = tslib_1.__importDefault(require("./router/subjectRouter"));
const testRouter_1 = tslib_1.__importDefault(require("./router/testRouter"));
const themeRouter_1 = tslib_1.__importDefault(require("./router/themeRouter"));
const statisticsRouter_1 = tslib_1.__importDefault(require("./router/statisticsRouter"));
const userRouter_1 = tslib_1.__importDefault(require("./router/userRouter"));
const endpoints_1 = tslib_1.__importDefault(require("./api/users/endpoints"));
const endpoints_2 = tslib_1.__importDefault(require("./api/cards/endpoints"));
const endpoints_3 = tslib_1.__importDefault(require("./api/openQuestions/endpoints"));
const endpoints_4 = tslib_1.__importDefault(require("./api/subjects/endpoints"));
const endpoints_5 = tslib_1.__importDefault(require("./api/tests/endpoints"));
const endpoints_6 = tslib_1.__importDefault(require("./api/themes/endpoints"));
const endpoints_7 = tslib_1.__importDefault(require("./api/statistics/endpoints"));
const error_1 = tslib_1.__importDefault(require("./mid/error"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: config_1.CONFIG.CLIENT_URL,
}));
app.use(endpoints_1.default.BASE, userRouter_1.default);
app.use(endpoints_2.default.BASE, cardRouter_1.default);
app.use(endpoints_3.default.BASE, openQuestionRouter_1.default);
app.use(endpoints_4.default.BASE, subjectRouter_1.default);
app.use(endpoints_5.default.BASE, testRouter_1.default);
app.use(endpoints_6.default.BASE, themeRouter_1.default);
app.use(endpoints_7.default.BASE, statisticsRouter_1.default);
app.use(error_1.default);
const main = async () => {
    try {
        await prismaClient_1.default.$connect();
        app.listen(config_1.CONFIG.PORT, () => console.log(`Server started on port ${config_1.CONFIG.PORT}`));
    }
    catch (e) {
        console.error("Connection error. Stopping process...");
        await prismaClient_1.default.$disconnect();
        console.error(e);
    }
};
main().catch(() => console.log("Process stopped"));
process.on("SIGINT", async () => {
    await prismaClient_1.default.$disconnect();
    console.log("Disconnected with SIGINT");
    (0, node_process_1.exit)(0);
});
//# sourceMappingURL=index.js.map