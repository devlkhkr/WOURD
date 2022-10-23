"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var styled_components_1 = require("styled-components");
var SettingList_1 = require("../components/molecules/SettingList");
var SettingWrap = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color : var(--color-white);\n  border-radius : 16px;\n  padding : 16px 16px 80px;\n  display : flex;\n  flex-direction : column;\n  height : 100%;\n"], ["\n  background-color : var(--color-white);\n  border-radius : 16px;\n  padding : 16px 16px 80px;\n  display : flex;\n  flex-direction : column;\n  height : 100%;\n"
    // user interface
])));
// user interface
var SettingUserStyled = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom : 2rem;\n"], ["\n  margin-bottom : 2rem;\n"])));
// app interface
var SettingBottomStyled = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject([""], [""])));
var Setting = function () {
    return (React.createElement(SettingWrap, null,
        React.createElement("div", null, "\uC720\uC800\uD504\uB85C\uD544\uC601\uC5ED"),
        React.createElement(SettingUserStyled, null,
            React.createElement(SettingList_1["default"], { typo: "\uBE44\uBC00\uBC88\uD638 \uBCC0\uACBD", nextStep: true }),
            React.createElement(SettingList_1["default"], { typo: "\uACF5\uC9C0\uC0AC\uD56D", nextStep: true }),
            React.createElement(SettingList_1["default"], { typo: "\uD0C8\uD1F4\uC694\uCCAD", nextStep: true })),
        React.createElement(SettingBottomStyled, null,
            React.createElement(SettingList_1["default"], { typo: "\uB3C4\uC6C0\uB9D0(FAQ)", nextStep: true }),
            React.createElement(SettingList_1["default"], { typo: "\uB85C\uADF8\uC544\uC6C3", nextStep: true }),
            React.createElement(SettingList_1["default"], { typo: "\uBC84\uC804\uC815\uBCF4", rightText: "1.0.0" }))));
};
exports["default"] = Setting;
var templateObject_1, templateObject_2, templateObject_3;
