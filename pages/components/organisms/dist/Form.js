"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var FormtStyled = styled_components_1["default"].form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 16px;\n  background-color: #fff;\n  border-radius: 8px;\n"], ["\n  padding: 16px;\n  background-color: #fff;\n  border-radius: 8px;\n"])));
var FormComponent = function (_a) {
    var children = _a.children;
    return react_1["default"].createElement(FormtStyled, null, children);
};
FormComponent.defaultProps = {};
exports["default"] = FormComponent;
var templateObject_1;
