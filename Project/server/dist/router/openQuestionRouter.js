"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/openQuestions/endpoints"));
const openQuestionController_1 = tslib_1.__importDefault(require("../controllers/openQuestionController"));
const openQuestionValidator_1 = tslib_1.__importDefault(require("../validators/openQuestionValidator"));
const openQuestionRouter = (0, express_1.Router)();
openQuestionRouter.get(endpoints_1.default.GET_BY_ID, openQuestionValidator_1.default.id(express_validator_1.query), openQuestionController_1.default.getOpenQuestionById);
openQuestionRouter.get(endpoints_1.default.GET_ALL_OPEN_QUESTIONS, openQuestionValidator_1.default.title(express_validator_1.query), openQuestionValidator_1.default.cursor(express_validator_1.query), openQuestionController_1.default.getAllOpenQuestions);
openQuestionRouter.get(endpoints_1.default.GET_BY_THEME_ID, openQuestionValidator_1.default.theme_id(express_validator_1.query), openQuestionController_1.default.getOpenQuestionByThemeId);
openQuestionRouter.post(endpoints_1.default.CREATE, openQuestionValidator_1.default.openQuestionName(express_validator_1.body, true, { max: 50 }), openQuestionValidator_1.default.question(express_validator_1.body), openQuestionValidator_1.default.correctAnswer(express_validator_1.body), openQuestionValidator_1.default.theme_id(express_validator_1.body), openQuestionValidator_1.default.statistic_id(express_validator_1.body), openQuestionController_1.default.createOpenQuestion);
openQuestionRouter.patch(endpoints_1.default.UPDATE, openQuestionValidator_1.default.openQuestionId(express_validator_1.body), openQuestionValidator_1.default.openQuestionName(express_validator_1.body, true, { max: 50 }), openQuestionValidator_1.default.question(express_validator_1.body), openQuestionValidator_1.default.correctAnswer(express_validator_1.body), openQuestionValidator_1.default.theme_id(express_validator_1.body), openQuestionValidator_1.default.statistic_id(express_validator_1.body), openQuestionController_1.default.updateOpenQuestionData);
openQuestionRouter.delete(endpoints_1.default.DELETE, openQuestionValidator_1.default.openQuestionId(express_validator_1.body), openQuestionController_1.default.deleteOpenQuestions);
exports.default = openQuestionRouter;
//# sourceMappingURL=openQuestionRouter.js.map