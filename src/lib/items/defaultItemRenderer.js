import React from 'react'
import PropTypes from 'prop-types'

export const defaultItemRenderer = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
  getDrawProps,
  getDropProps,
  hiddenDependencies
}) => {
  console.log('hiddenDependencies', hiddenDependencies, item.id)
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  const { left: leftDropProps, right: rightDropProps } = getDropProps()
  const { left: leftDrawProps, right: rightDrawProps } = getDrawProps()
  return (
    <div {...getItemProps(item.itemProps)}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : ''}

      <div
        className="rct-item-content"
        style={{ maxHeight: `${itemContext.dimensions.height}` }}
      >
        {itemContext.title}
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : ''}

      {itemContext.useDrawDependency && (
        <div
          className="rct-item-link-handle-container"
          style={{ display: itemContext.selected ? 'none' : undefined }}
        >
          <div
            className="rct-item-link-handle rct-item-link-handle-left"
            {...leftDrawProps}
          />
          <div
            className="rct-item-link-handle rct-item-link-handle-right"
            {...rightDrawProps}
          />

          <div className="rct-item-dependency-dropzone" {...leftDropProps} />
          <div className="rct-item-dependency-dropzone" {...rightDropProps} />

          {hiddenDependencies &&
            hiddenDependencies.map(d => (
              <span
                key={d.id}
                className={
                  d.fromId === item.id
                    ? `rct-hidden-dependency-${d.fromSide}`
                    : `rct-hidden-dependency-${d.toSide}`
                }
                style={{ background: d.color }}
              />
            ))}
        </div>
      )}
    </div>
  )
}

// TODO: update this to actual prop types. Too much to change before release
// future me, forgive me.
defaultItemRenderer.propTypes = {
  item: PropTypes.any,
  itemContext: PropTypes.any,
  getItemProps: PropTypes.any,
  getResizeProps: PropTypes.any,
  getDrawProps: PropTypes.any,
  getDropProps: PropTypes.any,
  hiddenDependencies: PropTypes.array
}
