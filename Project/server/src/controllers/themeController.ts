import { RequestHandler } from "express";
import { IErrorResponse } from "../api/errorResponse";
import {
  ICreateThemeRequest,
  ICreateThemeResponse,
} from "../api/themes/reg/createTheme";
import {
  IDeleteThemeRequest,
  IDeleteThemeResponse,
} from "../api/themes/reg/deleteTheme";
import {
  IGetThemeByIdRequest,
  IGetThemeByIdResponse,
} from "../api/themes/reg/getThemeById";
import {
  IUpdateThemeRequest,
  IUpdateThemeResponse,
} from "../api/themes/reg/updateTheme";
import {
  IGetAllThemesRequest,
  IGetAllThemesResponse,
  IGetThemesResponse,
} from "../api/themes/reg/getAllThemes";
import {
  IGetBySubjectIdRequest,
  IGetBySubjectIdResponse,
} from "../api/themes/reg/getBySubjectId";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import ThemeService from "../services/themeService";

export default class ThemeController {
  //get
  static getThemeById: RequestHandler<
    undefined,
    IGetThemeByIdResponse | IErrorResponse,
    undefined,
    IGetThemeByIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.getThemeById(req.query);

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getBySubjectId: RequestHandler<
    undefined,
    IGetBySubjectIdResponse | IErrorResponse,
    undefined,
    IGetBySubjectIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.getBySubjectId(req.query);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getAllThemes: RequestHandler<
    undefined,
    IGetAllThemesResponse | IErrorResponse,
    undefined,
    IGetAllThemesRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.getAllThemes(req.query);
      res.json({
        themesData: result,
        cursor: result[result.length - 1]?.id_theme || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  static getThemesForCards: RequestHandler<
    undefined,
    IGetThemesResponse | IErrorResponse,
    undefined,
    IGetAllThemesRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.getThemesForCards(req.query);
      //@ts-ignore
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getThemesForTests: RequestHandler<
    undefined,
    IGetThemesResponse | IErrorResponse,
    undefined,
    IGetAllThemesRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.getThemesForTests(req.query);
      //@ts-ignore
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getThemesForOpenQuestions: RequestHandler<
    undefined,
    IGetThemesResponse | IErrorResponse,
    undefined,
    IGetAllThemesRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.getThemesForOpenQuestions(req.query);
      //@ts-ignore

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //create
  static createTheme: RequestHandler<
    undefined,
    ICreateThemeResponse | IErrorResponse,
    ICreateThemeRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.createTheme(req.body);
      //@ts-ignore
      res.status(201).json(result);
    } catch (e) {
      return next(e);
    }
  };

  //update
  static updateTheme: RequestHandler<
    undefined,
    IUpdateThemeResponse | IErrorResponse,
    IUpdateThemeRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await ThemeService.updateTheme(req.body);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //delete
  static deleteTheme: RequestHandler<
    undefined,
    IDeleteThemeResponse | IErrorResponse,
    IDeleteThemeRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      await ThemeService.deleteTheme(req.body);

      res.json({ count: 1 });
    } catch (e) {
      return next(e);
    }
  };
}
