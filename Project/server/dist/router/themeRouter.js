"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/themes/endpoints"));
const themeController_1 = tslib_1.__importDefault(require("../controllers/themeController"));
const themeValidator_1 = tslib_1.__importDefault(require("../validators/themeValidator"));
const themeRouter = (0, express_1.Router)();
themeRouter.get(endpoints_1.default.GET_BY_ID, themeValidator_1.default.id(express_validator_1.query), themeController_1.default.getThemeById);
themeRouter.get(endpoints_1.default.GET_BY_SUBJECT_ID, themeValidator_1.default.subject_id(express_validator_1.query), themeController_1.default.getBySubjectId);
themeRouter.get(endpoints_1.default.GET_ALL_THEMES, themeValidator_1.default.title(express_validator_1.query), themeValidator_1.default.cursor(express_validator_1.query), themeController_1.default.getAllThemes);
themeRouter.post(endpoints_1.default.CREATE, themeValidator_1.default.themeName(express_validator_1.body, true, { max: 50 }), themeValidator_1.default.subject_id(express_validator_1.body), themeValidator_1.default.questionAmount(express_validator_1.body), themeValidator_1.default.time(express_validator_1.body), themeValidator_1.default.modes(express_validator_1.body), themeController_1.default.createTheme);
themeRouter.patch(endpoints_1.default.UPDATE, themeValidator_1.default.themeId(express_validator_1.body), themeValidator_1.default.themeName(express_validator_1.body, true, { max: 50 }), themeValidator_1.default.subject_id(express_validator_1.body), themeValidator_1.default.questionAmount(express_validator_1.body, true), themeValidator_1.default.time(express_validator_1.body, true), themeValidator_1.default.modes(express_validator_1.body, true), themeController_1.default.updateTheme);
themeRouter.delete(endpoints_1.default.DELETE, themeValidator_1.default.themeId(express_validator_1.body), themeController_1.default.deleteTheme);
exports.default = themeRouter;
//# sourceMappingURL=themeRouter.js.map