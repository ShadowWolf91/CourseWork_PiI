import { ICreateCardRequest } from '../api/cards/reg/createCard'
import { IDeleteCardRequest } from '../api/cards/reg/deleteCard'
import { IUpdateCardRequest } from '../api/cards/reg/updateCard'
import { IGetAllCardsRequest } from '../api/cards/reg/getAllCards'
import UserRequestError from '../errors/userRequestError'
import prismaClient from '../prismaClient'

export default class CardService {
	//get
	static getAllCards = async ({
		cursor,
		cardName,
		skip,
		take,
	}: IGetAllCardsRequest) =>
		prismaClient.cards.findMany({
			skip,
			take,
			cursor: cursor ? { id_card: cursor } : undefined,
			where: { cardName: { contains: cardName, mode: 'insensitive' } },
		})

	//create
	static createCard = async ({
        theme_id,
        word,
        correctAnswer,
        timeAmount,
        cardName,
	}: ICreateCardRequest) => {
		const card = await prismaClient.cards.findUnique({
			where: { cardName },
			select: { id_card: true },
		})

        if (!card)
        throw UserRequestError.NotFound(`CARD WITH NAME ${cardName} CREATED`)

		return prismaClient.cards.create({
			data: {
                theme_id,
                word,
                correctAnswer,
                timeAmount,
                cardName,
			},
		})
	}

	//update
	static updateCardData = async ({
		id_card,
		theme_id,
        word,
        correctAnswer,
        timeAmount,
        cardName,
	}: IUpdateCardRequest) => {
		const card = await prismaClient.cards.findUnique({
			where: { id_card },
			select: { id_card: true },
		})
		if (!card)
			throw UserRequestError.NotFound(`CARD WITH ID ${id_card} NOT FOUND`)

		return prismaClient.cards.update({
			where: { id_card },
			data: {
                id_card,
                theme_id,
                word,
                correctAnswer,
                timeAmount,
                cardName,
			},
		})
	}

	//delete
	static deleteCard = async ({ id_card }: IDeleteCardRequest) => {
		const card = await prismaClient.cards.findUnique({
			where: { id_card: id_card },
			select: { id_card: true },
		})

		if (!card)
			throw UserRequestError.NotFound(
				`CARD WITH ID ${id_card} NOT FOUND`
			)

		return prismaClient.cards.delete({
			where: { id_card: id_card },
		})
	}
}