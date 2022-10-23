"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var TypoStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    line-height: 1.2;\n    font-weight: ", ";\n    font-size: ", ";\n    color: ", ";\n    text-align: ", ";\n\n    margin-top: ", ";\n  }\n"], ["\n    line-height: 1.2;\n    font-weight: ", ";\n    font-size: ", ";\n    color: ", ";\n    text-align: ", ";\n\n    margin-top: ", ";\n  }\n"])), function (props) { return "var(--weight-" + props.weight + ")"; }, function (props) { return props.size || "16px"; }, function (props) { return props.color || "inherit"; }, function (props) { return props.align || "center"; }, function (props) { return props.mt || "unset"; });
var TypoComponent = function (_a) {
    var size = _a.size, weight = _a.weight, align = _a.align, color = _a.color, mt = _a.mt, children = _a.children, className = _a.className, onClick = _a.onClick;
    return (react_1["default"].createElement(TypoStyled, { size: size, weight: weight, align: align, color: color, mt: mt, className: className, onClick: onClick }, children));
};
TypoComponent.defaultProps = {};
exports["default"] = TypoComponent;
var templateObject_1;
