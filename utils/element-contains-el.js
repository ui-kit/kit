function elContains (container, el) {
  if (!container || !el) return;
  var l = container.children.length;
    var i = 0;

    for (i; i < l; i+=1) {
      var child = container.children[i];
      if (child == el) {
        return true;
      } else if (child.children.length) {
        if (elContains(child, el)) {
          return true;
        }
      }
    }

    return false;
}

export default elContains;