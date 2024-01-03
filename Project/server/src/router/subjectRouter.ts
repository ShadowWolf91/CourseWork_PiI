import { Router } from "express";
import { body, query } from "express-validator";
import SubjectEndpoints from "../api/subjects/endpoints";
import SubjectController from "../controllers/subjectController";
import SubjectDataValidator from "../validators/subjectValidator";

const subjectRouter = Router();

subjectRouter.get(
  SubjectEndpoints.GET_BY_ID,
  SubjectDataValidator.id(query),
  SubjectController.getSubjectBySubId
);

subjectRouter.get(
  SubjectEndpoints.GET_ALL_SUBJECTS,
  SubjectDataValidator.title(query),
  SubjectDataValidator.cursor(query),
  SubjectDataValidator.skip(query),
  SubjectDataValidator.take(query),
  SubjectController.getAllSubjects
);

subjectRouter.get(SubjectEndpoints.GET_SUBJECTS, SubjectController.getSubjects);

subjectRouter.post(
  SubjectEndpoints.CREATE,
  SubjectDataValidator.subjectName(body, true, { max: 50 }),
  // SubjectDataValidator.subjectId(body),
  SubjectController.createSubject
);

subjectRouter.patch(
  SubjectEndpoints.UPDATE,
  // SubjectDataValidator.subjectId(body),
  SubjectDataValidator.subjectName(body, true, { max: 50 }),
  SubjectController.updateSubjectData
);

subjectRouter.delete(
  SubjectEndpoints.DELETE,
  SubjectDataValidator.subjectId(body),
  SubjectController.deleteSubject
);

export default subjectRouter;
