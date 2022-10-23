"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Icon_1 = require("../atoms/Icon");
var Typo_1 = require("../atoms/Typo");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var SettingList = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display : flex;\n  align-items : center;\n  justify-content : space-between;\n  color : var(--color-black);\n  padding : 8px 0;\n  border-bottom : 1px solid var(--color-deepgrey);\n  &:first-child {\n    border-top : 1px solid var(--color-deepgrey);\n  }\n"], ["\n  display : flex;\n  align-items : center;\n  justify-content : space-between;\n  color : var(--color-black);\n  padding : 8px 0;\n  border-bottom : 1px solid var(--color-deepgrey);\n  &:first-child {\n    border-top : 1px solid var(--color-deepgrey);\n  }\n"])));
var SettingListComponent = function (props) {
    var typo = props.typo, nextStep = props.nextStep, rightText = props.rightText;
    return (react_1["default"].createElement(SettingList, null,
        react_1["default"].createElement(Typo_1["default"], { size: "14px", weight: "regular", align: "left" }, typo),
        nextStep ? (
        // next step
        react_1["default"].createElement(Icon_1["default"], { iconShape: free_solid_svg_icons_1.faChevronRight, iconWidth: 16, iconHeight: 16, bottom: 4 })) : (
        // version text
        react_1["default"].createElement(Typo_1["default"], { size: "14px", weight: "semi-bold" }, rightText))));
};
SettingListComponent.defaultProps = {};
exports["default"] = SettingListComponent;
var templateObject_1;
