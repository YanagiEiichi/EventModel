/************************************************
  PROJECT: EventModel
  LATEST: 2013-09-23
  LICENCE: MIT
  AUTHOR: yanagieiichi@web-tinker.com
  GIT: git@github.com:YanagiEiichi/EventModel
************************************************/
function EventModel(){
  var events,cache,space,fire;
  fire=function(o,f,s,m){
    m?f.apply(o,s):setTimeout(function(){f.apply(o,s);});
  },events={},cache={},space=/\s+/g;
  this.on=function(e,f){
    var s,n,i;
    if(e instanceof Object)
      for(i in e)this.on(i,e[i]);
    else for(s=e.split(space),i=0;n=s[i];i++)
      n in events?events[n].push(f):(events[n]=[f]);
    return this;
  },this.off=function(e,f){
    var s,n,i,j;
    if(e instanceof Object)
      for(i in e)this.off(i,e[i]);
    else for(s=e.split(space),i=0;n=s[i];i++)
      if(n in events)if(f)
        for(j=0;j<events[n].length;j++)(events[n][j]==f)&&events[n].splice(j,1);
      else delete events[n];
    return this;
  },this.trigger=function(e,a,m){
    var s,n,i,j,k;
    for(s=e.split(space),i=0;n=s[i];i++){
      if(!(n in cache))cache[n]=new RegExp("^"+n.replace(/\./g,"\\.")+"\\b");
      for(j in events)if(cache[n].test(j))
        for(k=0;k<events[j].length;k++)fire(this,events[j][k],a,m);
    };
    return this;
  };
};
