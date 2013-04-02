// var offcanvas = require('off-canvas');
//
// var menu = offcanvas({
//   container: document.body,
//   content: document.querySelector('.js-mobile-menu')
//   trigger: '.js-toggle-off-canvas',
//   className: 'is-open'
// });
// 
// menu.open();
// menu.close();

function OffCanvas(options) {
  options = options || {};
  this.options = options;
  this.container = options.container;
  this.content = options.content;
  this.bodyElement = options.bodyElement;
  this.className = options.className;
  this.trigger = options.trigger;
  this.close = this.close.bind(this);
  this.open = this.open.bind(this);
  this.isOpen = false;
}

OffCanvas.prototype.open = function() {
  this.container.classList.add(this.className);
  window.addEventListener('resize', this.close);
  this.bodyElement.addEventListener('click', this.close);
  this.isOpen = true;
};

OffCanvas.prototype.close = function() {
  this.container.classList.remove(this.className);
  window.removeEventListener('resize', this.close);
  this.bodyElement.removeEventListener('click', this.close);
  this.isOpen = false;
};

OffCanvas.prototype.toggle = function() {
  return ((this.isOpen) ? this.close() : this.open());
};

OffCanvas.prototype.disable = function() {
  this.trigger.removeEventListener('click');
};

OffCanvas.prototype.enable = function() {
  this.trigger.addEventListener('click', function(event){
    event.preventDefault();
    this.toggle();
  }.bind(this));
};

module.exports = function(options) {
  var o =  new OffCanvas(options);
  o.enable();
  return o;
};

module.exports.OffCanvas = OffCanvas;