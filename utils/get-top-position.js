/*
 * offset - distance from clicked element and container with relative position
 * top - distance from clicked element to top of window
 * itemHeight - height of the item that will be positioned
 * containerHeight - height of the container with relative position
 * adjustment - adjust offset of clicked element (used for some cases)
*/

export default function(offset, top, itemHeight, containerHeight, adjustment) {
  if (!adjustment) adjustment = 0;
  top = top > offset ? offset : top;
  var offsetAdjustment = offset + adjustment;
  var padding = window.innerWidth > 800 ? 24 : 12;
  
  // if item will show up too close to the bottom
  var bottomBleed = containerHeight - offsetAdjustment - itemHeight;
  var isNearBottom = bottomBleed < padding;

  // if clicked element is in lower two thirds of screen
  var windowUpperThird = window.innerHeight / 3;
  var isLower = top + adjustment > windowUpperThird;
  
  // if item would fit directly above clicked element and below window top
  var itemFits = isLower && itemHeight < top;

  if (itemFits) {
    return offsetAdjustment - itemHeight - padding;
  } else if (isNearBottom) {
    return containerHeight - itemHeight - padding;
  } else if (isLower) {
    return offset - top + padding;
  } else {
    return offsetAdjustment;
  }
}