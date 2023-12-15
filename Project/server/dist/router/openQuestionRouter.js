"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/openQuestions/endpoints"));
const openQuestionController_1 = tslib_1.__importDefault(require("../controllers/openQuestionController"));
const openQuestionRouter = (0, express_1.Router)();
openQuestionRouter.get(endpoints_1.default.GET_ALL_OPEN_QUESTIONS, openQuestionController_1.default.getAllOpenQuestions);
openQuestionRouter.post(endpoints_1.default.CREATE, openQuestionController_1.default.createOpenQuestion);
openQuestionRouter.patch(endpoints_1.default.UPDATE, openQuestionController_1.default.updateOpenQuestionData);
openQuestionRouter.delete(endpoints_1.default.DELETE, openQuestionController_1.default.deleteOpenQuestions);
exports.default = openQuestionRouter;
//# sourceMappingURL=openQuestionRouter.js.map