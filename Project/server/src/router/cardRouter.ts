import { Router } from "express";
import { body, query } from "express-validator";
import CardEndpoints from "../api/cards/endpoints";
import CardController from "../controllers/cardController";
import CardDataValidator from "../validators/cardValidator";

const cardRouter = Router();

cardRouter.get(
  CardEndpoints.GET_BY_ID,
  CardDataValidator.id(query),
  CardController.getCardById
);

cardRouter.get(
  CardEndpoints.GET_ALL_CARDS,
  CardDataValidator.cardName(query),
  CardDataValidator.cursor(query),
  CardDataValidator.skip(query),
  CardDataValidator.take(query),
  CardController.getAllCards
);

cardRouter.get(
  CardEndpoints.GET_BY_THEME_ID,
  CardDataValidator.theme_id(query),
  CardController.getCardByThemeId
);

cardRouter.post(
  CardEndpoints.CREATE,
  CardDataValidator.cardName(body, true, { max: 50 }),
  CardDataValidator.word(body),
  CardDataValidator.correctAnswer(body),
  CardDataValidator.theme_id(body),
  CardController.createCard
);

cardRouter.patch(
  CardEndpoints.UPDATE,
  CardDataValidator.cardId(body),
  CardDataValidator.cardName(body, true, { max: 50 }),
  CardDataValidator.word(body),
  CardDataValidator.correctAnswer(body),
  // CardDataValidator.theme_id(body),
  CardController.updateCardData
);

cardRouter.delete(
  CardEndpoints.DELETE,
  CardDataValidator.cardId(body),
  CardController.deleteCard
);

export default cardRouter;
