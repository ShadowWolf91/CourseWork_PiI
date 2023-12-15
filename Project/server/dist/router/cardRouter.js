"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/cards/endpoints"));
const cardController_1 = tslib_1.__importDefault(require("../controllers/cardController"));
const cardRouter = (0, express_1.Router)();
cardRouter.get(endpoints_1.default.GET_ALL_CARDS, cardController_1.default.getAllCards);
cardRouter.post(endpoints_1.default.CREATE, cardController_1.default.createCard);
cardRouter.patch(endpoints_1.default.UPDATE, cardController_1.default.updateCardData);
cardRouter.delete(endpoints_1.default.DELETE, cardController_1.default.deleteCard);
exports.default = cardRouter;
//# sourceMappingURL=cardRouter.js.map