"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("react");
var styled_components_1 = require("styled-components");
var CardSwiperSyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0px;\n  user-select: none;\n  will-change: left, transform;\n  &.fliped,\n  &[class*=\"state_\"] {\n    .cardMain {\n      transform: rotateY(180deg);\n      transition: transform 0.5s;\n    }\n  }\n  &.fliped {\n    & ~ .btn_wrap_cardctrl {\n      transition-duration: 0.5s;\n      opacity: 1;\n      pointer-events: all;\n    }\n  }\n  &[class*=\"state_\"] {\n    transition-duration: 0.5s;\n    pointer-events: none;\n  }\n  &.state_ {\n    &k {\n      left: 200% !important;\n    }\n    &d {\n      left: -200% !important;\n    }\n    &f {\n      top: -200% !important;\n    }\n    &s {\n      top: 200% !important;\n    }\n  }\n"], ["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0px;\n  user-select: none;\n  will-change: left, transform;\n  &.fliped,\n  &[class*=\"state_\"] {\n    .cardMain {\n      transform: rotateY(180deg);\n      transition: transform 0.5s;\n    }\n  }\n  &.fliped {\n    & ~ .btn_wrap_cardctrl {\n      transition-duration: 0.5s;\n      opacity: 1;\n      pointer-events: all;\n    }\n  }\n  &[class*=\"state_\"] {\n    transition-duration: 0.5s;\n    pointer-events: none;\n  }\n  &.state_ {\n    &k {\n      left: 200% !important;\n    }\n    &d {\n      left: -200% !important;\n    }\n    &f {\n      top: -200% !important;\n    }\n    &s {\n      top: 200% !important;\n    }\n  }\n"])));
var CardSwiperComponent = function (_a) {
    var children = _a.children, className = _a.className, wordInfo = _a.wordInfo, cardHandler = _a.cardHandler, setButtonState = _a.setButtonState;
    var throwLimit = 60;
    var startPointX = 0;
    var startPointY = 0;
    var prevPosX = 0;
    var prevPosY = 0;
    var movedDistanceX;
    var movedDistanceY;
    var cardMouseDown = function (event) {
        event.persist();
        if (event.nativeEvent instanceof TouchEvent) {
            if (event.nativeEvent.touches.length === 1) {
                setStartPoint(event.nativeEvent.touches[0].clientX, event.nativeEvent.touches[0].clientY);
                window.addEventListener("touchend", cardMouseUp);
                window.addEventListener("touchmove", cardMouseMove);
            }
        }
        if (event.nativeEvent instanceof MouseEvent) {
            setStartPoint(event.nativeEvent.clientX, event.nativeEvent.clientY);
            window.addEventListener("mouseup", cardMouseUp);
            window.addEventListener("mousemove", cardMouseMove);
        }
    };
    var setStartPoint = function (_x, _y) {
        startPointX = _x;
        startPointY = _y;
        prevPosX = _x;
        prevPosY = _y;
    };
    var cardMouseMove = function (event) {
        if (event instanceof TouchEvent) {
            commonMoveEvent(event.touches[0].clientX, event.touches[0].clientY);
        }
        if (event instanceof MouseEvent) {
            commonMoveEvent(event.clientX, event.clientY);
        }
    };
    var commonMoveEvent = function (_x, _y) {
        var posX = prevPosX - _x;
        var posY = prevPosY - _y;
        prevPosX = _x;
        prevPosY = _y;
        cardDOM.current.style.left = cardDOM.current.offsetLeft - posX + "px";
        cardDOM.current.style.top = cardDOM.current.offsetTop - posY + "px";
        cardDOM.current.style.transform = "rotate(" + (cardDOM.current.offsetLeft - posX) / 16 + "deg)";
        if (Math.abs(_x - startPointX) > throwLimit) {
            _x - startPointX > 0
                ? setButtonState("focused_k")
                : setButtonState("focused_d");
        }
        else if (Math.abs(_y - startPointY) > throwLimit) {
            _y - startPointY > 0
                ? setButtonState("focused_s")
                : setButtonState("focused_f");
        }
        else {
            setButtonState("");
        }
    };
    var cardMouseUp = function (event) {
        // cardStateDecided();
        if (event instanceof TouchEvent) {
            commonEndEvent(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            window.removeEventListener("touchend", cardMouseUp);
            window.removeEventListener("touchmove", cardMouseMove);
        }
        if (event instanceof MouseEvent) {
            commonEndEvent(event.clientX, event.clientY);
            window.removeEventListener("mouseup", cardMouseUp);
            window.removeEventListener("mousemove", cardMouseMove);
        }
    };
    var commonEndEvent = function (_x, _y) {
        movedDistanceX = _x - startPointX;
        movedDistanceY = _y - startPointY;
        cardStateDecided(movedDistanceX, movedDistanceY);
    };
    var cardStateDecided = function (_x, _y) {
        if (Math.abs(_x) < throwLimit && Math.abs(_y) < throwLimit) {
            cardDOM.current.style.left = 0;
            cardDOM.current.style.top = 0;
            cardDOM.current.style.transform = "unset";
        }
        if (Math.abs(_x) > throwLimit) {
            _x > 0 ? cardHandler.know(wordInfo) : cardHandler.dontKnow(wordInfo);
        }
        if (Math.abs(_y) > throwLimit) {
            _y > 0 ? cardHandler.skip(wordInfo) : cardHandler.fav(wordInfo);
        }
    };
    var cardDOM = react_2.useRef();
    return (react_1["default"].createElement(CardSwiperSyled, { ref: cardDOM, onMouseDown: cardMouseDown, onTouchStart: cardMouseDown, className: className, wordInfo: wordInfo, cardHandler: cardHandler, setButtonState: setButtonState }, children));
};
CardSwiperComponent.defaultProps = {};
exports["default"] = CardSwiperComponent;
var templateObject_1;
