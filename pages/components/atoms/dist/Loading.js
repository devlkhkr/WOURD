"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var countDominoSegs = 7;
var setDominoTimer = function () {
    var styles = "";
    for (var i = 1; i < (countDominoSegs + 1); i++) {
        styles += "\n        &:nth-child(" + i + ") {\n          animation-delay: " + (-0.4 * i) + "s;\n        }\n     ";
    }
    return styled_components_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), styles);
};
var LoadingStyled = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.5);\n  z-index: 20000;\n\n  ul {\n    width: 100px;\n    height: 30px;\n    padding: 0;\n    position: relative;\n  }\n\n  li {\n    position: absolute;\n    right: 0;\n    width: 3px;\n    height: 30px;\n    background-color: ", ";\n    display: block;\n    border-radius: 3px;\n    transform-origin: 50% 100%;\n    animation: domino 2.8s linear infinite;\n    ", ";\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(255, 255, 255, 0.5);\n  z-index: 20000;\n\n  ul {\n    width: 100px;\n    height: 30px;\n    padding: 0;\n    position: relative;\n  }\n\n  li {\n    position: absolute;\n    right: 0;\n    width: 3px;\n    height: 30px;\n    background-color: ", ";\n    display: block;\n    border-radius: 3px;\n    transform-origin: 50% 100%;\n    animation: domino 2.8s linear infinite;\n    ", ";\n  }\n"])), function (props) { return props.color || "var(--color-point)"; }, setDominoTimer());
var LoadingComponent = function (_a) {
    var color = _a.color;
    var createLoadingDomino = function () {
        return (react_1["default"].createElement("ul", null, new Array(countDominoSegs).fill(0).map(function (li, index) { return react_1["default"].createElement("li", { key: index }); })));
    };
    return (react_1["default"].createElement(LoadingStyled, { color: color }, createLoadingDomino()));
};
LoadingComponent.defaultProps = {};
exports["default"] = LoadingComponent;
var templateObject_1, templateObject_2;
