exports.componentWillUnmount = function () {
  window.removeEventListener('click', this.onWindowClick);
};

exports.onWindowClick = function(evt) {
  if (!this.isMounted() || this.props.manualHide) return;
  this.unLockReveal();
};

exports.toggle = function (evt) {
  this.state.isLocked ?
    this.unLockReveal(evt) :
    this.lockReveal(evt);
};

exports.showReveal = function (evt) {
  if (this.state.isActive || this.state.isLocked) return;
  this.setState({isActive: true})
}

exports.hideReveal = function (evt) {
  if (!this.state.isActive || this.state.isLocked) return
  if (evt) evt.stopPropagation();
  this.setState({isActive: false})
}

exports.unLockReveal = function (evt) {
  if (!this.state.isLocked) return;
  if (evt) evt.stopPropagation();
  this.setState({isActive: false, isLocked: false});
  setTimeout(() => this.setState({isInDom: false}), 100);
  window.removeEventListener('click', this.onWindowClick);
}

exports.lockReveal = function (evt) {
  var self = this;
  if (this.state.isLocked) return;
  this.setState({isInDom: true, isLocked: true})
  setTimeout(function () {
    window.addEventListener('click', self.onWindowClick);
  }, 0);
  setTimeout(() => this.setState({isActive: true}), 100)
}
