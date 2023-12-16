import { ICreateTestRequest } from "../api/tests/reg/createTest";
import { IDeleteTestRequest } from "../api/tests/reg/deleteTest";
import { IUpdateTestRequest } from "../api/tests/reg/updateTest";
import { IGetAllTestsRequest } from "../api/tests/reg/getAllTests";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class TestsService {
  //get
  static getAllTests = async ({
    cursor,
    testName,
    skip,
    take,
  }: IGetAllTestsRequest) =>
    prismaClient.tests.findMany({
      skip,
      take,
      cursor: cursor ? { id_test: cursor } : undefined,
      where: { testName: { contains: testName, mode: "insensitive" } },
    });

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
    statistic_id,
  }: ICreateTestRequest) => {
    const test = await prismaClient.tests.findUnique({
      where: { testName },
      select: { id_test: true },
    });

    if (test)
      throw UserRequestError.NotFound(`TEST WITH NAME ${question} NOT CREATED`);

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
        statistic_id,
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
    statistic_id,
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
        statistic_id,
      },
    });
  };

  //delete
  static deleteTest = async ({ id_test }: IDeleteTestRequest) => {
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
