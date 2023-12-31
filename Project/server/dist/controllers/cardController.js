"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const cardService_1 = tslib_1.__importDefault(require("../services/cardService"));
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
class CardController {
}
_a = CardController;
CardController.getAllCards = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await cardService_1.default.getAllCards(req.query);
        res.json({
            cardsData: result,
            cursor: result[result.length - 1]?.id_card || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
CardController.getCardById = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await cardService_1.default.getCardById(req.query);
        if (!result)
            return next(userRequestError_1.default.NotFound(`CARD WITH ID ${req.query.id_card} NOT FOUND`));
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
CardController.getCardByThemeId = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await cardService_1.default.getCardByThemeId(req.query);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
CardController.createCard = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await cardService_1.default.createCard(req.body);
        res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
};
CardController.updateCardData = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await cardService_1.default.updateCardData(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
CardController.deleteCard = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        await cardService_1.default.deleteCard(req.body);
        res.json({ count: 1 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = CardController;
//# sourceMappingURL=cardController.js.map