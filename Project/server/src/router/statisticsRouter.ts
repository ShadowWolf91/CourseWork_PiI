import { Router } from "express";
import StatisticsEndpoints from "../api/statistics/endpoints";
import StatisticsController from "../controllers/statisticsController";

const statisticsRouter = Router();

statisticsRouter.get(
  StatisticsEndpoints.GET_ALL_STATISTICS,
  StatisticsController.getAllStatistics
);

statisticsRouter.patch(
  StatisticsEndpoints.UPDATE,
  StatisticsController.updateStatisticsData
);

export default statisticsRouter;
