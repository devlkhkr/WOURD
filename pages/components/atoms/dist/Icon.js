"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var styled_components_1 = require("styled-components");
var IconWrap = styled_components_1["default"].i(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: ", "px;\n  height: ", "px;\n  margin: 0 ", " ", "px;\n  svg {\n    font-size: 20px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: ", "px;\n  height: ", "px;\n  margin: 0 ", " ", "px;\n  svg {\n    font-size: 20px;\n  }\n"])), function (props) { return props.iconWidth; }, function (props) { return props.iconHeight; }, function (props) { return props.align ? "auto" : ""; }, function (props) { return (props.bottom ? props.bottom : 4); });
var Icon = function (_a) {
    var iconShape = _a.iconShape, icon = _a.icon, iconWidth = _a.iconWidth, iconHeight = _a.iconHeight, bottom = _a.bottom, align = _a.align;
    return (react_1["default"].createElement(IconWrap, { iconShape: iconShape, iconWidth: iconWidth, iconHeight: iconHeight, bottom: bottom },
        react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: iconShape })));
};
Icon.defaultProps = {};
exports["default"] = Icon;
var templateObject_1;
