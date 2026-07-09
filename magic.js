var M="https://media.cricheroes.in/user_profile/";
var P=[
["Avinash","1781546330578_1c4BDWWmHeZZ.jpg","RHB","Right-arm medium",135,693,116,["Captain","Wildcard"],"allr","The skipper who leads with the bat and bites with the ball — 116 wickets of pure leadership."],
["Satyam","1686711598723_8uzQsDOduoUD.jpg","LHB","Left-arm fast",156,1391,43,["Destroyer","Aspirant"],"allr","A southpaw destroyer who swings it both ways — 1391 runs and rising."],
["Abhishek Srivastava","1753046905564_bdbc6UTS1esz.jpg","RHB","Right-arm fast",39,64,42,["Aspirant"],"bowl","A genuine quick who lets the new ball do the talking."],
["Abhishek Tiwari","1735477198133_yfkC3RXSDTlD.jpeg","RHB","Right-arm medium",76,274,16,["Classicist","Aspirant"],"allr","Textbook strokes and tidy medium pace — dependable in every situation."],
["Kuldeep Singh","1743824564611_FLdZIUv2pKR2.jpg","RHB","Right-arm medium",130,1349,129,["Accumulator","Wildcard"],"allr","1349 runs and 129 wickets — the engine-room all-rounder."],
["Mukesh","","RHB","",17,39,0,[],"bat","A scrappy competitor who battles for every run the team needs."],
["Sanju","1781397887137_S3Ecu9XN7zvV.jpg","RHB","Right-arm medium",125,830,69,["Classicist","Aspirant"],"allr","Elegant runs and 69 wickets — class personified with bat and ball."],
["Chandan","","RHB","Right-arm fast",10,88,2,[],"bat","Quietly effective with the willow — a steady middle-order presence."],
["Pankaj","","RHB","Right-arm medium",11,106,4,[],"allr","Handy with bat and ball — the utility man every squad treasures."],
["Rohan Bhawnani","1776401012825_CPiVWnz8KccF.jpeg","RHB","Right-arm medium",21,241,0,["Accumulator"],"bat","Patient, precise and tough to dislodge — the glue of the middle order."],
["Sukhi","1780671558209_0SI1O3w6eeBr.jpg","RHB","Right-arm Off Break",378,6866,386,["Accumulator","Economist"],"allr","378 matches, 6866 runs, 386 wickets — the ultimate veteran all-rounder."],
["Saurabh Rai","1734154128879_DE84U9kde17K.jpg","RHB","Right-arm fast",48,1057,54,["Hard Hitter","Aspirant"],"allr","1000+ runs and 54 wickets — the explosive all-round package."],
["Shashank","","RHB","Right-arm Off Break",329,6926,375,["Destroyer","Economist"],"allr","329 matches, 6926 runs, 375 wickets — a destroyer with the bat and a miser with the ball."],
["Ravi Srivastava","1744434308364_IgHkX9wSttmh.jpg","LHB","Left-arm medium",80,365,3,["Steady Batter"],"bat","The left-hander who brings balance and a cool head to the top order."],
["Ashwani","1766931215187_1SVHyRRNONvo.jpg","RHB","Right-arm Leg Break",72,938,89,["Hard Hitter","Wildcard"],"allr","Leg-spin web in hand, brute power in the swing — a true matchwinner."],
["Himanshu","","RHB","Right-arm Leg Break",38,165,12,["Steady Batter","Aspirant"],"allr","Calm at the crease and crafty with the leg-break."]
];
var curF="all",curQ="";
function ini(n){return n.split(" ").map(function(w){return w[0];}).join("").slice(0,2).toUpperCase();}
function render(){
  var g=document.getElementById("grid"),shown=0;
  g.innerHTML="";
  for(var i=0;i<P.length;i++){
    var p=P[i],name=p[0],bat=p[2],bowl=p[3],tags=p[7],cat=p[8];
    if(curF!=="all"&&cat!==curF)continue;
    var hay=(name+" "+bat+" "+bowl+" "+tags.join(" ")).toLowerCase();
    if(curQ&&hay.indexOf(curQ)===-1)continue;
    // Every card renders INSTANTLY with an initials avatar — the squad never waits on a
    // network request. The photo (local images/ first, CricHeroes CDN as fallback) is loaded
    // in the background and only swapped in once it has fully loaded. If a request hangs or
    // fails (e.g. your IP is rate-limited), the avatar simply stays — nothing breaks or stalls.
    var fn=p[1];
    var img='<div class="ph">'+ini(name)+'</div>';
    var tg="";
    for(var t=0;t<tags.length;t++){tg+='<span class="tg '+(t%2?"r":"b")+'">'+tags[t]+'</span>';}
    var c=document.createElement("div");
    c.className="card";
    c.style.animationDelay=(shown*0.05)+"s";
    c.innerHTML=
      '<div class="flip">'+
        '<div class="face front">'+
          '<div class="shine"></div>'+
          '<div class="ring">'+img+'</div>'+
          '<h3>'+name+'</h3>'+
          '<div class="style">'+bat+(bowl?" · "+bowl:"")+'</div>'+
          '<div class="tags">'+tg+'</div>'+
          '<div class="flipnote">↻ hover / tap for stats</div>'+
        '</div>'+
        '<div class="face back">'+
          '<div class="shine"></div>'+
          '<h3>'+name+'</h3>'+
          '<div class="liner">"'+p[9]+'"</div>'+
          '<div class="statrow"><div><b>'+p[4]+'</b><span>Matches</span></div><div><b>'+p[5]+'</b><span>Runs</span></div><div><b>'+p[6]+'</b><span>Wickets</span></div></div>'+
        '</div>'+
      '</div>';
    // tap-to-flip on touch devices
    c.addEventListener("click",function(){this.classList.toggle("flipped");});
    // holographic shine follows the cursor
    c.addEventListener("mousemove",function(e){
      var b=this.getBoundingClientRect();
      var mx=((e.clientX-b.left)/b.width*100).toFixed(1);
      var my=((e.clientY-b.top)/b.height*100).toFixed(1);
      var sh=this.querySelectorAll(".shine");
      for(var k=0;k<sh.length;k++){sh[k].style.setProperty("--mx",mx+"%");sh[k].style.setProperty("--my",my+"%");}
    });
    g.appendChild(c);
    // Background photo upgrade: load detached, swap into the ring only on success.
    if(fn){
      (function(card,file,nm){
        var im=new Image();
        im.alt=nm;im.decoding="async";im.referrerPolicy="no-referrer";
        im.onload=function(){var r=card.querySelector(".face.front .ring");if(r){r.innerHTML="";r.appendChild(im);}};
        im.onerror=function(){if(!im.__fb){im.__fb=1;im.src=M+file;}}; // try CDN once; else keep avatar
        im.src="images/"+file;
      })(c,fn,name);
    }
    shown++;
  }
  var nr=document.getElementById("noresult");
  if(nr)nr.className=shown?"noresult":"noresult show";
}
render();

