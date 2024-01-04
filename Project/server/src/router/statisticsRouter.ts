import { Router } from "express";
import { body, query } from "express-validator";
import StatisticsEndpoints from "../api/statistics/endpoints";
import StatisticsController from "../controllers/statisticsController";
import StatisticDataValidator from "../validators/statisticsValidator";

const statisticsRouter = Router();

statisticsRouter.post(
  StatisticsEndpoints.GET_BY_USER_ID,
  StatisticDataValidator.id(query),
  StatisticsController.getStatisticByUserId
);

statisticsRouter.get(
  StatisticsEndpoints.GET_ALL_STATISTICS,
  StatisticDataValidator.title(query),
  StatisticDataValidator.cursor(query),
  StatisticDataValidator.skip(query),
  StatisticDataValidator.take(query),
  StatisticsController.getAllStatistics
);

statisticsRouter.patch(
  StatisticsEndpoints.UPDATE,
  StatisticDataValidator.id(body),
  StatisticDataValidator.rightAnswered(body, true),
  StatisticDataValidator.mark(body, true),
  StatisticsController.updateStatisticsData
);

export default statisticsRouter;
