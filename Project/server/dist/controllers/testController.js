"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const testService_1 = tslib_1.__importDefault(require("../services/testService"));
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
class TestController {
}
_a = TestController;
TestController.getAllTests = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await testService_1.default.getAllTests(req.query);
        res.json({
            testsData: result,
            cursor: result[result.length - 1]?.id_test || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
TestController.getTestById = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await testService_1.default.getTestById(req.query);
        if (!result)
            return next(userRequestError_1.default.NotFound(`TEST WITH ID ${req.query.id_test} NOT FOUND`));
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
TestController.getTestByThemeId = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await testService_1.default.getTestByThemeId(req.query);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
TestController.createTest = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await testService_1.default.createTest(req.body);
        res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
};
TestController.updateTestData = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await testService_1.default.updateTestData(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
TestController.deleteTest = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        await testService_1.default.deleteTest(req.body);
        res.json({ count: 1 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = TestController;
//# sourceMappingURL=testController.js.map