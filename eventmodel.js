/************************************************
  PROJECT: EventModel
  LATEST: 2014-09-25
  LICENCE: MIT
  AUTHOR: yanagieiichi@web-tinker.com
  GIT: git@github.com:YanagiEiichi/EventModel
************************************************/
function EventModel(target){
  if(target)return EventModel.call(target);
  if(this==self)return new EventModel;
  var events={},cache={},space=/\s+/g;
  return this.on=this.addEventListener=function(name,func){
    var s,n,i;
    if(name instanceof Object)for(i in name)this.on(i,name[i]);
    else for(s=name.split(space),i=0;n=s[i];i++)
      n in events?events[n].push(func):(events[n]=[func]);
    return this;
  },this.off=this.removeEventListener=function(name,func){
    var s,n,i,j,o;
    if(name instanceof Object)for(i in name)this.off(i,name[i]);
    else for(s=name.split(space),i=0;n=s[i];i++)
      if(n in events)if(!func)delete events[n];
      else for(j=0,o=events[n];j<o.length;j++)
        if(o[j]==func)events[n].splice(j,1),j=o.length;
    return this;
  },this.one=this.once=function(name,func){
    return this.on(name,callee);
    function callee(){
      func.apply(this,arguments);
      this.off(name,callee);
    };
  },this.trigger=function(name,args,delay){
    var s,n,i,j,k,o,args=args||[];
    for(s=name.split(space),i=0;n=s[i];i++){
      if(!(n in cache))
        cache[n]=new RegExp("^"+n.replace(/\./g,"\\.")+"\\b");
      for(j in events)if(cache[n].test(j))
        for(k=0,o=events[j].slice(0);k<o.length;k++)
          fire(this,o[k],args,delay);
    };
    return this;
  },this.emit=function(name){
    var args=Array.prototype.slice.call(arguments,1);
    return this.trigger(name,args);
  },this;
  function fire(o,f,a,d){
    d?f.apply(o,a):setTimeout(function(){f.apply(o,a);});
  };
};

