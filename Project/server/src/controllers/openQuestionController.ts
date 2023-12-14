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
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import OpenQuestionsService from "../services/openQuestionService";

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
        cursor: result[result.length - 1]?.id_openQustion || null,
      });
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
