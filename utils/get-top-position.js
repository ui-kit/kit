/** Arguments
  *   target: clicked element
  *   container: element with relative position that top style position will refer to
  *   options:
  *     - itemHeight: height of item that will recieve top position value
  *     - adjustment: adjust offset of target by adjustment amount
  *     - padding: amount of padding to place above/below item
  */

var defaultOptions = {
  adjustment: 0,
  itemHeight: 0,
  padding: window.top.innerWidth > 800 ? 24 : 12
}

export default function(target, container, options) {
  var options = Object.assign(defaultOptions, options);

  var targetBounds = target.getBoundingClientRect();
  var targetOffset = target.offsetTop;
  var targetAdjustment = targetOffset + options.adjustment;
  var targetTop = window !== window.top ? computeFrameOffset(window, 0) + targetAdjustment : targetBounds.top + options.adjustment;

  var containerHeight = container.scrollHeight;
    
  // if no item height is given, always place top of item near the top of the window
  if (!options.itemHeight) return targetOffset - targetTop + options.padding;

  // position bottom of item near bottom of container
  var bottomBleed = containerHeight - targetAdjustment - options.itemHeight;
  var fitsAtTop = containerHeight - targetAdjustment + targetTop - options.padding > options.itemHeight;
  var nearBottom = bottomBleed < options.padding && !fitsAtTop;

  // if target element is in lower two thirds of window
  var windowUpperThird = window.top.innerHeight / 3;

  // position top of item near the top of window
  var nearTop = targetTop + options.adjustment - options.padding > windowUpperThird;
  
  // position bottom of item above the target element
  var aboveTarget = nearTop && options.itemHeight + options.padding < targetTop - options.padding;

  if (aboveTarget) return targetAdjustment - options.itemHeight - options.padding;
  if (nearBottom) return containerHeight - options.itemHeight - options.padding;
  if (nearTop) return targetAdjustment - targetTop + options.padding;

  // position top of item on top of target element
  return targetAdjustment
}

function computeFrameOffset(win, top) {
    if (win !== window.top) {
        var rect = win.frameElement.getBoundingClientRect();
        top += rect.top;
        top = computeFrameOffset(win.parent, top); // recursion
    }
    return top;
};