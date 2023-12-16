"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const statisticService_1 = tslib_1.__importDefault(require("../services/statisticService"));
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
class StatisticsController {
}
_a = StatisticsController;
StatisticsController.getAllStatistics = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await statisticService_1.default.getAllStatistics(req.query);
        res.json({
            statisticsData: result,
            cursor: result[result.length - 1]?.id_statistics || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
StatisticsController.getStatisticByUserId = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await statisticService_1.default.getStatisticByUserId(req.body);
        if (!result)
            return next(userRequestError_1.default.NotFound(""));
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
StatisticsController.updateStatisticsData = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await statisticService_1.default.updateStatisticsData(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
exports.default = StatisticsController;
//# sourceMappingURL=statisticsController.js.map