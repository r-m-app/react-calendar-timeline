import interact from 'interactjs'

const PATH_ID = 'rct-dependency-drawing-path'
const ACTIVE_HANDLE_CLASS = 'rct-item-link-handle-active'

export const initDragItemDependency = (
  drawHandle,
  getDrawingSvgElement,
  getScrollRef
) => {
  let _drawingPath

  interact(drawHandle)
    .draggable({
      autoScroll: true
    })
    .on('dragstart', e => {
      const drawingSvgElement = getDrawingSvgElement()
      _drawingPath = drawingSvgElement.getElementById(PATH_ID)

      e.target.classList.add(ACTIVE_HANDLE_CLASS)

      drawingSvgElement.style.display = 'block'
      drawingSvgElement.style.width = 0
      drawingSvgElement.style.height = 0
    })
    .on('dragmove', e => {
      const targetRect = e.target.getBoundingClientRect()
      const scrollRef = getScrollRef()

      const X1 =
        targetRect.left +
        targetRect.width / 4 +
        scrollRef.scrollLeft -
        scrollRef.offsetLeft
      const Y1 =
        targetRect.top +
        targetRect.height / 4 +
        scrollRef.scrollTop -
        scrollRef.offsetTop +
        window.scrollY
      const X2 = e.pageX + scrollRef.scrollLeft - scrollRef.offsetLeft - 8
      const Y2 = e.pageY + scrollRef.scrollTop - scrollRef.offsetTop

      const width = Math.abs(X2 - X1)
      const height = Math.abs(Y2 - Y1)

      const drawingSvgElement = getDrawingSvgElement()

      drawingSvgElement.style.width = width + 8
      drawingSvgElement.style.height = height + 8
      drawingSvgElement.style.left = Math.min(X1, X2)
      drawingSvgElement.style.top = Math.min(Y1, Y2)

      _drawingPath.setAttribute(
        'd',
        `M ${X2 > X1 ? 4 : width + 4} ${Y2 > Y1 ? 4 : height + 4} L ${
          X2 > X1 ? width + 4 : 4
        } ${Y2 > Y1 ? height + 4 : 4}`
      )
    })
    .on('dragend', e => {
      // this.setState({ drawingDependency: false })

      e.target.classList.remove(ACTIVE_HANDLE_CLASS)

      _drawingPath = undefined

      getDrawingSvgElement().style = {}
    })
}
