"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const openQuestionService_1 = tslib_1.__importDefault(require("../services/openQuestionService"));
class OpenQuestionController {
}
_a = OpenQuestionController;
OpenQuestionController.getAllOpenQuestions = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await openQuestionService_1.default.getAllOpenQuestions(req.query);
        res.json({
            openQuestionsData: result,
            cursor: result[result.length - 1]?.id_openQustion || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
OpenQuestionController.createOpenQuestion = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await openQuestionService_1.default.createOpenQuestion(req.body);
        res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
};
OpenQuestionController.updateOpenQuestionData = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await openQuestionService_1.default.updateOpenQuestionData(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
OpenQuestionController.deleteOpenQuestions = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        await openQuestionService_1.default.deleteOpenQuestions(req.body);
        res.json({ count: 1 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = OpenQuestionController;
//# sourceMappingURL=openQuestionController.js.map