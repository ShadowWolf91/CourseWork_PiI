import { Router } from "express";
import TestEndpoints from "../api/tests/endpoints";
import TestController from "../controllers/testController";

const TestRouter = Router();

// cardRouter.get(
// 	CardEndpoints.GET_BY_ID,
// 	CardController.getSubjectBySubId
// )

TestRouter.get(TestEndpoints.GET_ALL_TESTS, TestController.getAllTests);

TestRouter.post(TestEndpoints.CREATE, TestController.createTest);

TestRouter.patch(TestEndpoints.UPDATE, TestController.updateTestData);

TestRouter.delete(TestEndpoints.DELETE, TestController.deleteTest);

export default TestRouter;
