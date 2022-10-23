"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var IconTextCon = styled_components_1["default"].span(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var IconText = function (_a) {
    var text = _a.text;
    return react_1["default"].createElement(IconTextCon, null, text);
};
IconText.defaultProps = {};
exports["default"] = IconText;
var templateObject_1;
