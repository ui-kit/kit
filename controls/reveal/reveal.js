
export var initialState = {isActive: false};
export var displayName = 'Reveal';

exports.toggle = function (evt) {
  this.state.isActive ?
    this.hideReveal(evt) :
    this.showReveal(evt);
};

exports.hideReveal = function (evt) {
  if (!this.state.isActive) return;
  if (evt) evt.stopPropagation();
  this.setState({isActive: false});
  window.removeEventListener('click', this.onWindowClick);
};

exports.showReveal = function (evt) {
  var self = this;
  if (this.state.isActive) return;
  this.setState({isActive: true});
  setTimeout(function () {
    window.addEventListener('click', self.onWindowClick);
  }, 0);
};

exports.onWindowClick = function(evt) {
  if (!this.isMounted()) return;
  var el = this.getDOMNode();
  if (el && !elContains(el, evt.target) || this.props.hideOnClick) {
    this.hideReveal();
  }
};

exports.componentWillUnmount = function () {
  window.removeEventListener('click', this.onWindowClick);
};

function elContains (container, el) {
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
