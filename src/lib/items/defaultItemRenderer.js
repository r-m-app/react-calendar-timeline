import React from 'react'
import PropTypes from 'prop-types'

export const defaultItemRenderer = ({
  item,
  itemContext,
  getItemProps,
  getResizeProps,
  getDrawProps
}) => {
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
  const { left: leftDrawProps, right: rightDrawProps } = getDrawProps()
  return (
    <div {...getItemProps(item.itemProps)}>
      {itemContext.useDrawDependency && (
        <div
          className="rct-item-link-handle rct-item-link-handle-left"
          style={{ display: itemContext.selected ? 'none' : undefined }}
          {...leftDrawProps}
        />
      )}

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
          className="rct-item-link-handle rct-item-link-handle-right"
          style={{ display: itemContext.selected ? 'none' : undefined }}
          {...rightDrawProps}
        />
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
  getDrawProps: PropTypes.any
}
