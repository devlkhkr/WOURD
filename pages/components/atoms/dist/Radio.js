"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Label_1 = require("../../components/atoms/Label");
var InputWrap_1 = require("../../components/molecules/InputWrap");
var RadioStyled = styled_components_1["default"].input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  vertical-align: middle;\n  background-color: #fff;\n  border: 1px solid var(--color-lightgrey);\n  border-radius: 100%;\n  position: relative;\n  &:before {\n    display: none;\n    content: \"\";\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: var(--color-point);\n    border-radius: inherit;\n    z-index: 1;\n  }\n  &:checked:before {\n    display: inline-block;\n  }\n"], ["\n  appearance: none;\n  width: 24px;\n  height: 24px;\n  vertical-align: middle;\n  background-color: #fff;\n  border: 1px solid var(--color-lightgrey);\n  border-radius: 100%;\n  position: relative;\n  &:before {\n    display: none;\n    content: \"\";\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    background-color: var(--color-point);\n    border-radius: inherit;\n    z-index: 1;\n  }\n  &:checked:before {\n    display: inline-block;\n  }\n"])));
var RadioComponent = function (_a) {
    var name = _a.name, onClick = _a.onClick, options = _a.options;
    return (react_1["default"].createElement(react_1["default"].Fragment, null, options.map(function (o) {
        return (react_1["default"].createElement(InputWrap_1["default"], { key: o.value },
            react_1["default"].createElement(RadioStyled, { type: "radio", id: name + "_" + o.value, name: name, value: o.value, onClick: onClick, defaultChecked: o.defaultChecked }),
            react_1["default"].createElement(Label_1["default"], { htmlFor: name + "_" + o.value, desc: o.name })));
    })));
};
RadioComponent.defaultProps = {};
exports["default"] = RadioComponent;
var templateObject_1;
