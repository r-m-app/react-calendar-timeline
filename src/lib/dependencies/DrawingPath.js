import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class DrawingPath extends PureComponent {
  static propTypes = {
    innerRef: PropTypes.func,
    color: PropTypes.string
  }

  static defaultProps = {
    color: 'green'
  }

  render() {
    const { color, innerRef } = this.props

    return (
      <svg className="rct-dependency-drawing" ref={innerRef}>
        <defs>
          <marker
            id="dependency-marker-0"
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
          d="M 0 0 L 0 0"
          markerEnd={`url(#dependency-marker-0)`}
          id="rct-dependency-drawing-path"
          stroke={color}
        />
      </svg>
    )
  }
}

export default DrawingPath
