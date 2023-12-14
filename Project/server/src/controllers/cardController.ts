import { RequestHandler } from 'express'
import { IErrorResponse } from '../api/errorResponse'
import {
	ICreateCardRequest,
	ICreateCardResponse,
} from '../api/cards/reg/createCard'
import {
	IDeleteCardRequest,
	IDeleteCardResponse,
} from '../api/cards/reg/deleteCard'
import {
	IUpdateCardRequest,
	IUpdateCardResponse,
} from '../api/cards/reg/updateCard'
import {
	IGetAllCardsRequest,
	IGetAllCardsResponse,
} from '../api/cards/reg/getAllCards'
import callUnprocessableEntity from '../extra/callUnprocessableEntity'
import getValidationResult from '../extra/getValidationResult'
import CardService from '../services/cardService'

export default class CardController {
	//get
	static getAllCards: RequestHandler<
	undefined,
	IGetAllCardsResponse | IErrorResponse,
	undefined,
	IGetAllCardsRequest
> = async (req, res, next) => {
	const errorData = getValidationResult(req)
	if (errorData) return callUnprocessableEntity(next, errorData)

	try {
		const result = await CardService.getAllCards(req.query)
		res.json({
			cardsData: result,
			cursor: result[result.length - 1]?.id_card || null,
		})
	} catch (e) {
		return next(e)
	}
}

	//create
	static createCard: RequestHandler<
		undefined,
		ICreateCardResponse | IErrorResponse,
		ICreateCardRequest
	> = async (req, res, next) => {
		const errorData = getValidationResult(req)
		if (errorData) return callUnprocessableEntity(next, errorData)

		try {
			const result = await CardService.createCard(req.body)
			res.status(201).json(result)
		} catch (e) {
			return next(e)
		}
	}

	//update
	static updateCardData: RequestHandler<
		undefined,
		IUpdateCardResponse | IErrorResponse,
		IUpdateCardRequest
	> = async (req, res, next) => {
		const errorData = getValidationResult(req)
		if (errorData) return callUnprocessableEntity(next, errorData)

		try {
			const result = await CardService.updateCardData(req.body)
			res.json(result)
		} catch (e) {
			return next(e)
		}
	}

	//delete
	static deleteCard: RequestHandler<
		undefined,
		IDeleteCardResponse | IErrorResponse,
		IDeleteCardRequest
	> = async (req, res, next) => {
		const errorData = getValidationResult(req)
		if (errorData) return callUnprocessableEntity(next, errorData)

		try {
			await CardService.deleteCard(req.body)

			res.json({ count: 1 })
		} catch (e) {
			return next(e)
		}
	}
}