// filter buttons
var btns=document.querySelectorAll(".fbtn");
for(var b=0;b<btns.length;b++){
  btns[b].addEventListener("click",function(){
    for(var j=0;j<btns.length;j++)btns[j].classList.remove("active");
    this.classList.add("active");
    curF=this.getAttribute("data-f");
    render();
  });
}

// search
var s=document.getElementById("search"),cb=document.getElementById("clear");
if(s){
  s.addEventListener("input",function(){
    curQ=this.value.trim().toLowerCase();
    if(cb)cb.className=curQ?"clearbtn show":"clearbtn";
    render();
  });
}
if(cb){
  cb.addEventListener("click",function(){s.value="";curQ="";cb.className="clearbtn";render();s.focus();});
}

// mouse glow spotlight
var mv=document.getElementById("glow");
if(mv){document.addEventListener("mousemove",function(e){mv.style.left=e.clientX+"px";mv.style.top=e.clientY+"px";mv.style.opacity="1";});}

// 3D parallax on hero crest
var crest=document.getElementById("crest");
if(crest){
  document.addEventListener("mousemove",function(e){
    var rx=(e.clientY/window.innerHeight-.5)*-16;
    var ry=(e.clientX/window.innerWidth-.5)*22;
    crest.style.transform="translateY(0) rotateX("+rx+"deg) rotateY("+ry+"deg)";
  });
}

