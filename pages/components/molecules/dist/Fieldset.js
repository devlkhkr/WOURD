"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var FieldsetStyled = styled_components_1["default"].fieldset(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 16px 0;\n  & + & {\n    border-top: 1px solid var(--color-ash);\n  }\n"], ["\n  padding: 16px 0;\n  & + & {\n    border-top: 1px solid var(--color-ash);\n  }\n"])));
var FieldsetComponent = function (_a) {
    var children = _a.children;
    return react_1["default"].createElement(FieldsetStyled, null, children);
};
FieldsetComponent.defaultProps = {};
exports["default"] = FieldsetComponent;
var templateObject_1;
