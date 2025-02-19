import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Item from './Item'
import Dependency from '../dependencies/Dependency'
import DrawingPath from '../dependencies/DrawingPath'
// import ItemGroup from './ItemGroup'

import { _get, arraysEqual, keyBy } from '../utility/generic'
import { getGroupOrders, getVisibleItems } from '../utility/calendar'

const canResizeLeft = (item, canResize) => {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'left' || value === 'both'
}

const canResizeRight = (item, canResize) => {
  const value =
    _get(item, 'canResize') !== undefined ? _get(item, 'canResize') : canResize
  return value === 'right' || value === 'both' || value === true
}

export default class Items extends Component {
  static propTypes = {
    groups: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    dependencies: PropTypes.array,

    canvasTimeStart: PropTypes.number.isRequired,
    canvasTimeEnd: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,

    dragSnap: PropTypes.number,
    minResizeWidth: PropTypes.number,
    selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    canChangeGroup: PropTypes.bool.isRequired,
    canMove: PropTypes.bool.isRequired,
    canResize: PropTypes.oneOf([true, false, 'left', 'right', 'both']),
    canSelect: PropTypes.bool,
    canDrawDependency: PropTypes.bool,

    keys: PropTypes.object.isRequired,

    moveResizeValidator: PropTypes.func,
    itemSelect: PropTypes.func,
    itemDrag: PropTypes.func,
    itemDrop: PropTypes.func,
    itemResizing: PropTypes.func,
    itemResized: PropTypes.func,

    onItemDoubleClick: PropTypes.func,
    onItemContextMenu: PropTypes.func,
    onDependencyClick: PropTypes.func,
    onDrawingStart: PropTypes.func,
    onDrawingFinish: PropTypes.func,
    onDependencyDraw: PropTypes.func,
    drawingPathColor: PropTypes.string,
    selectedDependencyZIndex: PropTypes.number,

    itemRenderer: PropTypes.func,
    selected: PropTypes.array,

    dimensionItems: PropTypes.array,
    groupTops: PropTypes.array,
    useResizeHandle: PropTypes.bool,
    scrollRef: PropTypes.object
  }

  static defaultProps = {
    selected: []
  }

  shouldComponentUpdate(nextProps) {
    return !(
      arraysEqual(nextProps.groups, this.props.groups) &&
      arraysEqual(nextProps.items, this.props.items) &&
      arraysEqual(nextProps.dimensionItems, this.props.dimensionItems) &&
      (nextProps.dependencies &&
        this.props.dependencies &&
        arraysEqual(nextProps.dependencies, this.props.dependencies)) &&
      nextProps.keys === this.props.keys &&
      nextProps.canvasTimeStart === this.props.canvasTimeStart &&
      nextProps.canvasTimeEnd === this.props.canvasTimeEnd &&
      nextProps.canvasWidth === this.props.canvasWidth &&
      nextProps.selectedItem === this.props.selectedItem &&
      nextProps.selected === this.props.selected &&
      nextProps.dragSnap === this.props.dragSnap &&
      nextProps.minResizeWidth === this.props.minResizeWidth &&
      nextProps.canChangeGroup === this.props.canChangeGroup &&
      nextProps.canMove === this.props.canMove &&
      nextProps.canResize === this.props.canResize &&
      nextProps.canSelect === this.props.canSelect
    )
  }

  isSelected(item, itemIdKey) {
    if (!this.props.selected) {
      return this.props.selectedItem === _get(item, itemIdKey)
    } else {
      let target = _get(item, itemIdKey)
      return this.props.selected.includes(target)
    }
  }

  getVisibleItems(canvasTimeStart, canvasTimeEnd) {
    const { keys, items } = this.props

    return getVisibleItems(items, canvasTimeStart, canvasTimeEnd, keys)
  }

  getDependencyDrawingRef = el => (this.dependencyDrawingRef = el)

