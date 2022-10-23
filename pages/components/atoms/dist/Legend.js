"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var LegendStyled = styled_components_1["default"].fieldset(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-top: 20px;\n"], ["\n  margin-top: 20px;\n"])));
var LegendComponent = function (_a) {
    var desc = _a.desc;
    return (react_1["default"].createElement("legend", null, desc));
};
LegendComponent.defaultProps = {};
exports["default"] = LegendComponent;
var templateObject_1;
