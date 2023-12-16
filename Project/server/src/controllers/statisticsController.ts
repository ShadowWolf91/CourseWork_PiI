import { RequestHandler } from "express";
import { IErrorResponse } from "../api/errorResponse";
import {
  IUpdateStatisticRequest,
  IUpdateStatisticResponse,
} from "../api/statistics/reg/updateStatistics";
import {
  IGetAllStatisticsRequest,
  IGetAllStatisticsResponse,
} from "../api/statistics/reg/getAllStatistics";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import StatisticService from "../services/statisticService";

export default class StatisticsController {
  //get
  static getAllStatistics: RequestHandler<
    undefined,
    IGetAllStatisticsResponse | IErrorResponse,
    undefined,
    IGetAllStatisticsRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await StatisticService.getAllStatistics(req.query);
      res.json({
        statisticsData: result,
        cursor: result[result.length - 1]?.id_statistics || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  //update
  static updateStatisticsData: RequestHandler<
    undefined,
    IUpdateStatisticResponse | IErrorResponse,
    IUpdateStatisticRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await StatisticService.updateStatisticsData(req.body);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };
}