// scroll reveal — simple rect check. This does NOT use IntersectionObserver thresholds,
// which can never fire for a section taller than the screen (the single-column squad on
// mobile), leaving it stuck invisible until a filter/search shrank it. Here, anything that
// overlaps the viewport at all is revealed.
function revealInView(){
  var els=document.querySelectorAll(".reveal:not(.in),.mu-reveal:not(.in)");
  var vh=window.innerHeight||document.documentElement.clientHeight||0;
  for(var i=0;i<els.length;i++){
    var b=els[i].getBoundingClientRect();
    if(b.top<vh-30&&b.bottom>0)els[i].classList.add("in");
  }
}
addEventListener("scroll",revealInView,{passive:true});
addEventListener("resize",revealInView);
addEventListener("load",revealInView);
document.addEventListener("DOMContentLoaded",revealInView);
revealInView();
// keep revealing cards added later by filtering/search, and guarantee nothing stays hidden
setInterval(revealInView,500);

// theme toggle
var tb=document.getElementById("themeBtn");
if(tb){
  tb.addEventListener("click",function(){
    var h=document.documentElement;
    h.setAttribute("data-theme",h.getAttribute("data-theme")==="crimson"?"royal":"crimson");
  });
}

// cursor comet trail
(function(){
  var cv=document.getElementById("trail");if(!cv)return;
  var ctx=cv.getContext("2d"),pts=[];
  function size(){cv.width=innerWidth;cv.height=innerHeight;}
  size();addEventListener("resize",size);
  addEventListener("mousemove",function(e){pts.push({x:e.clientX,y:e.clientY,life:1});if(pts.length>40)pts.shift();});
  (function loop(){
    ctx.clearRect(0,0,cv.width,cv.height);
    for(var i=0;i<pts.length;i++){
      var p=pts[i];p.life-=0.025;
      if(p.life<=0)continue;
      ctx.beginPath();
      ctx.arc(p.x,p.y,9*p.life,0,Math.PI*2);
      ctx.fillStyle="rgba(241,193,75,"+(p.life*0.5)+")";
      ctx.shadowColor="rgba(241,193,75,0.9)";ctx.shadowBlur=18;
      ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
})();

// confetti "SIX!" celebration on crest click
(function(){
  var cv=document.getElementById("confetti");if(!cv)return;
  var ctx=cv.getContext("2d"),parts=[],active=false;
  function size(){cv.width=innerWidth;cv.height=innerHeight;}
  size();addEventListener("resize",size);
  var cols=["#f2c250","#ffe6a0","#2f62e0","#5b8dff","#e23150","#ffffff"];
  function boom(){
    for(var i=0;i<160;i++){
      parts.push({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*16,vy:(Math.random()-.5)*16-4,g:0.25,life:1,c:cols[(Math.random()*cols.length)|0],s:Math.random()*7+4,rot:Math.random()*6});
    }
    if(!active){active=true;run();}
    var six=document.createElement("div");
    six.textContent="SIX! 🏏";
    six.style.cssText="position:fixed;left:50%;top:42%;transform:translate(-50%,-50%) scale(.4);z-index:75;font-family:Anton,sans-serif;font-size:90px;color:#ffe08a;text-shadow:0 8px 30px rgba(0,0,0,.6);pointer-events:none;transition:transform .5s cubic-bezier(.2,1.4,.4,1),opacity .6s;opacity:0";
    document.body.appendChild(six);
    requestAnimationFrame(function(){six.style.transform="translate(-50%,-50%) scale(1)";six.style.opacity="1";});
    setTimeout(function(){six.style.opacity="0";six.style.transform="translate(-50%,-160%) scale(1.1)";},900);
    setTimeout(function(){six.remove();},1600);
  }
  function run(){
    ctx.clearRect(0,0,cv.width,cv.height);
    var alive=false;
    for(var i=0;i<parts.length;i++){
      var p=parts[i];if(p.life<=0)continue;alive=true;
      p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.life-=0.012;p.rot+=0.2;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.globalAlpha=Math.max(p.life,0);ctx.fillStyle=p.c;
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6);ctx.restore();
    }
    if(alive)requestAnimationFrame(run);else{active=false;parts=[];ctx.clearRect(0,0,cv.width,cv.height);}
  }
  var cr=document.getElementById("crest");
  if(cr)cr.addEventListener("click",boom);
})();

// ===== Star Performers — podium + leaderboard (computed live from the squad) =====
(function(){
  function avatar(file,name,cls){
    // ring shows initials instantly; real photo is swapped in once it loads (local → CDN)
    var wrap=document.createElement("div");wrap.className=cls;
    wrap.innerHTML='<div class="ph">'+ini(name)+'</div>';
    if(file){
      var im=new Image();im.alt=name;im.decoding="async";im.referrerPolicy="no-referrer";
      im.onload=function(){wrap.innerHTML="";wrap.appendChild(im);};
      im.onerror=function(){if(!im.__fb){im.__fb=1;im.src=M+file;}};
      im.src="images/"+file;
    }
    return wrap;
  }
  function topBy(idx,skip){
    var best=null;
    for(var i=0;i<P.length;i++){if(skip&&skip[P[i][0]])continue;if(!best||P[i][idx]>best[idx])best=P[i];}
    return best;
  }
  // Podium — leader of each discipline, picked distinct so three different Strikers shine
  function byName(nm){for(var i=0;i<P.length;i++){if(P[i][0]===nm)return P[i];}return null;}
  var pod=document.getElementById("podium");
  if(pod){
    // First two are computed leaders; the third is a fixed batting-average honour.
    var cats=[
      {emoji:"🏏",label:"Leading Run-Scorer",idx:5,sub:"Career Runs"},
      {emoji:"🎯",label:"Leading Wicket-Taker",idx:6,sub:"Career Wickets"},
      {emoji:"📊",label:"Highest Average",fixed:"Saurabh Rai",value:"37.83",sub:"Batting Average"}
    ];
    var used={};
    for(var c=0;c<cats.length;c++){
      var cat=cats[c],p=cat.fixed?byName(cat.fixed):topBy(cat.idx,used);
      if(!p)continue;used[p[0]]=1;
      var val=cat.value!=null?cat.value:p[cat.idx].toLocaleString();
      var card=document.createElement("div");card.className="pcard";
      card.innerHTML='<div class="crown">👑</div>';
      card.appendChild(avatar(p[1],p[0],"pring"));
      var meta=document.createElement("div");
      meta.innerHTML='<div class="pcat">'+cat.label+'</div><h3>'+p[0]+'</h3><div class="pbig">'+val+'</div><div class="psub">'+cat.sub+'</div>';
      card.appendChild(meta);
      pod.appendChild(card);
    }
  }
  // Leaderboard — top 5 for the active metric, with proportional stat bars
  var lb=document.getElementById("lb"),curM=5;
  function renderLB(idx){
    if(!lb)return;curM=idx;lb.innerHTML="";
    var arr=P.slice().sort(function(a,b){return b[idx]-a[idx];}).slice(0,5);
    var max=arr.length?arr[0][idx]:1;
    for(var i=0;i<arr.length;i++){
      var p=arr[i],pct=max?Math.max(6,Math.round(p[idx]/max*100)):0;
      var row=document.createElement("div");row.className="lbrow"+(i===0?" top":"");
      row.style.animationDelay=(i*0.06)+"s";
      var rank=document.createElement("span");rank.className="lbrank";rank.textContent=i+1;
      row.appendChild(rank);
      row.appendChild(avatar(p[1],p[0],"lbring"));
      var mid=document.createElement("div");mid.className="lbmid";
      mid.innerHTML='<span class="lbname">'+p[0]+'</span><div class="lbbar"><i style="width:0%"></i></div>';
      row.appendChild(mid);
      var val=document.createElement("span");val.className="lbval";val.textContent=p[idx].toLocaleString();
      row.appendChild(val);
      lb.appendChild(row);
      (function(bar,w){setTimeout(function(){bar.style.width=w+"%";},120);})(mid.querySelector(".lbbar i"),pct);
    }
  }
  renderLB(5);
  var tabs=document.querySelectorAll(".lbtab");
  for(var t=0;t<tabs.length;t++){
    tabs[t].addEventListener("click",function(){
      for(var j=0;j<tabs.length;j++)tabs[j].classList.remove("active");
      this.classList.add("active");
      renderLB(parseInt(this.getAttribute("data-m"),10));
    });
  }
})();

// team stats band — totals computed from the squad, then counted up on first view
(function(){
  var tot={m:0,r:0,w:0};
  for(var i=0;i<P.length;i++){tot.m+=P[i][4]||0;tot.r+=P[i][5]||0;tot.w+=P[i][6]||0;}
  var map=[["sbPlayers",P.length],["sbRuns",tot.r],["sbWkts",tot.w],["sbMatch",tot.m]];
  function count(el,target){
    var start=0,step=Math.max(1,Math.ceil(target/60));
    var iv=setInterval(function(){
      start+=step;if(start>=target){start=target;clearInterval(iv);}
      el.textContent=start.toLocaleString();
    },20);
  }
  var done=false;
  function go(){
    if(done)return;var band=document.querySelector(".statsband");if(!band)return;
    var b=band.getBoundingClientRect(),vh=window.innerHeight||0;
    if(b.top<vh&&b.bottom>0){
      done=true;
      for(var i=0;i<map.length;i++){var el=document.getElementById(map[i][0]);if(el)count(el,map[i][1]);}
    }
  }
  addEventListener("scroll",go,{passive:true});addEventListener("load",go);go();setTimeout(go,600);
})();

// ===== Background team anthem — autoplay with browser-safe fallback =====
(function(){
  var a=document.getElementById("bgm"),btn=document.getElementById("musicBtn");
  if(!a)return;
  a.volume=0.45;
  var playing=false,started=false;
  var EVTS=["click","keydown","touchstart","scroll","pointerdown"];
  function paint(){
    if(!btn)return;
    btn.textContent=playing?"🔊":"🔇";
    btn.classList.toggle("playing",playing);
    btn.classList.toggle("off",!playing);
  }
  function onPlay(){playing=true;started=true;paint();cleanup();}
  function cleanup(){for(var i=0;i<EVTS.length;i++)removeEventListener(EVTS[i],kick);}
  function tryPlay(){
    var pr=a.play();
    if(pr&&pr.then)pr.then(onPlay).catch(function(){paint();});
    else onPlay();
  }
  // Most browsers block autoplay-with-sound; if so, the first user gesture starts it.
  function kick(){if(!started)tryPlay();}
  for(var i=0;i<EVTS.length;i++)addEventListener(EVTS[i],kick,{passive:true});
  tryPlay();
  paint();
  // manual play / mute control (fully overrides autoplay once clicked)
  if(btn)btn.addEventListener("click",function(e){
    e.stopPropagation();
    if(playing){a.pause();playing=false;}
    else{a.play();playing=true;started=true;cleanup();}
    paint();
  });
})();

// year
var y=document.getElementById("yr");
if(y)y.textContent=new Date().getFullYear();