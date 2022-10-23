"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var LogoStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n"], ["\n  width: ", ";\n  height: ", ";\n"])), function (props) { return props.width || "80px"; }, function (props) { return props.height || "unset"; });
var Button = function (_a) {
    var width = _a.width, height = _a.height, mainColor = _a.mainColor, subColor = _a.subColor;
    return (react_1["default"].createElement(LogoStyled, { width: width, height: height, mainColor: mainColor, subColor: subColor },
        react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 164.21 50.96" },
            react_1["default"].createElement("path", { d: "M110.28,3.3V48.55c0,3.73,5.8,3.74,5.8,0V3.3c0-3.73-5.8-3.74-5.8,0Z", transform: "translate(-0.39 -0.5)", style: { fill: subColor } }),
            react_1["default"].createElement("path", { d: "M121.89,3.3V48.55c0,3.73,5.8,3.74,5.8,0V3.3c0-3.73-5.8-3.74-5.8,0Z", transform: "translate(-0.39 -0.5)", style: { fill: subColor } }),
            react_1["default"].createElement("path", { d: "M110.28,3.3V48.55c0,3.73,5.8,3.74,5.8,0V3.3c0-3.73-5.8-3.74-5.8,0Z", transform: "translate(-0.39 -0.5)", style: { fill: subColor } }),
            react_1["default"].createElement("path", { d: "M98.67,3.3V48.55c0,3.73,5.81,3.74,5.81,0V3.3c0-3.73-5.81-3.74-5.81,0Z", transform: "translate(-0.39 -0.5)", style: { fill: subColor } }),
            react_1["default"].createElement("path", { d: "M89,6,73.65,42.6l-2.16,5.18c-.61,1.44.65,3.19,2,3.57a3,3,0,0,0,3.57-2L92.39,12.76l2.16-5.18c.61-1.44-.65-3.19-2-3.57A3,3,0,0,0,89,6Z", transform: "translate(-0.39 -0.5)", style: { fill: mainColor } }),
            react_1["default"].createElement("path", { d: "M72.82,24.09,38.16,43.32,33.26,46c-3.27,1.81-.35,6.83,2.93,5L70.84,31.83l4.91-2.73c3.27-1.81.34-6.82-2.93-5Z", transform: "translate(-0.39 -0.5)", style: { fill: subColor } }),
            react_1["default"].createElement("path", { d: "M162.93,22.67l-2.88-2.86L154.7,14.5,144,3.88c-2.65-2.63-6.76,1.47-4.1,4.11L157.65,25.6,139.89,43.22c-2.66,2.63,1.45,6.74,4.1,4.1L154.7,36.71l5.35-5.31,2.68-2.66c.92-.91,1.88-1.73,1.88-3.14A4.12,4.12,0,0,0,162.93,22.67Z", transform: "translate(-0.39 -0.5)", style: { fill: mainColor } }),
            react_1["default"].createElement("path", { d: "M25.11,43.22,7.35,25.6,25.11,8c2.66-2.64-1.45-6.74-4.1-4.11L10.3,14.5,5,19.81,2.27,22.46C1.35,23.38.39,24.2.39,25.6s.82,2.09,1.68,2.94L5,31.4l5.35,5.31L21,47.32C23.66,50,27.77,45.86,25.11,43.22Z", transform: "translate(-0.39 -0.5)", style: { fill: mainColor } }))));
};
Button.defaultProps = {};
exports["default"] = Button;
var templateObject_1;
