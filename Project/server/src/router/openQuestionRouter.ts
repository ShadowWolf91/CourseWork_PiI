import { Router } from "express";
import { body, query } from "express-validator";
import OpenQuestionEndpoints from "../api/openQuestions/endpoints";
import OpenQuestionController from "../controllers/openQuestionController";
import OpenQuestionDataValidator from "../validators/openQuestionValidator";

const openQuestionRouter = Router();

openQuestionRouter.get(
  OpenQuestionEndpoints.GET_BY_ID,
  OpenQuestionDataValidator.id(query),
  OpenQuestionController.getOpenQuestionById
);

openQuestionRouter.get(
  OpenQuestionEndpoints.GET_ALL_OPEN_QUESTIONS,
  OpenQuestionDataValidator.title(query),
  OpenQuestionDataValidator.cursor(query),
  // OpenQuestionDataValidator.skip(query),
  // OpenQuestionDataValidator.take(query),
  OpenQuestionController.getAllOpenQuestions
);

openQuestionRouter.get(
  OpenQuestionEndpoints.GET_BY_THEME_ID,
  OpenQuestionDataValidator.theme_id(query),
  OpenQuestionController.getOpenQuestionByThemeId
);

openQuestionRouter.post(
  OpenQuestionEndpoints.CREATE,
  OpenQuestionDataValidator.openQuestionName(body, true, { max: 50 }),
  OpenQuestionDataValidator.question(body),
  OpenQuestionDataValidator.correctAnswer(body),
  OpenQuestionDataValidator.theme_id(body),
  OpenQuestionDataValidator.statistic_id(body),
  OpenQuestionController.createOpenQuestion
);

openQuestionRouter.patch(
  OpenQuestionEndpoints.UPDATE,
  OpenQuestionDataValidator.openQuestionId(body),
  OpenQuestionDataValidator.openQuestionName(body, true, { max: 50 }),
  OpenQuestionDataValidator.question(body),
  OpenQuestionDataValidator.correctAnswer(body),
  OpenQuestionDataValidator.theme_id(body),
  OpenQuestionDataValidator.statistic_id(body),
  OpenQuestionController.updateOpenQuestionData
);

openQuestionRouter.delete(
  OpenQuestionEndpoints.DELETE,
  OpenQuestionDataValidator.openQuestionId(body),
  OpenQuestionController.deleteOpenQuestions
);

export default openQuestionRouter;
