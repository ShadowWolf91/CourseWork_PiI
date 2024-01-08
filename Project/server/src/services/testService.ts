import { ICreateTestRequest } from "../api/tests/reg/createTest";
import { IDeleteTestRequest } from "../api/tests/reg/deleteTest";
import { IUpdateTestRequest } from "../api/tests/reg/updateTest";
import { IGetAllTestsRequest } from "../api/tests/reg/getAllTests";
import { IGetTestByIdRequest } from "../api/tests/reg/getTestById";
import {
  IGetTestByThemeIdRequest,
  IGetTestByThemeIdResponse,
} from "../api/tests/reg/getByThemeId";
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
      skip: skip,
      take: take,
      cursor: cursor ? { id_test: cursor } : undefined,
      where: { testName: { contains: testName, mode: "insensitive" } },
    });

  static getTestById = async ({ id_test }: IGetTestByIdRequest) =>
    prismaClient.tests.findUnique({
      where: { id_test: +id_test },
    });

  static getTestByThemeId = async ({
    theme_id,
  }: IGetTestByThemeIdRequest): Promise<IGetTestByThemeIdResponse> => {
    const test = await prismaClient.tests.findMany({
      where: { theme_id: +theme_id },
    });
    if (!test)
      throw UserRequestError.NotFound(
        `THEME WITH THEME_ID ${theme_id} NOT FOUND`
      );

    return {
      theme_id,
      test,
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
      },
    });
  };

  //update
  static updateTestData = async ({
    testId,
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
      where: { id_test: testId },
      select: { id_test: true },
    });
    if (!test)
      throw UserRequestError.NotFound(`TEST WITH ID ${testId} NOT FOUND`);

    return prismaClient.tests.update({
      where: { id_test: testId },
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

  //delete
  static deleteTest = async ({ testId }: IDeleteTestRequest) => {
    return prismaClient.tests.deleteMany({
      where: { id_test: { in: testId } },
    });
  };
}
