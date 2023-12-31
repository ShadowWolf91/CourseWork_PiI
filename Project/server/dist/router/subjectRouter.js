"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/subjects/endpoints"));
const subjectController_1 = tslib_1.__importDefault(require("../controllers/subjectController"));
const subjectValidator_1 = tslib_1.__importDefault(require("../validators/subjectValidator"));
const subjectRouter = (0, express_1.Router)();
subjectRouter.get(endpoints_1.default.GET_BY_ID, subjectValidator_1.default.id(express_validator_1.query), subjectController_1.default.getSubjectBySubId);
subjectRouter.get(endpoints_1.default.GET_ALL_SUBJECTS, subjectValidator_1.default.title(express_validator_1.query), subjectValidator_1.default.cursor(express_validator_1.query), subjectController_1.default.getAllSubjects);
subjectRouter.post(endpoints_1.default.CREATE, subjectValidator_1.default.subjectName(express_validator_1.body, true, { max: 50 }), subjectValidator_1.default.idSubject(express_validator_1.body), subjectController_1.default.createSubject);
subjectRouter.patch(endpoints_1.default.UPDATE, subjectValidator_1.default.subjectId(express_validator_1.body), subjectValidator_1.default.subjectName(express_validator_1.body, true, { max: 50 }), subjectController_1.default.updateSubjectData);
subjectRouter.delete(endpoints_1.default.DELETE, subjectValidator_1.default.subjectId(express_validator_1.body), subjectController_1.default.deleteSubject);
exports.default = subjectRouter;
//# sourceMappingURL=subjectRouter.js.map