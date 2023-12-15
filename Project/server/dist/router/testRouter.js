"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/tests/endpoints"));
const testController_1 = tslib_1.__importDefault(require("../controllers/testController"));
const TestRouter = (0, express_1.Router)();
TestRouter.get(endpoints_1.default.GET_ALL_TESTS, testController_1.default.getAllTests);
TestRouter.post(endpoints_1.default.CREATE, testController_1.default.createTest);
TestRouter.patch(endpoints_1.default.UPDATE, testController_1.default.updateTestData);
TestRouter.delete(endpoints_1.default.DELETE, testController_1.default.deleteTest);
exports.default = TestRouter;
//# sourceMappingURL=testRouter.js.map