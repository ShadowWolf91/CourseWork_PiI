import { RequestHandler } from "express";
import { IErrorResponse } from "../api/errorResponse";
import {
  ICreateSubjectRequest,
  ICreateSubjectResponse,
} from "../api/subjects/reg/createSubject";
import {
  IDeleteSubjectRequest,
  IDeleteSubjectResponse,
} from "../api/subjects/reg/deleteSubject";
import {
  IGetSubjectBySubIdRequest,
  IGetSubjectBySubIdResponse,
} from "../api/subjects/reg/getSubjectBySubId";
import {
  IUpdateSubjectRequest,
  IUpdateSubjectResponse,
} from "../api/subjects/reg/updateSubject";
import {
  IGetAllSubjectsRequest,
  IGetAllSubjectsResponse,
} from "../api/subjects/reg/getAllSubjects";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import SubjectService from "../services/subjectService";

export default class SubjectController {
  //get
  static getSubjectBySubId: RequestHandler<
    undefined,
    IGetSubjectBySubIdResponse | IErrorResponse,
    undefined,
    IGetSubjectBySubIdRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await SubjectService.getSubjectBySubId(req.query);

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getAllSubjects: RequestHandler<
    undefined,
    IGetAllSubjectsResponse | IErrorResponse,
    undefined,
    IGetAllSubjectsRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await SubjectService.getAllSubjects(req.query);
      res.json({
        subjectsData: result,
        cursor: result[result.length - 1]?.id_subject || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  //create
  static createSubject: RequestHandler<
    undefined,
    ICreateSubjectResponse | IErrorResponse,
    ICreateSubjectRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await SubjectService.createSubject(req.body);
      res.status(201).json({
        ...result,
      });
    } catch (e) {
      return next(e);
    }
  };

  //update
  static updateSubjectData: RequestHandler<
    undefined,
    IUpdateSubjectResponse | IErrorResponse,
    IUpdateSubjectRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await SubjectService.updateSubject(req.body);
      res.json({
        ...result,
      });
    } catch (e) {
      return next(e);
    }
  };

  //delete
  static deleteSubject: RequestHandler<
    undefined,
    IDeleteSubjectResponse | IErrorResponse,
    IDeleteSubjectRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      await SubjectService.deleteSubject(req.body);

      res.json({ count: 1 });
    } catch (e) {
      return next(e);
    }
  };
}
