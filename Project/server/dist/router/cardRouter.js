"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/cards/endpoints"));
const cardController_1 = tslib_1.__importDefault(require("../controllers/cardController"));
const cardValidator_1 = tslib_1.__importDefault(require("../validators/cardValidator"));
const cardRouter = (0, express_1.Router)();
cardRouter.get(endpoints_1.default.GET_BY_ID, cardValidator_1.default.id(express_validator_1.query), cardController_1.default.getCardById);
cardRouter.get(endpoints_1.default.GET_ALL_CARDS, cardValidator_1.default.cardName(express_validator_1.query), cardValidator_1.default.cursor(express_validator_1.query), cardValidator_1.default.skip(express_validator_1.query), cardValidator_1.default.take(express_validator_1.query), cardController_1.default.getAllCards);
cardRouter.post(endpoints_1.default.CREATE, cardValidator_1.default.cardName(express_validator_1.body, true, { max: 50 }), cardValidator_1.default.word(express_validator_1.body), cardValidator_1.default.correctAnswer(express_validator_1.body), cardValidator_1.default.theme_id(express_validator_1.body), cardValidator_1.default.statistic_id(express_validator_1.body), cardController_1.default.createCard);
cardRouter.patch(endpoints_1.default.UPDATE, cardValidator_1.default.cardId(express_validator_1.body), cardValidator_1.default.cardName(express_validator_1.body, true, { max: 50 }), cardValidator_1.default.word(express_validator_1.body), cardValidator_1.default.correctAnswer(express_validator_1.body), cardValidator_1.default.theme_id(express_validator_1.body), cardValidator_1.default.statistic_id(express_validator_1.body), cardController_1.default.updateCardData);
cardRouter.delete(endpoints_1.default.DELETE, cardValidator_1.default.cardId(express_validator_1.body), cardController_1.default.deleteCard);
exports.default = cardRouter;
//# sourceMappingURL=cardRouter.js.map