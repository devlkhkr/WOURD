"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CardMain_1 = require("./components/molecules/CardMain");
var Home = function () {
    var _a = react_1.useState([
        {
            word: "SSR",
            unravel: "Server Side Rendering",
            desc: "SSR이란 서버사이드 렌더링(Server Side Rendering)의 약자로 서버로부터 완전하게 만들어진 HTML 파일을 받아와 페이지 전체를 렌더링 하는 방식이다.",
            fliped: false,
            state: "",
            focus: false
        },
        {
            word: "Maturity",
            desc: "(서비스) 성숙도, 완성도",
            fliped: false,
            state: "",
            focus: false
        },
        {
            word: "Framework",
            desc: "프레임워크(Framework)란, 소프트웨어의 구체적인 부분에 해당하는 설계와 구현을 재사용이 가능하게끔 일련의 협업화된 형태로 클래스들을 제공하는 것이다.",
            fliped: false,
            state: "",
            focus: false
        },
        {
            word: "Hypervisor",
            desc: "하이퍼바이저(Hypervisor)는 가상 머신(Virtual Machine, VM)을 생성하고 구동하는 소프트웨어이다. 가상 머신 모니터(Virtual Machine Monitor, VMM)라고도 불리는 하이퍼바이저는 하이퍼바이저 운영 체제와 가상 머신의 리소스를 분리해 VM의 생성과 관리를 지원한다.",
            fliped: false,
            state: "",
            focus: false
        },
        {
            word: "다형성",
            desc: "다형성이란(polymorphism), 같은 이름을 사용하지만 구현 내용이 다르거나 매개변수가 달라서 하나의 이름으로 다양한 기능을 수행할 수 있는 개념이다.",
            fliped: false,
            state: "",
            focus: false
        },
        {
            word: "결측치",
            desc: "결측치(Missing Value)는 직역하면 '값이 없는 것'을 의미한다. 결측치는 사용하는 언어마다 여러가지로 표현된다. (NA, NaN, Null 등)",
            fliped: false,
            state: "",
            focus: false
        },
    ]), exposeWord = _a[0], setExposeWord = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(CardMain_1["default"], { exposeWord: exposeWord })));
};
exports["default"] = Home;
