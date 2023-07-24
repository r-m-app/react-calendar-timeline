"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrawingPath =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DrawingPath, _PureComponent);

  function DrawingPath() {
    _classCallCheck(this, DrawingPath);

    return _possibleConstructorReturn(this, _getPrototypeOf(DrawingPath).apply(this, arguments));
  }

  _createClass(DrawingPath, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          color = _this$props.color,
          innerRef = _this$props.innerRef;
      return _react["default"].createElement("svg", {
        className: "rct-dependency-drawing",
        ref: innerRef
      }, _react["default"].createElement("defs", null, _react["default"].createElement("marker", {
        id: "dependency-marker-0",
        viewBox: "0 0 10 10",
        refX: "9",
        refY: "5",
        markerWidth: "12",
        markerHeight: "10",
        orient: "auto-start-reverse",
        markerUnits: "userSpaceOnUse"
      }, _react["default"].createElement("path", {
        d: "M 0 1 L 12 5 L 0 9 z",
        fill: color
      }))), _react["default"].createElement("path", {
        d: "M 0 0 L 0 0",
        markerEnd: "url(#dependency-marker-0)",
        id: "rct-dependency-drawing-path",
        stroke: color
      }));
    }
  }]);

  return DrawingPath;
}(_react.PureComponent);

_defineProperty(DrawingPath, "propTypes", {
  innerRef: _propTypes["default"].func,
  color: _propTypes["default"].string
});

_defineProperty(DrawingPath, "defaultProps", {
  color: 'green'
});

var _default = DrawingPath;
exports["default"] = _default;