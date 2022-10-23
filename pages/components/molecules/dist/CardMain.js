"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Button_1 = require("../../components/atoms/Button");
var Typo_1 = require("../../components/atoms/Typo");
var CardSwiper_1 = require("../../components/organisms/CardSwiper");
var CardBaseStyle = "\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-flow: column;\n  width: 100%;\n  height: 100%;\n  padding: 16px 16px 80px;\n  position: absolute;\n  text-align: center;\n  backface-visibility: hidden;\n  border-radius: 16px;\n";
var MainWrapStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: relative;\n"], ["\n  width: 100%;\n  height: 100%;\n  position: relative;\n"])));
var CardWrapStyled = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  perspective: 500px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  width: 100%;\n  height: 100%;\n  perspective: 500px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"])));
var CardMainStyled = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  border-radius: 16px;\n  position: absolute;\n  transition: transform 0.5s;\n  transform-style: preserve-3d;\n"], ["\n  width: 100%;\n  height: 100%;\n  border-radius: 16px;\n  position: absolute;\n  transition: transform 0.5s;\n  transform-style: preserve-3d;\n"])));
var CardFrontStyled = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  ", "\n  background-color: #fff;\n"], ["\n  ", "\n  background-color: #fff;\n"])), CardBaseStyle);
var CardBackStyled = styled_components_1["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  ", "\n  transform: rotateY(180deg);\n  background: linear-gradient(#3f88ef, #0047ab);\n  color: #fff;\n  > div {\n    & + div {\n      margin-top: 4px;\n    }\n  }\n"], ["\n  ", "\n  transform: rotateY(180deg);\n  background: linear-gradient(#3f88ef, #0047ab);\n  color: #fff;\n  > div {\n    & + div {\n      margin-top: 4px;\n    }\n  }\n"])), CardBaseStyle);
var setButtonPosition = function () {
    var styles = "";
    for (var i = 1; i < 5; i++) {
        styles += "\n        &:nth-child(" + i + "){\n          left: calc(" + (i - 1) * 25 + "% + 2px);\n        }\n     ";
    }
    return styled_components_1.css(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    ", "\n  "], ["\n    ", "\n  "])), styles);
};
var setButtonFocus = function (color) {
    return styled_components_1.css(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    z-index: 1;\n    opacity: 1;\n    background-color: ", ";\n  "], ["\n    z-index: 1;\n    opacity: 1;\n    background-color: ", ";\n  "])), color);
};
var BtnWrapCardCtrlStyled = styled_components_1["default"].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  transform: translate(-50%, 0);\n  opacity: 0;\n  pointer-events: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: calc(100% - 32px);\n  height: 80px;\n  button {\n    position: absolute;\n    max-width: calc(25% - 4px);\n    font-size: 12px;\n    transition-duration: 0.3s;\n    will-change: left opacity;\n    ", ";\n  }\n  &[class*=\"focused_\"] {\n    button {\n      opacity: 0;\n      left: 50%;\n      transform: translate(-50%, 0);\n    }\n  }\n  &.focused_ {\n    &k {\n      .btn_word_k {\n        ", "\n      }\n    }\n    &d {\n      .btn_word_d {\n        ", "\n      }\n    }\n    &f {\n      .btn_word_f {\n        ", "\n      }\n    }\n    &s {\n      .btn_word_s {\n        ", "\n      }\n    }\n  }\n"], ["\n  position: absolute;\n  left: 50%;\n  bottom: 0;\n  transform: translate(-50%, 0);\n  opacity: 0;\n  pointer-events: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: calc(100% - 32px);\n  height: 80px;\n  button {\n    position: absolute;\n    max-width: calc(25% - 4px);\n    font-size: 12px;\n    transition-duration: 0.3s;\n    will-change: left opacity;\n    ", ";\n  }\n  &[class*=\"focused_\"] {\n    button {\n      opacity: 0;\n      left: 50%;\n      transform: translate(-50%, 0);\n    }\n  }\n  &.focused_ {\n    &k {\n      .btn_word_k {\n        ", "\n      }\n    }\n    &d {\n      .btn_word_d {\n        ", "\n      }\n    }\n    &f {\n      .btn_word_f {\n        ", "\n      }\n    }\n    &s {\n      .btn_word_s {\n        ", "\n      }\n    }\n  }\n"])), setButtonPosition(), setButtonFocus("#94be88"), setButtonFocus("#da8484"), setButtonFocus("#c8be51"), setButtonFocus("#bb88be"));
var CardMainComponent = function (_a) {
    var exposeWord = _a.exposeWord;
    var cardList = react_1.useRef();
    var cardHandler = {
        dontKnow: function (_objWord, e) {
            afterCardHandler(_objWord, "d");
        },
        know: function (_objWord, e) {
            afterCardHandler(_objWord, "k");
        },
        fav: function (_objWord, e) {
            afterCardHandler(_objWord, "f");
        },
        skip: function (_objWord, e) {
            afterCardHandler(_objWord, "s");
        }
    };
    var afterCardHandler = function (_objWord, state) {
        setButtonState("");
        _objWord.fliped = false;
        _objWord.state = "state_" + state;
        setWordList(__spreadArrays(wordList));
    };
    var setCardFlip = function (_objWord, e) {
        // _objWord.fliped = !_objWord.fliped;
        _objWord.fliped = true;
        setWordList(__spreadArrays(wordList));
    };
    var _b = react_1.useState(__spreadArrays(exposeWord)), wordList = _b[0], setWordList = _b[1];
    var _c = react_1.useState(0), currentCardIdx = _c[0], setCurrentCardIdx = _c[1];
    var _d = react_1.useState(""), buttonState = _d[0], setButtonState = _d[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(MainWrapStyled, { ref: cardList },
            wordList.reverse().map(function (objWord, index) { return (react_1["default"].createElement(CardSwiper_1["default"], { key: index, className: "card " + (objWord.fliped ? "fliped" : "") + " " + objWord.state, wordInfo: objWord, cardHandler: cardHandler, setButtonState: setButtonState },
                react_1["default"].createElement(CardWrapStyled, { onMouseDown: function (e) {
                        setCardFlip(objWord, e);
                        setCurrentCardIdx(index);
                    }, onTouchStart: function (e) {
                        setCardFlip(objWord, e);
                        setCurrentCardIdx(index);
                    } },
                    react_1["default"].createElement(CardMainStyled, { exposeWord: exposeWord, className: "cardMain" },
                        react_1["default"].createElement(CardFrontStyled, null,
                            react_1["default"].createElement(Typo_1["default"], { size: "24px", weight: "bold" }, objWord.word)),
                        react_1["default"].createElement(CardBackStyled, null,
                            react_1["default"].createElement(Typo_1["default"], { size: "24px", weight: "bold" }, objWord.word),
                            react_1["default"].createElement(Typo_1["default"], { size: "16px", weight: "semi-bold" }, objWord.unravel),
                            react_1["default"].createElement(Typo_1["default"], { size: "14px", weight: "regular", align: "left" }, objWord.desc)))))); }),
            react_1["default"].createElement(BtnWrapCardCtrlStyled, { className: "btn_wrap_cardctrl " + buttonState },
                react_1["default"].createElement(Button_1["default"], { desc: "\uAC74\uB108\uB6F0\uAE30", bgc: "#92a4c9", color: "#fff", height: "40px", className: "btn_word_s", onClick: function (e) {
                        cardHandler.skip(wordList[currentCardIdx], e);
                    } }),
                react_1["default"].createElement(Button_1["default"], { desc: "\uC990\uACA8\uCC3E\uAE30", bgc: "#92a4c9", color: "#fff", height: "40px", className: "btn_word_f", onClick: function (e) {
                        cardHandler.fav(wordList[currentCardIdx], e);
                    } }),
                react_1["default"].createElement(Button_1["default"], { desc: "\uBAA8\uB974\uB294\uB2E8\uC5B4", bgc: "#92a4c9", color: "#fff", height: "40px", className: "btn_word_d", onClick: function (e) {
                        cardHandler.dontKnow(wordList[currentCardIdx], e);
                    } }),
                react_1["default"].createElement(Button_1["default"], { desc: "\uC544\uB294\uB2E8\uC5B4", bgc: "#92a4c9", color: "#fff", height: "40px", className: "btn_word_k", onClick: function (e) {
                        cardHandler.know(wordList[currentCardIdx], e);
                    } })))));
};
CardMainComponent.defaultProps = {};
exports["default"] = CardMainComponent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
