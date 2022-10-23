"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var TextAreaStyled = styled_components_1["default"].textarea(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: ", ";\n  border: 1px solid var(--color-lightgrey);\n  padding: 8px;\n  resize: none;\n"], ["\n  width: 100%;\n  height: ", ";\n  border: 1px solid var(--color-lightgrey);\n  padding: 8px;\n  resize: none;\n"])), function (props) { return props.height + "px"; });
var TextAreaComponent = function (_a) {
    var id = _a.id, placeholder = _a.placeholder, height = _a.height;
    return (react_1["default"].createElement(TextAreaStyled, { id: id, placeholder: placeholder, height: height }));
};
TextAreaComponent.defaultProps = {};
exports["default"] = TextAreaComponent;
var templateObject_1;
