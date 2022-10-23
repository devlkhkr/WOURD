"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var SelectStyled = styled_components_1["default"].select(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  appearance: none;\n  width: 100%;\n  height: 32px;\n  border: 1px solid var(--color-lightgrey);\n  background-color: #fff;\n  padding: 0 8px;\n"], ["\n  appearance: none;\n  width: 100%;\n  height: 32px;\n  border: 1px solid var(--color-lightgrey);\n  background-color: #fff;\n  padding: 0 8px;\n"])));
var SelectComponent = function (_a) {
    var id = _a.id, name = _a.name, options = _a.options;
    return (react_1["default"].createElement(SelectStyled, { id: id, name: name, options: options }, options.map(function (o) {
        return (react_1["default"].createElement("option", { key: o.value, value: o.value }, o.name));
    })));
};
SelectComponent.defaultProps = {};
exports["default"] = SelectComponent;
var templateObject_1;
