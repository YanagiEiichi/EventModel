var EventModel = require('../eventmodel.js');

var result = [];

var A = function(name) { this.name = name; };
A.prototype = new EventModel();

var a1 = new A('a1');
var a2 = new A('a2');

a1.on('test', function(e) {
  if(e.target === a1) result.push(0);
});

a2.on('test', function(e) {
  if(e.target === a2) result.push(2);
});

A.prototype.on('test', function(e) {
  if(e.target === a1) result.push(1);
  if(e.target === a2) result.push(3);
});

a1.trigger('test');
a2.trigger('test');

console.log(result.every(function(e, i) { return e === i; }));

