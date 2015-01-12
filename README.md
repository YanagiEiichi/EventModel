## EventModel

#### Demo

```html
<script src="EventModel.2.0.js"></script>
<script>
// Define a constructor A
var A=function(){};

// Create a instance from A
var a=new A;

// Bind 'test' event for 'a'
EventModel.on(a,"test",function(e){
  console.log("a",e);
});

// Bind 'test' event for 'A.prototype'
EventModel.on(A.prototype,"test",function(e){
  console.log("A.prototype",e);
  e.stopImmediatePropagation();
});

// Bind 'test' event for 'A.prototype'
EventModel.on(A.prototype,"test",function(e){
  console.log("A.prototype",e);
  e.stopPropagation();
});

// Bind 'test' event for 'Object.prototype'
EventModel.on(Object.prototype,"test",function(e){
  console.log("Object.prototype",e);
});

// Trigger the 'test' event on 'a',
// the event will bubbling along its prototype chain
EventModel.trigger(a,"test");
</script>
```

