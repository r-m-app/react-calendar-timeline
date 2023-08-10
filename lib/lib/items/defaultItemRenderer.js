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
      getDrawProps = _ref.getDrawProps,
      getDropProps = _ref.getDropProps,
      hiddenDependencies = _ref.hiddenDependencies;

  var _getResizeProps = getResizeProps(),
      leftResizeProps = _getResizeProps.left,
      rightResizeProps = _getResizeProps.right;

  var _getDropProps = getDropProps(),
      leftDropProps = _getDropProps.left,
      rightDropProps = _getDropProps.right;

  var _getDrawProps = getDrawProps(),
      leftDrawProps = _getDrawProps.left,
      rightDrawProps = _getDrawProps.right;

  return _react["default"].createElement("div", getItemProps(item.itemProps), itemContext.useResizeHandle ? _react["default"].createElement("div", leftResizeProps) : '', _react["default"].createElement("div", {
    className: "rct-item-content",
    style: {
      maxHeight: "".concat(itemContext.dimensions.height)
    }
  }, itemContext.title), itemContext.useResizeHandle ? _react["default"].createElement("div", rightResizeProps) : '', itemContext.useDrawDependency && _react["default"].createElement("div", {
    className: "rct-item-link-handle-container",
    style: {
      display: itemContext.selected ? 'none' : undefined
    }
  }, _react["default"].createElement("div", _extends({
    className: "rct-item-link-handle rct-item-link-handle-left"
  }, leftDrawProps)), _react["default"].createElement("div", _extends({
    className: "rct-item-link-handle rct-item-link-handle-right"
  }, rightDrawProps)), _react["default"].createElement("div", _extends({
    className: "rct-item-dependency-dropzone"
  }, leftDropProps)), _react["default"].createElement("div", _extends({
    className: "rct-item-dependency-dropzone"
  }, rightDropProps)), hiddenDependencies && hiddenDependencies.map(function (d) {
    return _react["default"].createElement("span", {
      key: d.id,
      className: d.fromId === item.id ? "rct-hidden-dependency-".concat(d.fromSide) : "rct-hidden-dependency-".concat(d.toSide),
      style: {
        background: d.color
      }
    });
  })));
}; // TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.


exports.defaultItemRenderer = defaultItemRenderer;
defaultItemRenderer.propTypes = {
  item: _propTypes["default"].any,
  itemContext: _propTypes["default"].any,
  getItemProps: _propTypes["default"].any,
  getResizeProps: _propTypes["default"].any,
  getDrawProps: _propTypes["default"].any,
  getDropProps: _propTypes["default"].any,
  hiddenDependencies: _propTypes["default"].array
};