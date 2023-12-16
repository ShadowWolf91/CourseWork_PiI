import { RequestHandler } from "express";
import { IErrorResponse } from "../api/errorResponse";
import {
  ICreateTestRequest,
  ICreateTestResponse,
} from "../api/tests/reg/createTest";
import {
  IDeleteTestRequest,
  IDeleteTestResponse,
} from "../api/tests/reg/deleteTest";
import {
  IUpdateTestRequest,
  IUpdateTestResponse,
} from "../api/tests/reg/updateTest";
import {
  IGetAllTestsRequest,
  IGetAllTestsResponse,
} from "../api/tests/reg/getAllTests";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import TestsService from "../services/testService";

export default class TestController {
  //get
  static getAllTests: RequestHandler<
    undefined,
    IGetAllTestsResponse | IErrorResponse,
    undefined,
    IGetAllTestsRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await TestsService.getAllTests(req.query);
      res.json({
        testsData: result,
        cursor: result[result.length - 1]?.id_test || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  //create
  static createTest: RequestHandler<
    undefined,
    ICreateTestResponse | IErrorResponse,
    ICreateTestRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await TestsService.createTest(req.body);
      res.status(201).json(result);
    } catch (e) {
      return next(e);
    }
  };

  //update
  static updateTestData: RequestHandler<
    undefined,
    IUpdateTestResponse | IErrorResponse,
    IUpdateTestRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await TestsService.updateTestData(req.body);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //delete
  static deleteTest: RequestHandler<
    undefined,
    IDeleteTestResponse | IErrorResponse,
    IDeleteTestRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      await TestsService.deleteTest(req.body);

      res.json({ count: 1 });
    } catch (e) {
      return next(e);
    }
  };
}
