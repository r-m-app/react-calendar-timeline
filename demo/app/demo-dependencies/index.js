/* eslint-disable no-console */
import React, { Component } from 'react'
import moment from 'moment'

import Timeline, {
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker,
} from 'react-calendar-timeline'

var minTime = moment()
  .add(-6, 'months')
  .valueOf()
var maxTime = moment()
  .add(6, 'months')
  .valueOf()

var keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end'
}

export default class App extends Component {
  constructor(props) {
    super(props)

    const groups = [{
      "id": "1",
      "title": "Group 1",
      "bgColor": "#ab8cf7"
    }, {
      "id": "2",
      "title": "Group 2",
      "bgColor": "#fff"
    }, {
      "id": "3",
      "title": "Group 3",
      "bgColor": "#ab8cf7"
    }, {
      "id": "4",
      "title": "Group 4",
      "bgColor": "#fff"
    }];
    const items = [{
      "id": "1",
      "group": "1",
      "title": "#1: I'll compress the digital GB driver, that should array the SMTP microchip!",
      "start": moment().startOf('day').add(-2, 'day').format('x'),
      "end": moment().startOf('day').add(3, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "",
      "bgColor": "rgba(201, 154, 244, 0.6)",
      "selectedBgColor": "rgba(201, 154, 244, 1)",
      "color": "#4b078c"
    }, {
      "id": "2",
      "group": "2",
      "title": "#2: I'll hack the bluetooth RSS array, that should transmitter the HTTP circuit!",
      "start": moment().startOf('day').add(2, 'day').format('x'),
      "end": moment().startOf('day').add(4, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "item-weekend",
      "bgColor": "rgba(200, 171, 244, 0.6)",
      "selectedBgColor": "rgba(200, 171, 244, 1)",
      "color": "#3c0a87"
    }, {
      "id": "3",
      "group": "2",
      "title": "#3: Transmitter the HTTP circuit!",
      "start": moment().startOf('day').add(1, 'day').format('x'),
      "end": moment().startOf('day').add(5, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "item-weekend",
      "bgColor": "rgba(200, 171, 244, 0.6)",
      "selectedBgColor": "rgba(200, 171, 244, 1)",
      "color": "#3c0a87"
    }, {
      "id": "4",
      "group": "3",
      "title": "#4: Try to calculate circuit!",
      "start": moment().startOf('day').add(3, 'day').format('x'),
      "end": moment().startOf('day').add(7, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "item-weekend",
      "bgColor": "rgba(200, 171, 244, 0.6)",
      "selectedBgColor": "rgba(200, 171, 244, 1)",
      "color": "#3c0a87"
    }, {
      "id": "5",
      "group": "3",
      "title": "#5: Try to calculate circuit!",
      "start": moment().startOf('day').add(1, 'day').format('x'),
      "end": moment().startOf('day').add(4, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "item-weekend",
      "bgColor": "rgba(200, 171, 244, 0.6)",
      "selectedBgColor": "rgba(200, 171, 244, 1)",
      "color": "#3c0a87"
    }, {
      "id": "6",
      "group": "4",
      "title": "#6: Try to calculate circuit!",
      "start": moment().startOf('day').add(5, 'day').format('x'),
      "end": moment().startOf('day').add(6, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "item-weekend",
      "bgColor": "rgba(200, 171, 244, 0.6)",
      "selectedBgColor": "rgba(200, 171, 244, 1)",
      "color": "#3c0a87"
    }, {
      "id": "7",
      "group": "4",
      "title": "#7: Try to calculate circuit!",
      "start": moment().startOf('day').add(2, 'day').format('x'),
      "end": moment().startOf('day').add(4, 'day').format('x'),
      "canMove": true,
      "canResize": "both",
      "className": "item-weekend",
      "bgColor": "rgba(200, 171, 244, 0.6)",
      "selectedBgColor": "rgba(200, 171, 244, 1)",
      "color": "#3c0a87"
    }];
    const dependencies = [
      {
        id: '1',
        fromId: '1',
        fromSide: 'finish',
        toId: '2',
        toSide: 'start',
        color: 'red'
      },
      {
        id: '2',
        fromId: '2',
        fromSide: 'finish',
        toId: '3',
        toSide: 'start',
        color: 'blue'
      },
      {
        id: '3',
        fromId: '3',
        fromSide: 'finish',
        toId: '4',
        toSide: 'start',
        color: 'green'
      },
      {
        id: '5',
        fromId: '4',
        fromSide: 'finish',
        toId: '1',
        toSide: 'start',
        color: 'violet'
      },
      {
        id: '6',
        fromId: '5',
        fromSide: 'finish',
        toId: '7',
        toSide: 'finish',
        color: 'green'
      }
    ]
    const defaultTimeStart = moment()
      .startOf('day')
      .add(-4, 'day')
      .toDate()
    const defaultTimeEnd = moment()
      .startOf('day')
      .add(15, 'day')
      .toDate()

    this.state = {
      groups,
      items,
      dependencies,
      defaultTimeStart,
      defaultTimeEnd,
      isDependenciesEnabled: true,
      canDrawDependency: true
    }
  }

  handleCanvasClick = (groupId, time) => {
    console.log('Canvas clicked', groupId, moment(time).format())
  }

  handleCanvasDoubleClick = (groupId, time) => {
    console.log('Canvas double clicked', groupId, moment(time).format())
  }

  handleCanvasContextMenu = (group, time) => {
    console.log('Canvas context menu', group, moment(time).format())
  }

  handleItemClick = (itemId, _, time) => {
    console.log('Clicked: ' + itemId, moment(time).format())
  }

  handleItemSelect = (itemId, _, time) => {
    console.log('Selected: ' + itemId, moment(time).format())
  }

  handleItemDoubleClick = (itemId, _, time) => {
    console.log('Double Click: ' + itemId, moment(time).format())
  }

  handleItemContextMenu = (itemId, _, time) => {
    console.log('Context Menu: ' + itemId, moment(time).format())
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, groups } = this.state

    const group = groups[newGroupOrder]

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
                start: dragTime,
                end: dragTime + (item.end - item.start),
                group: group.id
              })
            : item
      )
    })

    console.log('Moved', itemId, dragTime, newGroupOrder)
  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(
        item =>
          item.id === itemId
            ? Object.assign({}, item, {
                start: edge === 'left' ? time : item.start,
                end: edge === 'left' ? item.end : time
              })
            : item
      )
    })

    console.log('Resized', itemId, time, edge)
  }

  // this limits the timeline to -6 months ... +6 months
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
    }
  }

  handleZoom = (timelineContext, unit) => {
    console.log('Zoomed', timelineContext, unit)
  }

  handleDependencyClick = (dependency, e) => {
    console.log('Dependency clicked', dependency, e)
  }

  handleDependencyCreate = (from, to) => {
    console.log('Dependency Dropped', from, to)
    this.setState({ dependencies: [...this.state.dependencies, { id: Date.now().toString(), fromId: from.id, fromSide: from.side, toId: to.id, toSide: to.side, color: 'green' }]})
  }

  render() {
    const { groups, items, dependencies, defaultTimeStart, defaultTimeEnd } = this.state

    return (
      <>
        <div>
          <input
            type="checkbox"
            checked={this.state.isDependenciesEnabled}
            onChange={() => {
              console.log();
              this.setState({ isDependenciesEnabled: !this.state.isDependenciesEnabled})
            }}
          />
          Dependencies enabled
        </div>

        {this.state.isDependenciesEnabled && (
          <div>
            <input
              type="checkbox"
              checked={this.state.canDrawDependency}
              onChange={() => {
                console.log();
                this.setState({ canDrawDependency: !this.state.canDrawDependency})
              }}
            />
            Can draw dependency
          </div>
        )}

        <Timeline
          groups={groups}
          items={items}
          dependencies={this.state.isDependenciesEnabled ? dependencies : undefined}
          keys={keys}
          sidebarWidth={150}
          sidebarContent={<div>Above The Left</div>}
          canMove
          canResize="right"
          canSelect
          itemsSorted
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          defaultTimeStart={defaultTimeStart}
          defaultTimeEnd={defaultTimeEnd}
          onCanvasClick={this.handleCanvasClick}
          onCanvasDoubleClick={this.handleCanvasDoubleClick}
          onCanvasContextMenu={this.handleCanvasContextMenu}
          onItemClick={this.handleItemClick}
          onItemSelect={this.handleItemSelect}
          onItemContextMenu={this.handleItemContextMenu}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
          onItemDoubleClick={this.handleItemDoubleClick}
          onTimeChange={this.handleTimeChange}
          onZoom={this.handleZoom}
          onDependencyClick={this.handleDependencyClick}
          canDrawDependency={this.state.isDependenciesEnabled && this.state.canDrawDependency}
          onDependencyDraw={this.handleDependencyCreate}
          drawingPathColor="red"
          buffer={3}
          selectedDependencyZIndex={80}
        >
          <TimelineMarkers>
            <TodayMarker />
            <CustomMarker
              date={
                moment()
                  .startOf('day')
                  .valueOf() +
                1000 * 60 * 60 * 2
              }
            />
            <CustomMarker
              date={moment()
                .add(3, 'day')
                .valueOf()}
            >
              {({ styles }) => {
                const newStyles = { ...styles, backgroundColor: 'blue' }
                return <div style={newStyles} />
              }}
            </CustomMarker>
            <CursorMarker />
          </TimelineMarkers>
        </Timeline>
      </>
    )
  }
}
