"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var ButtonWrapsetStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  button {\n    flex: auto;\n    & + button {\n      margin-left: 8px;\n    }\n  }\n"], ["\n  display: flex;\n  button {\n    flex: auto;\n    & + button {\n      margin-left: 8px;\n    }\n  }\n"])));
var ButtonWrapComponent = function (_a) {
    var children = _a.children;
    return react_1["default"].createElement(ButtonWrapsetStyled, null, children);
};
ButtonWrapComponent.defaultProps = {};
exports["default"] = ButtonWrapComponent;
var templateObject_1;
