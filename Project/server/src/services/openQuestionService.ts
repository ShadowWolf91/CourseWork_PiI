import { ICreateOpenQuestionRequest } from "../api/openQuestions/reg/createOpenQuestion";
import { IDeleteOpenQuestionRequest } from "../api/openQuestions/reg/deleteOpenQuestion";
import { IUpdateOpenQuestionRequest } from "../api/openQuestions/reg/updateOpenQuestion";
import { IGetAllOpenQuestionsRequest } from "../api/openQuestions/reg/getAllOpenQuestions";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class OpenQuestionsService {
  //get
  static getAllOpenQuestions = async ({
    cursor,
    openQuestionName,
    skip,
    take,
  }: IGetAllOpenQuestionsRequest) =>
    prismaClient.openQuestions.findMany({
      skip,
      take,
      cursor: cursor ? { id_openQustion: cursor } : undefined,
      where: {
        openQuestionName: { contains: openQuestionName, mode: "insensitive" },
      },
    });

  //create
  static createOpenQuestion = async ({
    theme_id,
    question,
    correctAnswer,
    openQuestionName,
    statistic_id,
  }: ICreateOpenQuestionRequest) => {
    const openQuestion = await prismaClient.openQuestions.findUnique({
      where: { openQuestionName },
      select: { id_openQustion: true },
    });

    if (openQuestion)
      throw UserRequestError.NotFound(
        `OPEN QUESTION WITH NAME ${openQuestionName} NOT CREATED`
      );

    return prismaClient.openQuestions.create({
      data: {
        theme_id,
        question,
        correctAnswer,
        openQuestionName,
        statistic_id,
      },
    });
  };

  //update
  static updateOpenQuestionData = async ({
    id_openQustion,
    theme_id,
    question,
    correctAnswer,
    openQuestionName,
    statistic_id,
  }: IUpdateOpenQuestionRequest) => {
    const openQuestion = await prismaClient.openQuestions.findUnique({
      where: { id_openQustion },
      select: { id_openQustion: true },
    });
    if (!openQuestion)
      throw UserRequestError.NotFound(
        `OPEN QUESTION WITH ID ${id_openQustion} NOT FOUND`
      );

    return prismaClient.openQuestions.update({
      where: { id_openQustion },
      data: {
        id_openQustion,
        theme_id,
        question,
        correctAnswer,
        openQuestionName,
        statistic_id,
      },
    });
  };

  //delete
  static deleteOpenQuestions = async ({
    id_openQustion,
  }: IDeleteOpenQuestionRequest) => {
    const openQuestion = await prismaClient.openQuestions.findUnique({
      where: { id_openQustion: id_openQustion },
      select: { id_openQustion: true },
    });

    if (!openQuestion)
      throw UserRequestError.NotFound(
        `OPEN QUESTION WITH ID ${id_openQustion} NOT FOUND`
      );

    return prismaClient.openQuestions.delete({
      where: { id_openQustion: id_openQustion },
    });
  };
}
