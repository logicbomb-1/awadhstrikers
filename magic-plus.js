/* ===== Awadh Strikers — MAGIC PLUS layer ===== */
(function(){

  /* 1. Scroll progress "crease" bar */
  var bar=document.createElement("div");
  bar.style.cssText="position:fixed;top:0;left:0;height:3px;width:0;z-index:90;background:linear-gradient(90deg,#ffe08a,#f1c14b,#13d089);box-shadow:0 0 12px rgba(241,193,75,.8);transition:width .1s";
  document.body.appendChild(bar);
  addEventListener("scroll",function(){
    var h=document.documentElement;
    var pct=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
    bar.style.width=pct+"%";
  });

  /* 2. Cinematic intro loader */
  var intro=document.createElement("div");
  intro.id="intro";
  intro.style.cssText="position:fixed;inset:0;z-index:200;background:radial-gradient(circle at 50% 40%,#0a2a1f,#020a07);display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .8s,visibility .8s";
  var logoSrc=(document.querySelector(".crest")&&document.querySelector(".crest").src)||"logo.png";
  intro.innerHTML=
    '<img src="'+logoSrc+'" style="width:160px;filter:drop-shadow(0 0 40px rgba(241,193,75,.5));animation:introPop 1s cubic-bezier(.2,1.4,.3,1) both">'+
    '<div style="margin-top:24px;font-family:Anton,sans-serif;font-size:clamp(34px,7vw,72px);letter-spacing:3px;background:linear-gradient(135deg,#ffe08a,#f1c14b,#fff7e0,#f1c14b);background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:introShine 1.6s linear infinite,introUp .9s .2s both">AWADH STRIKERS</div>'+
    '<div style="margin-top:14px;color:#9fc9b6;letter-spacing:6px;font-size:12px;text-transform:uppercase;animation:introUp .9s .45s both">Loading the squad…</div>'+
    '<div style="margin-top:26px;width:180px;height:4px;border-radius:9px;background:rgba(255,255,255,.1);overflow:hidden"><div style="height:100%;width:0;background:linear-gradient(90deg,#ffe08a,#13d089);animation:introBar 1.6s ease forwards"></div></div>';
  document.body.appendChild(intro);
  var st=document.createElement("style");
  st.textContent="@keyframes introPop{from{opacity:0;transform:scale(.4) rotate(-12deg)}to{opacity:1;transform:none}}@keyframes introShine{to{background-position:300% 0}}@keyframes introUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}@keyframes introBar{to{width:100%}}";
  document.head.appendChild(st);
  window.addEventListener("load",function(){
    setTimeout(function(){intro.style.opacity="0";intro.style.visibility="hidden";setTimeout(function(){intro.remove();},800);},1700);
  });

  /* 3. Ember / spark particle field drifting upward */
  var cv=document.createElement("canvas");
  cv.style.cssText="position:fixed;inset:0;z-index:1;pointer-events:none";
  document.body.appendChild(cv);
  var ctx=cv.getContext("2d"),sparks=[];
  function size(){cv.width=innerWidth;cv.height=innerHeight;}
  size();addEventListener("resize",size);
  for(var i=0;i<46;i++){
    sparks.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2.2+.6,s:Math.random()*.5+.2,o:Math.random()*.5+.2,d:Math.random()*6});
  }
  (function loop(){
    ctx.clearRect(0,0,cv.width,cv.height);
    for(var i=0;i<sparks.length;i++){
      var p=sparks[i];p.y-=p.s;p.x+=Math.sin((p.y+p.d)/40)*.4;
      if(p.y< -10){p.y=cv.height+10;p.x=Math.random()*cv.width;}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(241,193,75,"+p.o+")";ctx.shadowColor="rgba(241,193,75,.9)";ctx.shadowBlur=8;ctx.fill();
    }
    requestAnimationFrame(loop);
  })();

  /* 4. Magnetic buttons */
  var mags=document.querySelectorAll(".btn,.theme-toggle,.fbtn");
  for(var m=0;m<mags.length;m++){
    (function(el){
      el.style.transition="transform .2s ease";
      el.addEventListener("mousemove",function(e){
        var b=el.getBoundingClientRect();
        var x=e.clientX-b.left-b.width/2, y=e.clientY-b.top-b.height/2;
        el.style.transform="translate("+x*0.25+"px,"+y*0.35+"px)";
      });
      el.addEventListener("mouseleave",function(){el.style.transform="";});
    })(mags[m]);
  }

  /* 5. Count-up animation when squad scrolls into view */
  function animateCount(el){
    var target=parseInt(el.getAttribute("data-final"),10);
    if(isNaN(target)){el.textContent=el.getAttribute("data-final");return;}
    var start=0,step=Math.max(1,Math.ceil(target/45));
    var iv=setInterval(function(){
      start+=step;
      if(start>=target){start=target;clearInterval(iv);}
      el.textContent=start.toLocaleString();
    },22);
  }
  function prepCounts(){
    var nums=document.querySelectorAll(".statrow b");
    for(var i=0;i<nums.length;i++){
      var el=nums[i];
      if(!el.getAttribute("data-final")){el.setAttribute("data-final",el.textContent);}
    }
  }
  var squad=document.getElementById("squad");
  if(squad){
    var co=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){
          prepCounts();
          var nums=document.querySelectorAll(".statrow b");
          for(var i=0;i<nums.length;i++)animateCount(nums[i]);
        }
      });
    },{threshold:.15});
    co.observe(squad);
  }

  /* 6. Scroll-to-explore mouse indicator in hero */
  var hero=document.querySelector(".hero");
  if(hero){
    var ind=document.createElement("a");
    ind.href="#story";
    ind.innerHTML='<span></span>';
    ind.style.cssText="display:block;margin:46px auto 0;width:26px;height:44px;border:2px solid rgba(241,193,75,.5);border-radius:16px;position:relative;cursor:pointer";
    ind.querySelector("span").style.cssText="position:absolute;left:50%;top:8px;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#ffe08a;animation:scrollDot 1.5s infinite";
    hero.appendChild(ind);
    var st2=document.createElement("style");
    st2.textContent="@keyframes scrollDot{0%{opacity:0;transform:translateY(0)}40%{opacity:1}100%{opacity:0;transform:translateY(20px)}}";
    document.head.appendChild(st2);
  }

  /* 7. Gentle "ding" on SIX (only after user clicks the crest) */
  var cr=document.getElementById("crest");
  if(cr){
    cr.addEventListener("click",function(){
      try{
        var AC=window.AudioContext||window.webkitAudioContext;
        var ac=new AC(),o=ac.createOscillator(),g=ac.createGain();
        o.type="triangle";o.frequency.setValueAtTime(880,ac.currentTime);
        o.frequency.exponentialRampToValueAtTime(1320,ac.currentTime+0.15);
        g.gain.setValueAtTime(0.0001,ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.25,ac.currentTime+0.02);
        g.gain.exponentialRampToValueAtTime(0.0001,ac.currentTime+0.4);
        o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+0.42);
      }catch(e){}
    });
  }

})();