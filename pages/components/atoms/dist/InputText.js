"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Input = styled_components_1["default"].input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 32px;\n  border: 1px solid var(--color-lightgrey);\n  background-color: #fff;\n  padding: 0 8px;\n  &::placeholder {\n    color: var(--color-grey);\n  }\n"], ["\n  width: 100%;\n  height: 32px;\n  border: 1px solid var(--color-lightgrey);\n  background-color: #fff;\n  padding: 0 8px;\n  &::placeholder {\n    color: var(--color-grey);\n  }\n"])));
var InputText = function (_a) {
    var type = _a.type, id = _a.id, placeHolder = _a.placeHolder;
    return react_1["default"].createElement(Input, { type: type, placeholder: placeHolder, id: id });
};
InputText.defaultProps = {
    placeHolder: "정보를 입력해주세요."
};
exports["default"] = InputText;
var templateObject_1;
