"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Logo_1 = require("../../components/atoms/Logo");
var InputText_1 = require("../../components/atoms/InputText");
var Typo_1 = require("../../components/atoms/Typo");
var Button_1 = require("../../components/atoms/Button");
var Fieldset_1 = require("../../components/molecules/Fieldset");
var Join_1 = require("../../components/templates/Join");
var react_2 = require("react");
var LoginStyled = styled_components_1["default"].form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 19998;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  background-color: #f3f3f3;\n  overflow: hidden;\n  input{\n    margin-top: 8px;\n  }\n  button{\n    margin-top: 16px;\n  }\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 19998;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n  justify-content: center;\n  padding: 16px;\n  background-color: #f3f3f3;\n  overflow: hidden;\n  input{\n    margin-top: 8px;\n  }\n  button{\n    margin-top: 16px;\n  }\n"])));
var LoginComponent = function (_a) {
    var setIsTokenLive = _a.setIsTokenLive;
    var loginButtonClick = function () {
        setIsTokenLive(true);
    };
    var _b = react_2.useState(false), joinPageOpened = _b[0], setJoinPageOpened = _b[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        joinPageOpened ? react_1["default"].createElement(Join_1["default"], { setJoinPageOpened: setJoinPageOpened }) : react_1["default"].createElement(react_1["default"].Fragment, null),
        react_1["default"].createElement(LoginStyled, { setIsTokenLive: setIsTokenLive },
            react_1["default"].createElement(Logo_1["default"], { mainColor: "var(--color-point)", subColor: "#231815" }),
            react_1["default"].createElement(Fieldset_1["default"], null,
                react_1["default"].createElement(InputText_1["default"], { type: "text", placeHolder: "\uC544\uC774\uB514\uB97C \uC785\uB825\uD558\uC138\uC694." }),
                react_1["default"].createElement(InputText_1["default"], { type: "password", placeHolder: "\uD328\uC2A4\uC6CC\uB4DC\uB97C \uC785\uB825\uD558\uC138\uC694." }),
                react_1["default"].createElement(Button_1["default"], { onClick: loginButtonClick, desc: "\uB85C\uADF8\uC778", height: "48px", color: "#fff", bgc: "var(--color-point)" })),
            react_1["default"].createElement(Typo_1["default"], { size: "14px", color: "rgba(0,0,0,.5)", onClick: function (e) { return setJoinPageOpened(true); } }, "\uD68C\uC6D0\uAC00\uC785"))));
};
LoginComponent.defaultProps = {};
exports["default"] = LoginComponent;
var templateObject_1;
