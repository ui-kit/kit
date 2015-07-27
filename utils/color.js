var color = require('color');

class Color extends color {
  constructor (value) {
    super(value);
    this._value = value;
    try{color.call(this, value)}catch(e) {color.call(this, 'gray')}
  }

  clone() { return new Color(this._value); }

  shade(amount) {
    var lightness = this.lightness();
    var unit = Math.round((100 - lightness) * (1 / 3));
    var clone = this.clone();
    clone.setChannel('hsl', 2, lightness + (unit * .8 * amount));
    return clone;
  }

  get direction() {
    return (this.lightness() < 70 ? 'darken' : 'lighten');
  }

  get inverse() {
    var direction = (this.lightness() < 70 ? 'darken' : 'lighten');
    return this.clone()[direction](1).desaturate(1).negate();
  }

  get derived () {
    var clone = this.clone();
    clone.rotate(60);
    return clone;
  }

  get dark () { return this.shade(-1); }
  get darker () { return this.shade(-2); }
  get darkest () { return this.shade(-3); }

  get light () { return this.shade(1); }
  get lighter () { return this.shade(2); }
  get lightest () { return this.shade(3); }

  toString () {
    return this.hslaString();
  }
}

export default Color;
