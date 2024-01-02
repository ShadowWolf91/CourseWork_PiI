import { RequestHandler } from "express";
import { IErrorResponse } from "../api/errorResponse";
import {
  ICreateOpenQuestionRequest,
  ICreateOpenQuestionResponse,
} from "../api/openQuestions/reg/createOpenQuestion";
import {
  IDeleteOpenQuestionRequest,
  IDeleteOpenQuestionResponse,
} from "../api/openQuestions/reg/deleteOpenQuestion";
import {
  IUpdateOpenQuestionRequest,
  IUpdateOpenQuestionResponse,
} from "../api/openQuestions/reg/updateOpenQuestion";
import {
  IGetAllOpenQuestionsRequest,
  IGetAllOpenQuestionsResponse,
} from "../api/openQuestions/reg/getAllOpenQuestions";
import {
  IGetOpenQuestionByIdRequest,
  IGetOpenQuestionByIdResponse,
} from "../api/openQuestions/reg/getOpenQuestionById";
import {
  IGetOpenQuestionByThemeIdResponse,
  IGetOpenQuestionByThemeIdRequest,
} from "api/openQuestions/reg/getByThemeId";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import OpenQuestionsService from "../services/openQuestionService";
import UserRequestError from "../errors/userRequestError";

export default class OpenQuestionController {
  //get
  static getAllOpenQuestions: RequestHandler<
    undefined,
    IGetAllOpenQuestionsResponse | IErrorResponse,
    undefined,
    IGetAllOpenQuestionsRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await OpenQuestionsService.getAllOpenQuestions(req.query);
      res.json({
        openQuestionsData: result,
        cursor: result[result.length - 1]?.id_openQuestion || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  static getOpenQuestionById: RequestHandler<
    undefined,
    IGetOpenQuestionByIdResponse | IErrorResponse,
    undefined,
    IGetOpenQuestionByIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await OpenQuestionsService.getOpenQuestionById(req.query);
      if (!result)
        return next(
          UserRequestError.NotFound(
            `OPEN QUESTION WITH ID ${req.query.id_openQuestion} NOT FOUND`
          )
        );

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getOpenQuestionByThemeId: RequestHandler<
    undefined,
    IGetOpenQuestionByThemeIdResponse | IErrorResponse,
    undefined,
    IGetOpenQuestionByThemeIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await OpenQuestionsService.getOpenQuestionByThemeId(
        req.query
      );
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //create
  static createOpenQuestion: RequestHandler<
    undefined,
    ICreateOpenQuestionResponse | IErrorResponse,
    ICreateOpenQuestionRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await OpenQuestionsService.createOpenQuestion(req.body);
      //@ts-ignore

      res.status(201).json(result);
    } catch (e) {
      return next(e);
    }
  };

  //update
  static updateOpenQuestionData: RequestHandler<
    undefined,
    IUpdateOpenQuestionResponse | IErrorResponse,
    IUpdateOpenQuestionRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await OpenQuestionsService.updateOpenQuestionData(
        req.body
      );
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //delete
  static deleteOpenQuestions: RequestHandler<
    undefined,
    IDeleteOpenQuestionResponse | IErrorResponse,
    IDeleteOpenQuestionRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      await OpenQuestionsService.deleteOpenQuestions(req.body);

      res.json({ count: 1 });
    } catch (e) {
      return next(e);
    }
  };
}
