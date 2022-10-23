"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Typo_1 = require("../../components/atoms/Typo");
var InputText_1 = require("../../components/atoms/InputText");
var Label_1 = require("../../components/atoms/Label");
var Button_1 = require("../../components/atoms/Button");
var Fieldset_1 = require("../../components/molecules/Fieldset");
var InputWrap_1 = require("../../components/molecules/InputWrap");
var ButtonWrap_1 = require("../../components/molecules/ButtonWrap");
var Form_1 = require("../../components/organisms/Form");
var JoinStyled = styled_components_1["default"].form(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 19999;\n  padding: 32px 16px;\n  background-color: #f3f3f3;\n  overflow-y: auto;\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 19999;\n  padding: 32px 16px;\n  background-color: #f3f3f3;\n  overflow-y: auto;\n"])));
var JoinComponent = function (_a) {
    var setJoinPageOpened = _a.setJoinPageOpened;
    var loginButtonClick = function () {
        setJoinPageOpened(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(JoinStyled, { setJoinPageOpened: setJoinPageOpened },
            react_1["default"].createElement(Form_1["default"], null,
                react_1["default"].createElement(Typo_1["default"], { size: "16px", weight: "semi-bold", mt: "12px" }, "\uD68C\uC6D0\uAC00\uC785"),
                react_1["default"].createElement(Fieldset_1["default"], null,
                    react_1["default"].createElement(InputWrap_1["default"], null,
                        react_1["default"].createElement(Label_1["default"], { htmlFor: "joinId", desc: "\uC544\uC774\uB514", mandatory: true }),
                        react_1["default"].createElement(InputText_1["default"], { type: "text", placeHolder: "\uC0AC\uC6A9\uD558\uC2E4 \uC544\uC774\uB514\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", id: "joinId" })),
                    react_1["default"].createElement(InputWrap_1["default"], null,
                        react_1["default"].createElement(Label_1["default"], { htmlFor: "joinPw", desc: "\uBE44\uBC00\uBC88\uD638", mandatory: true }),
                        react_1["default"].createElement(InputText_1["default"], { type: "password", placeHolder: "\uCD5C\uC18C 8\uC790\uB9AC \uC774\uC0C1, \uC601\uBB38\uC790 + \uC22B\uC790 \uC870\uD569", id: "joinPw" })),
                    react_1["default"].createElement(InputWrap_1["default"], null,
                        react_1["default"].createElement(Label_1["default"], { htmlFor: "joinPwConfirm", desc: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778", mandatory: true }),
                        react_1["default"].createElement(InputText_1["default"], { type: "password", placeHolder: "\uBE44\uBC00\uBC88\uD638\uB97C \uD55C\uBC88 \uB354 \uC785\uB825\uD574\uC8FC\uC138\uC694.", id: "joinPwConfirm" }))),
                react_1["default"].createElement(Fieldset_1["default"], null,
                    react_1["default"].createElement(InputWrap_1["default"], null,
                        react_1["default"].createElement(Label_1["default"], { htmlFor: "joinName", desc: "\uC131\uD568", mandatory: true }),
                        react_1["default"].createElement(InputText_1["default"], { type: "text", placeHolder: "\uC2E4\uBA85\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.", id: "joinName" })),
                    react_1["default"].createElement(InputWrap_1["default"], null,
                        react_1["default"].createElement(Label_1["default"], { htmlFor: "joinKey", desc: "\uCD08\uB300\uCF54\uB4DC", mandatory: true }),
                        react_1["default"].createElement(InputText_1["default"], { type: "text", placeHolder: "\uCD08\uB300\uCF54\uB4DC\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", id: "joinKey" }))),
                react_1["default"].createElement(Fieldset_1["default"], null,
                    react_1["default"].createElement(ButtonWrap_1["default"], null,
                        react_1["default"].createElement(Button_1["default"], { desc: "\uCDE8\uC18C", id: "cancleRegWord", bgc: "#666", color: "#fff", width: "40%", height: "40px", onClick: function () { return setJoinPageOpened(false); } }),
                        react_1["default"].createElement(Button_1["default"], { desc: "\uAC00\uC785", id: "submitRegWord", bgc: "var(--color-point)", color: "#fff", width: "60%", height: "40px" })))))));
};
JoinComponent.defaultProps = {};
exports["default"] = JoinComponent;
var templateObject_1;
