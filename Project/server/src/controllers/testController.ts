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
import {
  IGetTestByIdRequest,
  IGetTestByIdResponse,
} from "../api/tests/reg/getTestById";
import {
  IGetTestByThemeIdRequest,
  IGetTestByThemeIdResponse,
} from "../api/tests/reg/getByThemeId";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import TestsService from "../services/testService";
import UserRequestError from "../errors/userRequestError";

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

  static getTestById: RequestHandler<
    undefined,
    IGetTestByIdResponse | IErrorResponse,
    undefined,
    IGetTestByIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await TestsService.getTestById(req.query);
      if (!result)
        return next(
          UserRequestError.NotFound(
            `TEST WITH ID ${req.query.id_test} NOT FOUND`
          )
        );

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getTestByThemeId: RequestHandler<
    undefined,
    IGetTestByThemeIdResponse | IErrorResponse,
    undefined,
    IGetTestByThemeIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await TestsService.getTestByThemeId(req.query);
      res.json(result);
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
      //@ts-ignore
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
