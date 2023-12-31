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
    skip: skip,
    take: take,
    cursor: cursor ? { id_openQuestion: cursor } : undefined,
    where: {
        openQuestionName: { contains: openQuestionName, mode: "insensitive" },
    },
});
OpenQuestionsService.getOpenQuestionById = async ({ id_openQuestion, }) => prismaClient_1.default.openQuestions.findUnique({
    where: { id_openQuestion: +id_openQuestion },
});
OpenQuestionsService.getOpenQuestionByThemeId = async ({ theme_id, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findMany({
        select: {
            question: true,
            correctAnswer: true,
        },
        where: { theme_id: +theme_id },
    });
    if (!openQuestion)
        throw userRequestError_1.default.NotFound(`THEME WITH THEME_ID ${theme_id} NOT FOUND`);
    return {
        theme_id,
        openQuestion,
    };
};
OpenQuestionsService.createOpenQuestion = async ({ theme_id, question, correctAnswer, openQuestionName, statistic_id, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findUnique({
        where: { openQuestionName },
        select: { id_openQuestion: true },
    });
    if (openQuestion)
        throw userRequestError_1.default.NotFound(`OPEN QUESTION WITH NAME ${openQuestionName} NOT CREATED`);
    return prismaClient_1.default.openQuestions.create({
        data: {
            theme_id,
            question,
            correctAnswer,
            openQuestionName,
            statistic_id,
        },
    });
};
OpenQuestionsService.updateOpenQuestionData = async ({ id_openQuestion, theme_id, question, correctAnswer, openQuestionName, statistic_id, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findUnique({
        where: { id_openQuestion },
        select: { id_openQuestion: true },
    });
    if (!openQuestion)
        throw userRequestError_1.default.NotFound(`OPEN QUESTION WITH ID ${id_openQuestion} NOT FOUND`);
    return prismaClient_1.default.openQuestions.update({
        where: { id_openQuestion },
        data: {
            id_openQuestion,
            theme_id,
            question,
            correctAnswer,
            openQuestionName,
            statistic_id,
        },
    });
};
OpenQuestionsService.deleteOpenQuestions = async ({ id_openQuestion, }) => {
    const openQuestion = await prismaClient_1.default.openQuestions.findUnique({
        where: { id_openQuestion: id_openQuestion },
        select: { id_openQuestion: true },
    });
    if (!openQuestion)
        throw userRequestError_1.default.NotFound(`OPEN QUESTION WITH ID ${id_openQuestion} NOT FOUND`);
    return prismaClient_1.default.openQuestions.delete({
        where: { id_openQuestion: id_openQuestion },
    });
};
exports.default = OpenQuestionsService;
//# sourceMappingURL=openQuestionService.js.map