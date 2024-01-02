import { ICreateCardRequest } from "../api/cards/reg/createCard";
import { IDeleteCardRequest } from "../api/cards/reg/deleteCard";
import { IUpdateCardRequest } from "../api/cards/reg/updateCard";
import { IGetAllCardsRequest } from "../api/cards/reg/getAllCards";
import { IGetCardByIdRequest } from "../api/cards/reg/getCardById";
import {
  IGetCardByThemeIdRequest,
  IGetCardByThemeIdResponse,
} from "api/cards/reg/getByThemeId";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class CardService {
  //get
  static getAllCards = async ({
    cursor,
    cardName,
    skip,
    take,
  }: IGetAllCardsRequest) =>
    prismaClient.cards.findMany({
      skip: skip,
      take: take,
      cursor: cursor ? { id_card: cursor } : undefined,
      where: { cardName: { contains: cardName, mode: "insensitive" } },
    });

  static getCardById = async ({ id_card }: IGetCardByIdRequest) =>
    prismaClient.cards.findUnique({
      where: { id_card: +id_card },
    });

  static getCardByThemeId = async ({
    theme_id,
  }: IGetCardByThemeIdRequest): Promise<IGetCardByThemeIdResponse> => {
    const card = await prismaClient.cards.findMany({
      select: {
        word: true,
        correctAnswer: true,
      },
      where: { theme_id: +theme_id },
    });
    if (!card)
      throw UserRequestError.NotFound(
        `THEME WITH THEME_ID ${theme_id} NOT FOUND`
      );

    return {
      theme_id,
      card,
    };
  };

  //create
  static createCard = async ({
    theme_id,
    word,
    correctAnswer,
    cardName,
    statistic_id,
  }: ICreateCardRequest) => {
    const card = await prismaClient.cards.findUnique({
      where: { cardName },
      select: { id_card: true },
    });

    if (card)
      throw UserRequestError.NotFound(`CARD WITH NAME ${cardName} NOT CREATED`);

    return prismaClient.cards.create({
      data: {
        theme_id,
        word,
        correctAnswer,
        cardName,
        statistic_id,
      },
    });
  };

  //update
  static updateCardData = async ({
    id_card,
    theme_id,
    word,
    correctAnswer,
    cardName,
    statistic_id,
  }: IUpdateCardRequest) => {
    const card = await prismaClient.cards.findUnique({
      where: { id_card },
      select: { id_card: true },
    });
    if (!card)
      throw UserRequestError.NotFound(`CARD WITH ID ${id_card} NOT FOUND`);

    return prismaClient.cards.update({
      where: { id_card },
      data: {
        id_card,
        theme_id,
        word,
        correctAnswer,
        cardName,
        statistic_id,
      },
    });
  };

  //delete
  static deleteCard = async ({ id_card }: IDeleteCardRequest) => {
    const card = await prismaClient.cards.findUnique({
      where: { id_card: id_card },
      select: { id_card: true },
    });

    if (!card)
      throw UserRequestError.NotFound(`CARD WITH ID ${id_card} NOT FOUND`);

    return prismaClient.cards.delete({
      where: { id_card: id_card },
    });
  };
}
