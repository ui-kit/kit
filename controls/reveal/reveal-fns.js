exports.componentWillUnmount = function () {
  window.removeEventListener('click', this.onWindowClick);
};

exports.hideReveal = function (evt) {
  if (!this.state.isActive || this.state.isLocked) return
  if (evt) evt.stopPropagation();
  this.setState({isActive: false})
}

exports.lockReveal = function (evt) {
  var self = this;
  if (this.state.isLocked) return;
  this.setState({isActive: true, isLocked: true})
  setTimeout(function () {
    window.addEventListener('click', self.onWindowClick);
  }, 0);
}

exports.onWindowClick = function(evt) {
  if (!this.isMounted() || this.props.manualHide) return;
  this.unLockReveal();
};

exports.showReveal = function (evt) {
  if (this.state.isActive || this.state.isLocked) return;
  this.setState({isActive: true})
}

exports.toggle = function (evt) {
  this.state.isLocked ?
    this.unLockReveal(evt) :
    this.lockReveal(evt);
};

exports.unLockReveal = function (evt) {
  if (!this.state.isLocked) return;
  if (evt) evt.stopPropagation();
  this.setState({isActive: false, isLocked: false})
  window.removeEventListener('click', this.onWindowClick);
}