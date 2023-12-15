"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class OpenQuestionsService {
}
_a = OpenQuestionsService;
OpenQuestionsService.getAllOpenQuestions = async ({ cursor, openQuestionName, skip, take, }) => prismaClient_1.default.openQuestions.findMany({
    skip,
    take,
    cursor: cursor ? { id_openQustion: cursor } : undefined,
    where: {
        openQuestionName: { contains: openQuestionName, mode: "insensitive" },
    },
});
OpenQuestionsService.createOpenQuestion = async ({ theme_id, question, correctAnswer, openQuestionName, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findUnique({
        where: { openQuestionName },
        select: { id_openQustion: true },
    });
    if (!openQuestion)
        throw userRequestError_1.default.NotFound(`OPEN QUESTION WITH NAME ${openQuestionName} CREATED`);
    return prismaClient_1.default.openQuestions.create({
        data: {
            theme_id,
            question,
            correctAnswer,
            openQuestionName,
        },
    });
};
OpenQuestionsService.updateOpenQuestionData = async ({ id_openQustion, theme_id, question, correctAnswer, openQuestionName, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findUnique({
        where: { id_openQustion },
        select: { id_openQustion: true },
    });
    if (!openQuestion)
        throw userRequestError_1.default.NotFound(`OPEN QUESTION WITH ID ${id_openQustion} NOT FOUND`);
    return prismaClient_1.default.openQuestions.update({
        where: { id_openQustion },
        data: {
            id_openQustion,
            theme_id,
            question,
            correctAnswer,
            openQuestionName,
        },
    });
};
OpenQuestionsService.deleteOpenQuestions = async ({ id_openQustion, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findUnique({
        where: { id_openQustion: id_openQustion },
        select: { id_openQustion: true },
    });
    if (!openQuestion)
        throw userRequestError_1.default.NotFound(`OPEN QUESTION WITH ID ${id_openQustion} NOT FOUND`);
    return prismaClient_1.default.openQuestions.delete({
        where: { id_openQustion: id_openQustion },
    });
};
exports.default = OpenQuestionsService;
//# sourceMappingURL=openQuestionService.js.map