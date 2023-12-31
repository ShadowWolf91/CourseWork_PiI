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
  // StatisticDataValidator.skip(query),
  // StatisticDataValidator.take(query),
  StatisticsController.getAllStatistics
);

statisticsRouter.patch(
  StatisticsEndpoints.UPDATE,
  StatisticDataValidator.id(body),
  StatisticDataValidator.title(body, true, { max: 50 }),
  StatisticDataValidator.rightAnsweredTests(body, true),
  StatisticDataValidator.rightAnsweredCards(body, true),
  StatisticDataValidator.rightAnsweredOQs(body, true),
  StatisticDataValidator.markTests(body, true),
  StatisticDataValidator.markCards(body, true),
  StatisticDataValidator.markOpenQuestions(body, true),
  StatisticDataValidator.user_id(body),
  StatisticsController.updateStatisticsData
);

export default statisticsRouter;
