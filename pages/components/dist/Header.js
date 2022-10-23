"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Logo_1 = require("../components/atoms/Logo");
var HeaderWrap = styled_components_1["default"].header(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: blue;\n  width: 100%;\n  height: var(--height-header);\n  background-color: #ffffff;\n  position: relative;\n  display: flex;\n  justify-content: center;\n"], ["\n  background-color: blue;\n  width: 100%;\n  height: var(--height-header);\n  background-color: #ffffff;\n  position: relative;\n  display: flex;\n  justify-content: center;\n"])));
var HeaderLogo = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  svg {\n    font-size: 26px;\n    color: #0047ab;\n  }\n  h1 {\n    font-size: 26px;\n    color: #0047ab;\n    font-weight: var(--weight-black);\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  svg {\n    font-size: 26px;\n    color: #0047ab;\n  }\n  h1 {\n    font-size: 26px;\n    color: #0047ab;\n    font-weight: var(--weight-black);\n  }\n"])));
var Header = function () {
    return (react_1["default"].createElement(HeaderWrap, null,
        react_1["default"].createElement(HeaderLogo, null,
            react_1["default"].createElement(Logo_1["default"], { mainColor: "var(--color-point)", subColor: "#231815" }))));
};
exports["default"] = Header;
var templateObject_1, templateObject_2;
