"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/statistics/endpoints"));
const statisticsController_1 = tslib_1.__importDefault(require("../controllers/statisticsController"));
const statisticsValidator_1 = tslib_1.__importDefault(require("../validators/statisticsValidator"));
const statisticsRouter = (0, express_1.Router)();
statisticsRouter.post(endpoints_1.default.GET_BY_USER_ID, statisticsValidator_1.default.id(express_validator_1.query), statisticsController_1.default.getStatisticByUserId);
statisticsRouter.get(endpoints_1.default.GET_ALL_STATISTICS, statisticsValidator_1.default.title(express_validator_1.query), statisticsValidator_1.default.cursor(express_validator_1.query), statisticsController_1.default.getAllStatistics);
statisticsRouter.patch(endpoints_1.default.UPDATE, statisticsValidator_1.default.id(express_validator_1.body), statisticsValidator_1.default.title(express_validator_1.body, true, { max: 50 }), statisticsValidator_1.default.rightAnsweredTests(express_validator_1.body, true), statisticsValidator_1.default.rightAnsweredCards(express_validator_1.body, true), statisticsValidator_1.default.rightAnsweredOQs(express_validator_1.body, true), statisticsValidator_1.default.markTests(express_validator_1.body, true), statisticsValidator_1.default.markCards(express_validator_1.body, true), statisticsValidator_1.default.markOpenQuestions(express_validator_1.body, true), statisticsValidator_1.default.user_id(express_validator_1.body), statisticsController_1.default.updateStatisticsData);
exports.default = statisticsRouter;
//# sourceMappingURL=statisticsRouter.js.map