"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Label_1 = require("./Label");
var Checkbox_1 = require("./Checkbox");
var MultiSelectStyled = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n"])));
var MSGridStyled = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  flex: auto;\n  min-width: 50%;\n  &:nth-child(n + 3) {\n    margin-top: 8px;\n  }\n"], ["\n  flex: auto;\n  min-width: 50%;\n  &:nth-child(n + 3) {\n    margin-top: 8px;\n  }\n"])));
var MultiSelectComponent = function (_a) {
    var id = _a.id, name = _a.name, options = _a.options;
    return (react_1["default"].createElement(MultiSelectStyled, { id: id, name: name, options: options }, options.map(function (o) {
        return (react_1["default"].createElement(MSGridStyled, { key: o.name },
            react_1["default"].createElement(Checkbox_1["default"], { name: name, value: o.value, id: name + o.value }),
            react_1["default"].createElement(Label_1["default"], { htmlFor: name + o.value, desc: o.name })));
    })));
};
MultiSelectComponent.defaultProps = {};
exports["default"] = MultiSelectComponent;
var templateObject_1, templateObject_2;
