import React from 'react'
import PropTypes from 'prop-types'
import { DEPENDENCY_DIRECTIONS } from './constants.js'

class Dependency extends React.PureComponent {
  static propTypes = {
    dependency: PropTypes.object,
    fromDimensionItem: PropTypes.object,
    toDimensionItem: PropTypes.object,

    onClick: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      isSelected: false
    }
  }

  handlePathOver = () => {
    this.setState({ isSelected: true })
  }

  handlePathOut = () => {
    this.setState({ isSelected: false })
  }

  handleClick = e => {
    this.props.onClick(this.props.dependency, e)
  }

  render() {
    const { fromId, toId, fromSide, toSide, color } = this.props.dependency
    const coords = calculatePathCoords(
      this.props.fromDimensionItem,
      this.props.toDimensionItem,
      fromSide,
      toSide
    )
    const dX = 80
    const dY = 14
    const svgStyles = calculateSvgStyles(coords, dX, dY, this.state.isSelected)
    const pathId = `${fromId}-${fromSide}_${toId}-${toSide}`
    const d = drawDependencyPath(
      coords,
      svgStyles.width,
      svgStyles.height,
      dX,
      dY,
      fromSide,
      toSide
    )

    return (
      <svg className="rct-dependency-svg" key={pathId} style={svgStyles}>
        <defs>
          <marker
            id={pathId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="12"
            markerHeight="10"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 1 L 12 5 L 0 9 z" fill={color} />
          </marker>
        </defs>
        <path
          d={d}
          style={getPathStyles(color, this.state.isSelected)}
          markerEnd={`url(#${pathId})`}
          className="rct-dependency-path"
        />
        <path
          d={d}
          className="rct-dependency-invisible-path"
          onMouseOver={this.handlePathOver}
          onMouseOut={this.handlePathOut}
          onClick={this.handleClick}
        />
      </svg>
    )
  }
}

export default Dependency

function getPathStyles(color, isSelected) {
  return {
    stroke: color,
    strokeWidth: isSelected ? 2 : undefined
  }
}

function calculatePathCoords(fromItem, toItem, fromSide, toSide) {
  const X1 =
    fromSide === DEPENDENCY_DIRECTIONS.START
      ? fromItem.dimensions.left
      : fromItem.dimensions.left + fromItem.dimensions.width
  const Y1 = fromItem.dimensions.top + fromItem.dimensions.height / 2
  const X2 =
    toSide === DEPENDENCY_DIRECTIONS.START
      ? toItem.dimensions.left
      : toItem.dimensions.left + toItem.dimensions.width
  const Y2 = toItem.dimensions.top + toItem.dimensions.height / 2

  return { X1, Y1, X2, Y2 }
}

function calculateSvgStyles({ X1, Y1, X2, Y2 }, dX, dY, isSelected) {
  const width = Math.abs(X1 - X2) + dX * 2

  return {
    left: Math.min(X1, X2) - dX,
    top: Math.min(Y1, Y2) - dY,
    width,
    height: Math.abs(Y1 - Y2) + dY * 2,
    zIndex: isSelected ? 990 : undefined
  }
}

function drawDependencyPath(
  { X1, Y1, X2, Y2 },
  width,
  height,
  dX,
  dY,
  fromSide,
  toSide
) {
  // let cDY = 25;
  const isSameSide = fromSide === toSide
  const arrowWidth = 11
  const cDX = 40

  const reverseStart =
    isSameSide && fromSide === DEPENDENCY_DIRECTIONS.START
      ? true
      : fromSide === DEPENDENCY_DIRECTIONS.START
  const reverseEnd =
    isSameSide && toSide === DEPENDENCY_DIRECTIONS.FINISH
      ? true
      : toSide === DEPENDENCY_DIRECTIONS.FINISH

  const arrowDX = reverseEnd ? 2 : -2
  const X = X1 <= X2 ? [dX, width - dX + arrowDX] : [width - dX, dX + arrowDX]
  const Y = Y1 <= Y2 ? [dY, height - dY] : [height - dY, dY]

  const deltaX = width - dX * 2 + 1
  const cDY = deltaX / Math.sqrt(deltaX)

  return drawPath(
    X,
    Y,
    cDX,
    cDY,
    arrowWidth,
    reverseStart,
    reverseEnd,
    isSameSide
  )
}

function drawPath(
  X,
  Y,
  cDX,
  cDY,
  arrowWidth,
  reverseStart,
  reverseEnd,
  isSameSide
) {
  const startDirection = reverseStart ? -1 : 1
  const endDirection = reverseEnd ? -1 : 1
  const arrowShift = arrowWidth * endDirection

  let _cDX = cDX + cDY * (isSameSide ? 4 : 6)
  let _cDY = cDY * (isSameSide ? 1 : 1.3)

  if (Y[0] > Y[1]) {
    _cDY = -_cDY
  }

  let cDYEnd = _cDY

  if (X[0] <= X[1]) {
    _cDY = 0
    cDYEnd = 0
  }

  if (reverseStart) {
    _cDY = X[0] <= X[1] ? (Y[0] > Y[1] ? -cDY : cDY) : 0
  }

  if (reverseEnd) {
    cDYEnd = X[0] <= X[1] ? (Y[0] > Y[1] ? -cDY : cDY) : 0
  }

  return `M ${X[0]} ${Y[0]} C ${X[0] + _cDX * startDirection} ${Y[0] +
    _cDY}, ${X[1] - _cDX * endDirection} ${Y[1] - cDYEnd} ${X[1] -
    arrowShift} ${Y[1]} L ${X[1]} ${Y[1]}`
}
