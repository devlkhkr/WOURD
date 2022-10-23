"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var link_1 = require("next/link");
var router_1 = require("next/router");
var styled_components_1 = require("styled-components");
var Icon_1 = require("./atoms/Icon");
var IconText_1 = require("./atoms/IconText");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var FooterWrap = styled_components_1["default"].footer(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ul {\n    display: flex;\n    align-items: center;\n    // border-top: 1px solid var(--color-grey);\n    height: var(--height-footer);\n    li {\n      // border-right: 1px solid var(--color-grey);\n      background-color: var(--color-white);\n      height: 100%;\n      display: flex;\n      flex: auto;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      &:first-child {\n        // border-left: 1px solid var(--color-grey);\n      }\n      &.active {\n        a {\n          color: var(--color-point);\n        }\n      }\n      a {\n        text-decoration: none;\n        font-weight: var(--weight-medium);\n        color: var(--color-grey);\n        font-size: 12px;\n        text-align: center;\n      }\n    }\n  }\n"], ["\n  ul {\n    display: flex;\n    align-items: center;\n    // border-top: 1px solid var(--color-grey);\n    height: var(--height-footer);\n    li {\n      // border-right: 1px solid var(--color-grey);\n      background-color: var(--color-white);\n      height: 100%;\n      display: flex;\n      flex: auto;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      &:first-child {\n        // border-left: 1px solid var(--color-grey);\n      }\n      &.active {\n        a {\n          color: var(--color-point);\n        }\n      }\n      a {\n        text-decoration: none;\n        font-weight: var(--weight-medium);\n        color: var(--color-grey);\n        font-size: 12px;\n        text-align: center;\n      }\n    }\n  }\n"])));
var Footer = function () {
    var router = router_1.useRouter();
    return (react_1["default"].createElement(FooterWrap, null,
        react_1["default"].createElement("ul", null,
            react_1["default"].createElement("li", { className: router.pathname == "/MyWords" ? "active" : "" },
                react_1["default"].createElement(link_1["default"], { href: "/MyWords" },
                    react_1["default"].createElement("a", null,
                        react_1["default"].createElement(Icon_1["default"], { iconShape: free_solid_svg_icons_1.faNoteSticky, iconWidth: 24, iconHeight: 24, bottom: 4, align: "center" }),
                        react_1["default"].createElement(IconText_1["default"], { text: "\uB2E8\uC5B4\uC7A5" })))),
            react_1["default"].createElement("li", { className: router.pathname == "/" ? "active" : "" },
                react_1["default"].createElement(link_1["default"], { href: "/" },
                    react_1["default"].createElement("a", null,
                        react_1["default"].createElement(Icon_1["default"], { iconShape: free_solid_svg_icons_1.faHouse, iconWidth: 24, iconHeight: 24, bottom: 4, align: "center" }),
                        react_1["default"].createElement(IconText_1["default"], { text: "\uBA54\uC778" })))),
            react_1["default"].createElement("li", { className: router.pathname == "/Setting" ? "active" : "" },
                react_1["default"].createElement(link_1["default"], { href: "/Setting" },
                    react_1["default"].createElement("a", null,
                        react_1["default"].createElement(Icon_1["default"], { iconShape: free_solid_svg_icons_1.faInfoCircle, iconWidth: 24, iconHeight: 24, bottom: 4, align: "center" }),
                        react_1["default"].createElement(IconText_1["default"], { text: "\uC124\uC815" })))))));
};
exports["default"] = Footer;
var templateObject_1;
