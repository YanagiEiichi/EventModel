/************************************************
  PROJECT: EventModel
  LATEST: 2015-01-13
  LICENCE: MIT
  AUTHOR: yanagieiichi@web-tinker.com
  GIT: git@github.com:YanagiEiichi/EventModel
************************************************/
var EventModel;
void function(){
  // Shared heap
  var map=new WeakMap;
  // Get or create a list
  var touch=function(target,name){
    var heap=map.get(target);
    if(!heap)map.set(target,heap={});
    return heap[name]||(heap[name]=[]);
  };
  // Private Event Class
  var Event,getEventStatus;
  void function(){
    // Init the heap for Event constructor
    var eMap=new WeakMap;
    Event=function(type,target){
      eMap.set(this,0);
      this.type=type;
      this.target=target;
    };
    // Private static method
    getEventStatus=function(e){return eMap.get(e);};
    // Some methods that used to stop propagation
    Event.prototype={
      stopPropagation:function(){
       if(getEventStatus(this)<1)eMap.set(this,1);
      },
      stopImmediatePropagation:function(){
        if(getEventStatus(this)<2)eMap.set(this,2);
      }
    };
  }();
  // Main constructor
  EventModel=function(prototype){
    if(!(this instanceof EventModel))return new EventModel(prototype);
    this.on=EventModel.on.bind(null,this);
    this.off=EventModel.off.bind(null,this);
    this.trigger=EventModel.trigger.bind(null,this);
    if(prototype)Object.setPrototypeOf(this,prototype);
  };
  // Public static methods
  EventModel.on=function(target,name,handler){
    touch(target,name).push(handler);
  };
  EventModel.off=function(target,name,handler){
    var list=touch(target,name);
    list.splice(list.indexOf(handler),1);
  };
  EventModel.trigger=function(target,name,args){
    var event=new Event(name,target);
    while(target){
      touch(target,name).some(function(handler){
        var propagation=true;
        handler.apply(target,[event].concat(args));
        return getEventStatus(event)==2;
      });
      // Bubble 
      if(getEventStatus(event))target=null;
      else target=Object.getPrototypeOf(target);
    }; 
  };
}();

