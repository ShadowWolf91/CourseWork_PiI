"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/subjects/endpoints"));
const subjectController_1 = tslib_1.__importDefault(require("../controllers/subjectController"));
const subjectRouter = (0, express_1.Router)();
subjectRouter.get(endpoints_1.default.GET_BY_ID, subjectController_1.default.getSubjectBySubId);
subjectRouter.get(endpoints_1.default.GET_ALL_SUBJECTS, subjectController_1.default.getAllSubjects);
subjectRouter.post(endpoints_1.default.CREATE, subjectController_1.default.createSubject);
subjectRouter.patch(endpoints_1.default.UPDATE, subjectController_1.default.updateSubjectData);
subjectRouter.delete(endpoints_1.default.DELETE, subjectController_1.default.deleteSubject);
exports.default = subjectRouter;
//# sourceMappingURL=subjectRouter.js.map