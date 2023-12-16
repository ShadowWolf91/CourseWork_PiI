import { Router } from "express";
import OpenQuestionEndpoints from "../api/openQuestions/endpoints";
import OpenQuestionController from "../controllers/openQuestionController";

const openQuestionRouter = Router();

openQuestionRouter.get(
  OpenQuestionEndpoints.GET_BY_ID,
  OpenQuestionController.getOpenQuestionById
);

openQuestionRouter.get(
  OpenQuestionEndpoints.GET_ALL_OPEN_QUESTIONS,
  OpenQuestionController.getAllOpenQuestions
);

openQuestionRouter.post(
  OpenQuestionEndpoints.CREATE,
  OpenQuestionController.createOpenQuestion
);

openQuestionRouter.patch(
  OpenQuestionEndpoints.UPDATE,
  OpenQuestionController.updateOpenQuestionData
);

openQuestionRouter.delete(
  OpenQuestionEndpoints.DELETE,
  OpenQuestionController.deleteOpenQuestions
);

export default openQuestionRouter;
