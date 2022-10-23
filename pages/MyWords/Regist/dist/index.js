"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var router_1 = require("next/router");
var styled_components_1 = require("styled-components");
var InputText_1 = require("../../components/atoms/InputText");
var Radio_1 = require("../../components/atoms/Radio");
var Select_1 = require("../../components/atoms/Select");
var MultiSelect_1 = require("../../components/atoms/MultiSelect");
var Label_1 = require("../../components/atoms/Label");
var Textarea_1 = require("../../components/atoms/Textarea");
var Button_1 = require("../../components/atoms/Button");
var Fieldset_1 = require("../../components/molecules/Fieldset");
var InputWrap_1 = require("../../components/molecules/InputWrap");
var ButtonWrap_1 = require("../../components/molecules/ButtonWrap");
var Form_1 = require("../../components/organisms/Form");
var RegistWordWrap = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var RegistWord = function (_a) {
    var _b = react_1.useState(true), isIntl = _b[0], setIsIntl = _b[1];
    var intlYNOnclick = function (event) {
        var target = event.target;
        target.id === "intlYN_0" ? setIsIntl(true) : setIsIntl(false);
    };
    var router = router_1.useRouter();
    var cancleRegWordClick = function () {
        router.back();
    };
    return (React.createElement(RegistWordWrap, null,
        React.createElement(Form_1["default"], null,
            React.createElement(Fieldset_1["default"], null,
                React.createElement(Label_1["default"], { htmlFor: "wordName", desc: "\uB2E8\uC5B4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", mandatory: true }),
                React.createElement(InputText_1["default"], { type: "text", placeHolder: "\uC608) SSR", id: "wordName" })),
            React.createElement(Fieldset_1["default"], null,
                React.createElement(Label_1["default"], { desc: "\uC57D\uC5B4 \uC778\uAC00\uC694?", mandatory: true }),
                React.createElement(InputWrap_1["default"], null,
                    React.createElement(Radio_1["default"], { name: "intlYN", onClick: intlYNOnclick, options: [
                            {
                                name: "예, 약어입니다.",
                                value: 0,
                                defaultChecked: true
                            },
                            {
                                name: "아니요, 낱말입니다.",
                                value: 1
                            }
                        ] }))),
            isIntl ? (React.createElement(Fieldset_1["default"], null,
                React.createElement(Label_1["default"], { htmlFor: "wordsExpln", desc: "\uC57D\uC5B4\uB97C \uAC01\uAC01\uC758 \uB0B1\uB9D0\uB85C \uD480\uC5B4\uC11C \uC801\uC5B4\uC8FC\uC138\uC694.", mandatory: true }),
                React.createElement(InputText_1["default"], { id: "wordsExpln", type: "text", placeHolder: "\uC608) Server Side Rendering" }))) : (React.createElement(React.Fragment, null)),
            React.createElement(Fieldset_1["default"], null,
                React.createElement(Label_1["default"], { htmlFor: "wordDesc", desc: "\uB2E8\uC5B4\uC5D0 \uB300\uD55C \uC124\uBA85\uC744 \uC801\uC5B4\uC8FC\uC138\uC694." }),
                React.createElement(Textarea_1["default"], { id: "wordDesc", height: 300, placeholder: "\uC608) SSR\uC774\uB780 \uC11C\uBC84\uC0AC\uC774\uB4DC \uB80C\uB354\uB9C1(Server Side Rendering)\uC758 \uC57D\uC790\uB85C \uC11C\uBC84\uB85C\uBD80\uD130 \uC644\uC804\uD558\uAC8C \uB9CC\uB4E4\uC5B4\uC9C4 HTML \uD30C\uC77C\uC744 \uBC1B\uC544\uC640 \uD398\uC774\uC9C0 \uC804\uCCB4\uB97C \uB80C\uB354\uB9C1 \uD558\uB294 \uBC29\uC2DD\uC774\uB2E4." })),
            React.createElement(Fieldset_1["default"], null,
                React.createElement(Label_1["default"], { htmlFor: "wordsCtgrSlct", desc: "\uCE74\uD14C\uACE0\uB9AC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.", mandatory: true }),
                React.createElement(Select_1["default"], { options: [
                        {
                            name: "CS",
                            value: 0
                        },
                        {
                            name: "FrontEnd",
                            value: 1
                        },
                        {
                            name: "BackEnd",
                            value: 2
                        },
                        {
                            name: "App",
                            value: 3
                        },
                    ], id: "wordsCtgrSlct", name: "wordsCategorySlct" })),
            React.createElement(Fieldset_1["default"], null,
                React.createElement(Label_1["default"], { htmlFor: "wordsCtgrCbx", desc: "\uCE74\uD14C\uACE0\uB9AC\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694. (\uC911\uBCF5\uC120\uD0DD \uAC00\uB2A5)", mandatory: true }),
                React.createElement(MultiSelect_1["default"], { options: [
                        {
                            name: "CS",
                            value: 0
                        },
                        {
                            name: "FrontEnd",
                            value: 1
                        },
                        {
                            name: "BackEnd",
                            value: 2
                        },
                        {
                            name: "App",
                            value: 3
                        },
                    ], id: "wordsCtgrCbx", name: "wordsCategoryCbx" })),
            React.createElement(Fieldset_1["default"], null,
                React.createElement(ButtonWrap_1["default"], null,
                    React.createElement(Button_1["default"], { desc: "\uCDE8\uC18C", id: "cancleRegWord", bgc: "#666", color: "#fff", width: "40%", height: "40px", onClick: cancleRegWordClick }),
                    React.createElement(Button_1["default"], { desc: "\uB2E8\uC5B4 \uB4F1\uB85D\uD558\uAE30", id: "submitRegWord", bgc: "var(--color-point)", color: "#fff", width: "60%", height: "40px" }))))));
};
exports["default"] = RegistWord;
var templateObject_1;
