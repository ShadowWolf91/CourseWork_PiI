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
import {
  IGetStatisticByUserIdRequest,
  IGetStatisticByUserIdResponse,
} from "../api/statistics/reg/getStatisticByUserId";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import StatisticService from "../services/statisticService";
import UserRequestError from "../errors/userRequestError";

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
        //@ts-ignore
        statisticsData: result,
        cursor: result[result.length - 1]?.id || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  static getStatisticByUserId: RequestHandler<
    undefined,
    IGetStatisticByUserIdResponse[] | IErrorResponse,
    IGetStatisticByUserIdRequest
    // undefined,
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await StatisticService.getStatisticByUserId(req.body);
      if (!result) return next(UserRequestError.NotFound(""));

      res.json(result);
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
