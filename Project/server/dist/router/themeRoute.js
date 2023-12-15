"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/themes/endpoints"));
const themeController_1 = tslib_1.__importDefault(require("../controllers/themeController"));
const themeRouter = (0, express_1.Router)();
themeRouter.get(endpoints_1.default.GET_BY_ID, themeController_1.default.getThemeById);
themeRouter.get(endpoints_1.default.GET_ALL_THEMES, themeController_1.default.getAllThemes);
themeRouter.post(endpoints_1.default.CREATE, themeController_1.default.createTheme);
themeRouter.patch(endpoints_1.default.UPDATE, themeController_1.default.updateTheme);
themeRouter.delete(endpoints_1.default.DELETE, themeController_1.default.deleteTheme);
exports.default = themeRouter;
//# sourceMappingURL=themeRoute.js.map