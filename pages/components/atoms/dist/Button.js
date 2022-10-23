"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var ButtonStyled = styled_components_1["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  color: ", ";\n  border-color: transparent;\n  border-radius: 4px;\n"], ["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  color: ", ";\n  border-color: transparent;\n  border-radius: 4px;\n"])), function (props) { return props.width || "100%"; }, function (props) { return props.height; }, function (props) { return props.bgc; }, function (props) { return props.color; });
var ButtonCompontent = function (_a) {
    var id = _a.id, desc = _a.desc, bgc = _a.bgc, color = _a.color, width = _a.width, height = _a.height, className = _a.className, onClick = _a.onClick;
    return (react_1["default"].createElement(ButtonStyled, { id: id, type: "button", bgc: bgc, color: color, width: width, height: height, className: className, onClick: onClick }, desc));
};
ButtonCompontent.defaultProps = {};
exports["default"] = ButtonCompontent;
var templateObject_1;
