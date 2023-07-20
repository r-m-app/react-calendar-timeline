"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDragItemDependency = void 0;

var _interactjs = _interopRequireDefault(require("interactjs"));

var _domHelpers = require("../utility/dom-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PATH_ID = 'rct-dependency-drawing-path';
var ACTIVE_HANDLE_CLASS = 'rct-item-link-handle-active';

var initDragItemDependency = function initDragItemDependency(drawHandle, getDrawingSvgElement, getScrollRef, onDragStart, onDragEnd) {
  var _drawingPath;

  (0, _interactjs["default"])(drawHandle).draggable({
    autoScroll: true
  }).on('dragstart', function (e) {
    var drawingSvgElement = getDrawingSvgElement();
    _drawingPath = drawingSvgElement.getElementById(PATH_ID);
    e.target.classList.add(ACTIVE_HANDLE_CLASS);
    drawingSvgElement.style.display = 'block';
    drawingSvgElement.style.width = 0;
    drawingSvgElement.style.height = 0;
    onDragStart && onDragStart();
  }).on('dragmove', function (e) {
    var targetRect = e.target.getBoundingClientRect();
    var scrollRef = getScrollRef();
    var offset = (0, _domHelpers.getSumOffset)(scrollRef);
    var scrolls = (0, _domHelpers.getSumScroll)(scrollRef);
    var X1 = targetRect.left + targetRect.width / 4 - offset.offsetLeft + scrolls.scrollLeft;
    var Y1 = targetRect.top + targetRect.height / 4 - offset.offsetTop + scrolls.scrollTop + window.scrollY;
    var X2 = e.pageX - offset.offsetLeft + scrolls.scrollLeft - 8;
    var Y2 = e.pageY - offset.offsetTop + scrolls.scrollTop;
    var width = Math.abs(X2 - X1);
    var height = Math.abs(Y2 - Y1);
    var drawingSvgElement = getDrawingSvgElement();
    drawingSvgElement.style.width = width + 8;
    drawingSvgElement.style.height = height + 8;
    drawingSvgElement.style.left = Math.min(X1, X2);
    drawingSvgElement.style.top = Math.min(Y1, Y2);

    _drawingPath.setAttribute('d', "M ".concat(X2 > X1 ? 4 : width + 4, " ").concat(Y2 > Y1 ? 4 : height + 4, " L ").concat(X2 > X1 ? width + 4 : 4, " ").concat(Y2 > Y1 ? height + 4 : 4));
  }).on('dragend', function (e) {
    e.target.classList.remove(ACTIVE_HANDLE_CLASS);
    _drawingPath = undefined;
    getDrawingSvgElement().style = {};
    onDragEnd && onDragEnd();
  });
};

exports.initDragItemDependency = initDragItemDependency;