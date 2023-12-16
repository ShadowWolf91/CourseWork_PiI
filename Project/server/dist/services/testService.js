"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class TestsService {
}
_a = TestsService;
TestsService.getAllTests = async ({ cursor, testName, skip, take, }) => prismaClient_1.default.tests.findMany({
    skip,
    take,
    cursor: cursor ? { id_test: cursor } : undefined,
    where: { testName: { contains: testName, mode: "insensitive" } },
});
TestsService.getTestById = async ({ id_test }) => prismaClient_1.default.tests.findUnique({
    where: { id_test: +id_test },
});
TestsService.createTest = async ({ theme_id, question, optionA, optionB, optionC, optionD, correctAnswer, testName, statistic_id, }) => {
    const test = await prismaClient_1.default.tests.findUnique({
        where: { testName },
        select: { id_test: true },
    });
    if (test)
        throw userRequestError_1.default.NotFound(`TEST WITH NAME ${question} NOT CREATED`);
    return prismaClient_1.default.tests.create({
        data: {
            theme_id,
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            testName,
            statistic_id,
        },
    });
};
TestsService.updateTestData = async ({ id_test, theme_id, question, optionA, optionB, optionC, optionD, correctAnswer, testName, statistic_id, }) => {
    const test = await prismaClient_1.default.tests.findUnique({
        where: { id_test },
        select: { id_test: true },
    });
    if (!test)
        throw userRequestError_1.default.NotFound(`TEST WITH ID ${id_test} NOT FOUND`);
    return prismaClient_1.default.tests.update({
        where: { id_test },
        data: {
            id_test,
            theme_id,
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer,
            testName,
            statistic_id,
        },
    });
};
TestsService.deleteTest = async ({ id_test }) => {
    const test = await prismaClient_1.default.tests.findUnique({
        where: { id_test: id_test },
        select: { id_test: true },
    });
    if (!test)
        throw userRequestError_1.default.NotFound(`TEST WITH ID ${id_test} NOT FOUND`);
    return prismaClient_1.default.tests.delete({
        where: { id_test: id_test },
    });
};
exports.default = TestsService;
//# sourceMappingURL=testService.js.map