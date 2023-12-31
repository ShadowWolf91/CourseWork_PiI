"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/tests/endpoints"));
const testController_1 = tslib_1.__importDefault(require("../controllers/testController"));
const testValidator_1 = tslib_1.__importDefault(require("../validators/testValidator"));
const TestRouter = (0, express_1.Router)();
TestRouter.get(endpoints_1.default.GET_BY_ID, testValidator_1.default.id(express_validator_1.query), testController_1.default.getTestById);
TestRouter.get(endpoints_1.default.GET_ALL_TESTS, testValidator_1.default.title(express_validator_1.query), testValidator_1.default.cursor(express_validator_1.query), testController_1.default.getAllTests);
TestRouter.get(endpoints_1.default.GET_BY_THEME_ID, testValidator_1.default.theme_id(express_validator_1.query), testController_1.default.getTestByThemeId);
TestRouter.post(endpoints_1.default.CREATE, testValidator_1.default.testName(express_validator_1.body, true, { max: 50 }), testValidator_1.default.question(express_validator_1.body), testValidator_1.default.optionA(express_validator_1.body), testValidator_1.default.optionB(express_validator_1.body), testValidator_1.default.optionC(express_validator_1.body), testValidator_1.default.optionD(express_validator_1.body), testValidator_1.default.correctAnswer(express_validator_1.body), testValidator_1.default.theme_id(express_validator_1.body), testValidator_1.default.statistic_id(express_validator_1.body), testController_1.default.createTest);
TestRouter.patch(endpoints_1.default.UPDATE, testValidator_1.default.testId(express_validator_1.body), testValidator_1.default.testName(express_validator_1.body, true, { max: 50 }), testValidator_1.default.question(express_validator_1.body), testValidator_1.default.optionA(express_validator_1.body), testValidator_1.default.optionB(express_validator_1.body), testValidator_1.default.optionC(express_validator_1.body), testValidator_1.default.optionD(express_validator_1.body), testValidator_1.default.correctAnswer(express_validator_1.body), testValidator_1.default.theme_id(express_validator_1.body), testValidator_1.default.statistic_id(express_validator_1.body), testController_1.default.updateTestData);
TestRouter.delete(endpoints_1.default.DELETE, testValidator_1.default.testId(express_validator_1.body), testController_1.default.deleteTest);
exports.default = TestRouter;
//# sourceMappingURL=testRouter.js.map