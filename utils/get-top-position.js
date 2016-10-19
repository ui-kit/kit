/** Arguments
  *   target: clicked element
  *   container: element with relative position that top style position will refer to
  *   options:
  *     - itemHeight: height of item that will recieve top position value
  *     - adjustment: adjust offset of target by adjustment amount
  *     - padding: amount of padding to consider for nearBottom case
  */

var defaultOptions = {
  adjustment: 0,
  itemHeight: 0,
  padding: 12
}

export default function(target, container, options) {
  var options = Object.assign(defaultOptions, options);
  var targetOffset = target.offsetTop;
  var targetAdjustment = targetOffset + options.adjustment;
  var containerHeight = container.clientHeight;

  // position bottom of item near bottom of container
  var bottomBleed = containerHeight - targetAdjustment - options.itemHeight;
  var nearBottom = bottomBleed < options.padding
  if (nearBottom) return containerHeight - options.itemHeight - options.padding;

  // position top of item on top of target element
  return targetAdjustment
}