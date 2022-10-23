"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var LabelStyled = styled_components_1["default"].label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  margin-bottom: 8px;\n  line-height: 24px;\n  vertical-align: middle;\n  font-weight: var(--weight-medium);\n  &:before {\n    content: \"\\2022\";\n    color: ", ";\n    margin-right: 4px;\n  }\n  input[type=\"radio\"] + &,\n  input[type=\"checkbox\"] + & {\n    font-weight: var(--weight-regular);\n    margin-left: 8px;\n    margin-bottom: 0px;\n    font-size: 14px;\n    &:before {\n      content: \"\";\n    }\n  }\n"], ["\n  display: inline-block;\n  margin-bottom: 8px;\n  line-height: 24px;\n  vertical-align: middle;\n  font-weight: var(--weight-medium);\n  &:before {\n    content: \"\\\\2022\";\n    color: ", ";\n    margin-right: 4px;\n  }\n  input[type=\"radio\"] + &,\n  input[type=\"checkbox\"] + & {\n    font-weight: var(--weight-regular);\n    margin-left: 8px;\n    margin-bottom: 0px;\n    font-size: 14px;\n    &:before {\n      content: \"\";\n    }\n  }\n"])), function (props) { return (props.mandatory ? "var(--color-red)" : "inherit"); });
var LabelComponent = function (_a) {
    var htmlFor = _a.htmlFor, desc = _a.desc, mandatory = _a.mandatory;
    return (react_1["default"].createElement(LabelStyled, { htmlFor: htmlFor, mandatory: mandatory }, desc));
};
LabelComponent.defaultProps = {
    mandatory: false
};
exports["default"] = LabelComponent;
var templateObject_1;
