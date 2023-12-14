import { Router } from 'express'
import CardEndpoints from '../api/cards/endpoints'
import CardController from '../controllers/cardController'

const cardRouter = Router()

// cardRouter.get(
// 	CardEndpoints.GET_BY_ID,
// 	CardController.getSubjectBySubId
// )

cardRouter.get(
	CardEndpoints.GET_ALL_CARDS,
	CardController.getAllCards
)

cardRouter.post(
	CardEndpoints.CREATE,
	CardController.createCard
)

cardRouter.patch(
	CardEndpoints.UPDATE,
	CardController.updateCardData
)

cardRouter.delete(
	CardEndpoints.DELETE,
	CardController.deleteCard
)

export default cardRouter