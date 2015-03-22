var EventModel = require('../eventmodel.js');

var result = [];

var A = function() {};
var a = new A();

// Test1
EventModel.on(a, 'test1', function(e) {
  result.push(0); 
});
EventModel.on(a, 'test1', function(e) {
  result.push(1); 
  e.stopImmediatePropagation();
});
EventModel.on(a, 'test1', function(e) {
  throw 1;
});
EventModel.on(A.prototype, 'test1', function(e) {
  throw 1;
});
EventModel.trigger(a, 'test1');

// Test2
EventModel.on(a, 'test2', function(e) {
  result.push(2);
  e.stopPropagation();
});
EventModel.on(a, 'test2', function(e) {
  result.push(3);
});
EventModel.on(A.prototype, 'test2', function(e) {
  throw 2;
});
EventModel.trigger(a, 'test2');

// Test3
EventModel.on(a, 'test3', function(e) {
  result.push(4);
});
EventModel.on(a, 'test3', function(e) {
  result.push(5);
});
EventModel.on(A.prototype, 'test3', function(e) {
  result.push(6);
}); 
EventModel.on(A.prototype, 'test3', function(e) {
  result.push(7);
}); 
EventModel.on(Object.prototype, 'test3', function(e) {
  result.push(8);
});
EventModel.trigger(a, 'test3');

// Check result
console.log(result.every(function(e, i) {
  return e === i;
}));
