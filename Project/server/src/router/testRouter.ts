import { Router } from "express";
import TestEndpoints from "../api/tests/endpoints";
import TestController from "../controllers/testController";

const TestRouter = Router();

// cardRouter.get(
// 	CardEndpoints.GET_BY_ID,
// 	CardController.getSubjectBySubId
// )

TestRouter.get(TestEndpoints.GET_ALL_TESTS, TestController.getAllOpenQuestions);

TestRouter.post(TestEndpoints.CREATE, TestController.createOpenQuestion);

TestRouter.patch(TestEndpoints.UPDATE, TestController.updateOpenQuestionData);

TestRouter.delete(TestEndpoints.DELETE, TestController.deleteOpenQuestions);

export default TestRouter;
