import { ICreateTestRequest } from "../api/tests/reg/createTest";
import { IDeleteTestRequest } from "../api/tests/reg/deleteTest";
import { IUpdateTestRequest } from "../api/tests/reg/updateTest";
import { IGetAllTestsRequest } from "../api/tests/reg/getAllTests";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class TestsService {
  //get
  static getAllTests = async ({}: IGetAllTestsRequest) => {
    const test = await prismaClient.tests.findMany({});
    return {
      ...test,
    };
  };

  //create
  static createTest = async ({
    theme_id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    testName,
  }: ICreateTestRequest) => {
    const test = await prismaClient.tests.findUnique({
      where: { testName },
      select: { id_test: true },
    });

    if (!test)
      throw UserRequestError.NotFound(`TEST WITH NAME ${question} CREATED`);

    return prismaClient.tests.create({
      data: {
        theme_id,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        testName,
      },
    });
  };

  //update
  static updateTestData = async ({
    id_test,
    theme_id,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    testName,
  }: IUpdateTestRequest) => {
    const test = await prismaClient.tests.findUnique({
      where: { id_test },
      select: { id_test: true },
    });
    if (!test)
      throw UserRequestError.NotFound(`TEST WITH ID ${id_test} NOT FOUND`);

    return prismaClient.tests.update({
      where: { id_test },
      data: {
        id_test,
        theme_id,
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
        testName,
      },
    });
  };

  //delete
  static deleteTests = async ({ id_test }: IDeleteTestRequest) => {
    const test = await prismaClient.tests.findUnique({
      where: { id_test: id_test },
      select: { id_test: true },
    });

    if (!test)
      throw UserRequestError.NotFound(`TEST WITH ID ${id_test} NOT FOUND`);

    return prismaClient.tests.delete({
      where: { id_test: id_test },
    });
  };
}
