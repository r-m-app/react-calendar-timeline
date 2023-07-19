"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultItemRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaultItemRenderer = function defaultItemRenderer(_ref) {
  var item = _ref.item,
      itemContext = _ref.itemContext,
      getItemProps = _ref.getItemProps,
      getResizeProps = _ref.getResizeProps,
      getDrawProps = _ref.getDrawProps;

  var _getResizeProps = getResizeProps(),
      leftResizeProps = _getResizeProps.left,
      rightResizeProps = _getResizeProps.right;

  var _getDrawProps = getDrawProps(),
      leftDrawProps = _getDrawProps.left,
      rightDrawProps = _getDrawProps.right;

  return _react["default"].createElement("div", getItemProps(item.itemProps), itemContext.useDrawDependency && _react["default"].createElement("div", _extends({
    className: "rct-item-link-handle rct-item-link-handle-left",
    style: {
      display: itemContext.selected ? 'none' : undefined
    }
  }, leftDrawProps)), itemContext.useResizeHandle ? _react["default"].createElement("div", leftResizeProps) : '', _react["default"].createElement("div", {
    className: "rct-item-content",
    style: {
      maxHeight: "".concat(itemContext.dimensions.height)
    }
  }, itemContext.title), itemContext.useResizeHandle ? _react["default"].createElement("div", rightResizeProps) : '', itemContext.useDrawDependency && _react["default"].createElement("div", _extends({
    className: "rct-item-link-handle rct-item-link-handle-right",
    style: {
      display: itemContext.selected ? 'none' : undefined
    }
  }, rightDrawProps)));
}; // TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.


exports.defaultItemRenderer = defaultItemRenderer;
defaultItemRenderer.propTypes = {
  item: _propTypes["default"].any,
  itemContext: _propTypes["default"].any,
  getItemProps: _propTypes["default"].any,
  getResizeProps: _propTypes["default"].any,
  getDrawProps: _propTypes["default"].any
};