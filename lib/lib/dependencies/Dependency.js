"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dependency =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Dependency, _React$PureComponent);

  function Dependency(props) {
    var _this;

    _classCallCheck(this, Dependency);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dependency).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handlePathOver", function () {
      _this.setState({
        isSelected: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePathOut", function () {
      _this.setState({
        isSelected: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      _this.props.onClick(_this.props.dependency, e);
    });

    _this.state = {
      isSelected: false
    };
    return _this;
  }

  _createClass(Dependency, [{
    key: "render",
    value: function render() {
      var _this$props$dependenc = this.props.dependency,
          fromId = _this$props$dependenc.fromId,
          toId = _this$props$dependenc.toId,
          fromSide = _this$props$dependenc.fromSide,
          toSide = _this$props$dependenc.toSide,
          color = _this$props$dependenc.color;
      var coords = calculatePathCoords(this.props.fromDimensionItem, this.props.toDimensionItem, fromSide, toSide);
      var dX = 80;
      var dY = 14;
      var svgStyles = calculateSvgStyles(coords, dX, dY, this.state.isSelected);
      var pathId = "".concat(fromId, "-").concat(fromSide, "_").concat(toId, "-").concat(toSide);
      var d = drawDependencyPath(coords, svgStyles.width, svgStyles.height, dX, dY, fromSide, toSide);
      return _react["default"].createElement("svg", {
        className: "rct-dependency-svg",
        key: pathId,
        style: svgStyles
      }, _react["default"].createElement("defs", null, _react["default"].createElement("marker", {
        id: pathId,
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
        d: d,
        style: getPathStyles(color, this.state.isSelected),
        markerEnd: "url(#".concat(pathId, ")"),
        className: "rct-dependency-path"
      }), _react["default"].createElement("path", {
        d: d,
        className: "rct-dependency-invisible-path",
        onMouseOver: this.handlePathOver,
        onMouseOut: this.handlePathOut,
        onClick: this.handleClick
      }));
    }
  }]);

  return Dependency;
}(_react["default"].PureComponent);

_defineProperty(Dependency, "propTypes", {
  dependency: _propTypes["default"].object,
  fromDimensionItem: _propTypes["default"].object,
  toDimensionItem: _propTypes["default"].object,
  onClick: _propTypes["default"].func
});

var _default = Dependency;
exports["default"] = _default;

function getPathStyles(color, isSelected) {
  return {
    stroke: color,
    strokeWidth: isSelected ? 2 : undefined
  };
}

function calculatePathCoords(fromItem, toItem, fromSide, toSide) {
  var X1 = fromSide === 'start' ? fromItem.dimensions.left : fromItem.dimensions.left + fromItem.dimensions.width;
  var Y1 = fromItem.dimensions.top + fromItem.dimensions.height / 2;
  var X2 = toSide === 'start' ? toItem.dimensions.left : toItem.dimensions.left + toItem.dimensions.width;
  var Y2 = toItem.dimensions.top + toItem.dimensions.height / 2;
  return {
    X1: X1,
    Y1: Y1,
    X2: X2,
    Y2: Y2
  };
}

function calculateSvgStyles(_ref, dX, dY, isSelected) {
  var X1 = _ref.X1,
      Y1 = _ref.Y1,
      X2 = _ref.X2,
      Y2 = _ref.Y2;
  var width = Math.abs(X1 - X2) + dX * 2;
  return {
    left: Math.min(X1, X2) - dX,
    top: Math.min(Y1, Y2) - dY,
    width: width,
    height: Math.abs(Y1 - Y2) + dY * 2,
    zIndex: isSelected ? 990 : undefined
  };
}

function drawDependencyPath(_ref2, width, height, dX, dY, fromSide, toSide) {
  var X1 = _ref2.X1,
      Y1 = _ref2.Y1,
      X2 = _ref2.X2,
      Y2 = _ref2.Y2;
  // let cDY = 25;
  var isSameSide = fromSide === toSide;
  var arrowWidth = 11;
  var cDX = 40;
  var reverseStart = isSameSide && fromSide === 'start' ? true : fromSide === 'start';
  var reverseEnd = isSameSide && toSide === 'end' ? true : toSide === 'end';
  var arrowDX = reverseEnd ? 2 : -2;
  var X = X1 <= X2 ? [dX, width - dX + arrowDX] : [width - dX, dX + arrowDX];
  var Y = Y1 <= Y2 ? [dY, height - dY] : [height - dY, dY];
  var deltaX = width - dX * 2 + 1;
  var cDY = deltaX / Math.sqrt(deltaX);
  return drawPath(X, Y, cDX, cDY, arrowWidth, reverseStart, reverseEnd, isSameSide);
}

function drawPath(X, Y, cDX, cDY, arrowWidth, reverseStart, reverseEnd, isSameSide) {
  var startDirection = reverseStart ? -1 : 1;
  var endDirection = reverseEnd ? -1 : 1;
  var arrowShift = arrowWidth * endDirection;

  var _cDX = cDX + cDY * (isSameSide ? 4 : 6);

  var _cDY = cDY * (isSameSide ? 1 : 1.3);

  if (Y[0] > Y[1]) {
    _cDY = -_cDY;
  }

  var cDYEnd = _cDY;

  if (X[0] <= X[1]) {
    _cDY = 0;
    cDYEnd = 0;
  }

  if (reverseStart) {
    _cDY = X[0] <= X[1] ? Y[0] > Y[1] ? -cDY : cDY : 0;
  }

  if (reverseEnd) {
    cDYEnd = X[0] <= X[1] ? Y[0] > Y[1] ? -cDY : cDY : 0;
  }

  return "M ".concat(X[0], " ").concat(Y[0], " C ").concat(X[0] + _cDX * startDirection, " ").concat(Y[0] + _cDY, ", ").concat(X[1] - _cDX * endDirection, " ").concat(Y[1] - cDYEnd, " ").concat(X[1] - arrowShift, " ").concat(Y[1], " L ").concat(X[1], " ").concat(Y[1]);
}