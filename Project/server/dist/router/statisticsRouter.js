"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/statistics/endpoints"));
const statisticsController_1 = tslib_1.__importDefault(require("../controllers/statisticsController"));
const statisticsRouter = (0, express_1.Router)();
statisticsRouter.get(endpoints_1.default.GET_ALL_STATISTICS, statisticsController_1.default.getAllStatistics);
statisticsRouter.patch(endpoints_1.default.UPDATE, statisticsController_1.default.updateStatisticsData);
exports.default = statisticsRouter;
//# sourceMappingURL=statisticsRouter.js.map