"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var InputWrapStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  & + & {\n    margin-top: 8px;\n  }\n"], ["\n  & + & {\n    margin-top: 8px;\n  }\n"])));
var InputWrapComponent = function (_a) {
    var children = _a.children;
    return react_1["default"].createElement(InputWrapStyled, null, children);
};
InputWrapComponent.defaultProps = {};
exports["default"] = InputWrapComponent;
var templateObject_1;
