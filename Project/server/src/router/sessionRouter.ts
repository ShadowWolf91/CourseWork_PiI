import { Router } from "express";
// import { body, query } from "express-validator";
import SessionEndpoints from "../api/sessions/endpoints";
import SessionController from "../controllers/sessionController";
// import SubjectDataValidator from "../validators/subjectValidator";

const sessionRouter = Router();

sessionRouter.post(
  SessionEndpoints.CREATE,
  //   SubjectDataValidator.subjectName(body, true, { max: 50 }),
  // SubjectDataValidator.subjectId(body),
  SessionController.createSession
);

export default sessionRouter;
