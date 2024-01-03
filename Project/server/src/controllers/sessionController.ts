import { IErrorResponse } from "../api/errorResponse";
import {
  ICreateSessionRequest,
  ICreateSessionResponse,
} from "../api/sessions/reg/createSession";
import { RequestHandler } from "express";
import SessionService from "../services/sessionService";

export default class SessionController {
  static createSession: RequestHandler<
    undefined,
    ICreateSessionResponse | IErrorResponse,
    ICreateSessionRequest
  > = async (req, res, next) => {
    try {
      const result = await SessionService.createSession(req.body);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };
}
