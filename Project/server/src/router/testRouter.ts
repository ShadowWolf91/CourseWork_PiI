import { Router } from "express";
import { body, query } from "express-validator";
import TestEndpoints from "../api/tests/endpoints";
import TestController from "../controllers/testController";
import TestDataValidator from "../validators/testValidator";

const TestRouter = Router();

TestRouter.get(
  TestEndpoints.GET_BY_ID,
  TestDataValidator.id(query),
  TestController.getTestById
);

TestRouter.get(
  TestEndpoints.GET_ALL_TESTS,
  TestDataValidator.title(query),
  TestDataValidator.cursor(query),
  // TestDataValidator.skip(query),
  // TestDataValidator.take(query),
  TestController.getAllTests
);

TestRouter.get(
  TestEndpoints.GET_BY_THEME_ID,
  TestDataValidator.theme_id(query),
  TestController.getTestByThemeId
);

TestRouter.post(
  TestEndpoints.CREATE,
  TestDataValidator.testName(body, true, { max: 50 }),
  TestDataValidator.question(body),
  TestDataValidator.optionA(body),
  TestDataValidator.optionB(body),
  TestDataValidator.optionC(body),
  TestDataValidator.optionD(body),
  TestDataValidator.correctAnswer(body),
  TestDataValidator.theme_id(body),
  TestDataValidator.statistic_id(body),
  TestController.createTest
);

TestRouter.patch(
  TestEndpoints.UPDATE,
  TestDataValidator.testId(body),
  TestDataValidator.testName(body, true, { max: 50 }),
  TestDataValidator.question(body),
  TestDataValidator.optionA(body),
  TestDataValidator.optionB(body),
  TestDataValidator.optionC(body),
  TestDataValidator.optionD(body),
  TestDataValidator.correctAnswer(body),
  TestDataValidator.theme_id(body),
  TestDataValidator.statistic_id(body),
  TestController.updateTestData
);

TestRouter.delete(
  TestEndpoints.DELETE,
  TestDataValidator.testId(body),
  TestController.deleteTest
);

export default TestRouter;
