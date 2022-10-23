"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var CheckboxStyled = styled_components_1["default"].input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  vertical-align: middle;\n  background-color: #fff;\n  border: 1px solid var(--color-lightgrey);\n  border-radius: 2px;\n  position: relative;\n  &:before {\n    display: none;\n    content: \"\";\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: var(--color-point);\n    border-radius: inherit;\n    z-index: 1;\n  }\n  &:checked:before {\n    display: inline-block;\n  }\n"], ["\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  vertical-align: middle;\n  background-color: #fff;\n  border: 1px solid var(--color-lightgrey);\n  border-radius: 2px;\n  position: relative;\n  &:before {\n    display: none;\n    content: \"\";\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: var(--color-point);\n    border-radius: inherit;\n    z-index: 1;\n  }\n  &:checked:before {\n    display: inline-block;\n  }\n"])));
var InputRadioComponent = function (_a) {
    var id = _a.id, name = _a.name, onClick = _a.onClick, defaultChecked = _a.defaultChecked;
    return (react_1["default"].createElement(CheckboxStyled, { type: "checkbox", id: id, name: name, onClick: onClick, defaultChecked: defaultChecked }));
};
InputRadioComponent.defaultProps = {};
exports["default"] = InputRadioComponent;
var templateObject_1;
