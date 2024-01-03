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
        id_card: true,
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
      },
    });
  };

  //update
  static updateCardData = async ({
    cardId,
    word,
    correctAnswer,
    cardName,
  }: IUpdateCardRequest) => {
    const card = await prismaClient.cards.findUnique({
      where: { id_card: cardId },
      select: { id_card: true },
    });
    if (!card)
      throw UserRequestError.NotFound(`CARD WITH ID ${cardId} NOT FOUND`);

    return prismaClient.cards.update({
      where: { id_card: cardId },
      data: {
        word,
        correctAnswer,
        cardName,
      },
    });
  };

  //delete
  static deleteCard = async ({ cardId }: IDeleteCardRequest) => {
    return prismaClient.cards.deleteMany({
      where: { id_card: { in: cardId } },
    });
  };
}
