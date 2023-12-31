import { ICreateOpenQuestionRequest } from "../api/openQuestions/reg/createOpenQuestion";
import { IDeleteOpenQuestionRequest } from "../api/openQuestions/reg/deleteOpenQuestion";
import { IUpdateOpenQuestionRequest } from "../api/openQuestions/reg/updateOpenQuestion";
import { IGetAllOpenQuestionsRequest } from "../api/openQuestions/reg/getAllOpenQuestions";
import { IGetOpenQuestionByIdRequest } from "../api/openQuestions/reg/getOpenQuestionById";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";
import {
  IGetOpenQuestionByThemeIdRequest,
  IGetOpenQuestionByThemeIdResponse,
} from "api/openQuestions/reg/getByThemeId";

export default class OpenQuestionsService {
  //get
  static getAllOpenQuestions = async ({
    cursor,
    openQuestionName,
    skip,
    take,
  }: IGetAllOpenQuestionsRequest) =>
    prismaClient.openQuestions.findMany({
      skip: skip,
      take: take,
      cursor: cursor ? { id_openQuestion: cursor } : undefined,
      where: {
        openQuestionName: { contains: openQuestionName, mode: "insensitive" },
      },
    });

  static getOpenQuestionById = async ({
    id_openQuestion,
  }: IGetOpenQuestionByIdRequest) =>
    prismaClient.openQuestions.findUnique({
      where: { id_openQuestion: +id_openQuestion },
    });

  static getOpenQuestionByThemeId = async ({
    theme_id,
  }: IGetOpenQuestionByThemeIdRequest): Promise<IGetOpenQuestionByThemeIdResponse> => {
    const openQuestion = await prismaClient.openQuestions.findMany({
      select: {
        question: true,
        correctAnswer: true,
      },
      where: { theme_id: +theme_id },
    });
    if (!openQuestion)
      throw UserRequestError.NotFound(
        `THEME WITH THEME_ID ${theme_id} NOT FOUND`
      );

    return {
      theme_id,
      openQuestion,
    };
  };

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
      select: { id_openQuestion: true },
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
    id_openQuestion,
    theme_id,
    question,
    correctAnswer,
    openQuestionName,
    statistic_id,
  }: IUpdateOpenQuestionRequest) => {
    const openQuestion = await prismaClient.openQuestions.findUnique({
      where: { id_openQuestion },
      select: { id_openQuestion: true },
    });
    if (!openQuestion)
      throw UserRequestError.NotFound(
        `OPEN QUESTION WITH ID ${id_openQuestion} NOT FOUND`
      );

    return prismaClient.openQuestions.update({
      where: { id_openQuestion },
      data: {
        id_openQuestion,
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
    id_openQuestion,
  }: IDeleteOpenQuestionRequest) => {
    const openQuestion = await prismaClient.openQuestions.findUnique({
      where: { id_openQuestion: id_openQuestion },
      select: { id_openQuestion: true },
    });

    if (!openQuestion)
      throw UserRequestError.NotFound(
        `OPEN QUESTION WITH ID ${id_openQuestion} NOT FOUND`
      );

    return prismaClient.openQuestions.delete({
      where: { id_openQuestion: id_openQuestion },
    });
  };
}
