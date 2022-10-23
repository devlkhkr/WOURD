"use strict";
exports.__esModule = true;
var router_1 = require("next/router");
var Button_1 = require("../components/atoms/Button");
var MyWordsComponent = function () {
    var router = router_1.useRouter();
    var addNewWordClick = function () {
        router.push("/MyWords/Regist");
    };
    return (React.createElement("div", null,
        React.createElement(Button_1["default"], { desc: "\uC0C8\uB85C\uC6B4 \uB2E8\uC5B4 \uB4F1\uB85D\uD558\uAE30", id: "cancleRegWord", bgc: "#666", color: "#fff", height: "40px", onClick: addNewWordClick })));
};
exports["default"] = MyWordsComponent;