  render() {
    const {
      canvasTimeStart,
      canvasTimeEnd,
      dimensionItems,
      keys,
      groups,
      dependencies
    } = this.props
    const { itemIdKey, itemGroupKey } = keys

    const groupOrders = getGroupOrders(groups, keys)
    const visibleItems = this.getVisibleItems(
      canvasTimeStart,
      canvasTimeEnd,
      groupOrders
    )
    const sortedDimensionItems = keyBy(dimensionItems, 'id')
    const groupedDependencies = dependencies
      ? groupDependenciesByVisibleItems(dependencies, sortedDimensionItems)
      : {}

    return (
      <div className="rct-items">
        {visibleItems
          .filter(item => sortedDimensionItems[_get(item, itemIdKey)])
          .map(item => (
            <Item
              key={_get(item, itemIdKey)}
              item={item}
              keys={this.props.keys}
              order={groupOrders[_get(item, itemGroupKey)]}
              dimensions={
                sortedDimensionItems[_get(item, itemIdKey)].dimensions
              }
              selected={this.isSelected(item, itemIdKey)}
              canChangeGroup={
                _get(item, 'canChangeGroup') !== undefined
                  ? _get(item, 'canChangeGroup')
                  : this.props.canChangeGroup
              }
              canMove={
                _get(item, 'canMove') !== undefined
                  ? _get(item, 'canMove')
                  : this.props.canMove
              }
              canResizeLeft={canResizeLeft(item, this.props.canResize)}
              canResizeRight={canResizeRight(item, this.props.canResize)}
              canSelect={
                _get(item, 'canSelect') !== undefined
                  ? _get(item, 'canSelect')
                  : this.props.canSelect
              }
              canDrawDependency={this.props.canDrawDependency}
              useResizeHandle={this.props.useResizeHandle}
              groupTops={this.props.groupTops}
              canvasTimeStart={this.props.canvasTimeStart}
              canvasTimeEnd={this.props.canvasTimeEnd}
              canvasWidth={this.props.canvasWidth}
              dragSnap={this.props.dragSnap}
              minResizeWidth={this.props.minResizeWidth}
              onResizing={this.props.itemResizing}
              onResized={this.props.itemResized}
              moveResizeValidator={this.props.moveResizeValidator}
              onDrag={this.props.itemDrag}
              onDrop={this.props.itemDrop}
              onItemDoubleClick={this.props.onItemDoubleClick}
              onContextMenu={this.props.onItemContextMenu}
              onSelect={this.props.itemSelect}
              itemRenderer={this.props.itemRenderer}
              scrollRef={this.props.scrollRef}
              dependencyDrawingRef={this.dependencyDrawingRef}
              onDrawingStart={this.props.onDrawingStart}
              onDrawingFinish={this.props.onDrawingFinish}
              onDependencyDraw={this.props.onDependencyDraw}
              hiddenDependencies={groupedDependencies[_get(item, itemIdKey)]}
            />
          ))}

        {dependencies &&
          dependencies
            .filter(
              d =>
                isVisibleDimensionItem(sortedDimensionItems, d.fromId) &&
                isVisibleDimensionItem(sortedDimensionItems, d.toId)
            )
            .map(dependency => {
              return (
                <Dependency
                  key={dependency.id}
                  dependency={dependency}
                  fromDimensionItem={sortedDimensionItems[dependency.fromId]}
                  toDimensionItem={sortedDimensionItems[dependency.toId]}
                  onClick={this.props.onDependencyClick}
                  selectedZIndex={this.props.selectedDependencyZIndex}
                />
              )
            })}

        <DrawingPath
          innerRef={this.getDependencyDrawingRef}
          color={this.props.drawingPathColor}
        />
      </div>
    )
  }
}

function isVisibleDimensionItem(dimensionItems, itemId) {
  if (!dimensionItems[itemId]) return false

  const { order } = dimensionItems[itemId].dimensions

  return order !== undefined && order !== null
}

function groupDependenciesByVisibleItems(dependencies, dimensionItems) {
  return dependencies.reduce((acc, d) => {
    if (
      isVisibleDimensionItem(dimensionItems, d.fromId) &&
      isVisibleDimensionItem(dimensionItems, d.toId)
    )
      return acc

    if (!acc[d.fromId]) {
      acc[d.fromId] = []
    }

    if (!acc[d.toId]) {
      acc[d.toId] = []
    }
    acc[d.fromId].push(d)
    acc[d.toId].push(d)

    return acc
  }, {})
}
