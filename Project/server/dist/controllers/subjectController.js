"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const subjectService_1 = tslib_1.__importDefault(require("../services/subjectService"));
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
class SubjectController {
}
_a = SubjectController;
SubjectController.getSubjectBySubId = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await subjectService_1.default.getSubjectBySubId(req.query);
        if (!result)
            return next(userRequestError_1.default.NotFound(`SUBJECT WITH ID ${req.query.id_subject} NOT FOUND`));
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
SubjectController.getAllSubjects = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await subjectService_1.default.getAllSubjects(req.query);
        res.json({
            subjectsData: result,
            cursor: result[result.length - 1]?.id_subject || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
SubjectController.createSubject = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await subjectService_1.default.createSubject(req.body);
        res.status(201).json({
            ...result,
        });
    }
    catch (e) {
        return next(e);
    }
};
SubjectController.updateSubjectData = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await subjectService_1.default.updateSubject(req.body);
        res.json({
            ...result,
        });
    }
    catch (e) {
        return next(e);
    }
};
SubjectController.deleteSubject = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        await subjectService_1.default.deleteSubject(req.body);
        res.json({ count: 1 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = SubjectController;
//# sourceMappingURL=subjectController.js.map