/* ===== Awadh Strikers — MAGIC PRO layer (signature interactions) ===== */
(function(){
  var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  var touch = matchMedia("(hover:none)").matches;

  /* ---------- 1. Custom morphing cursor (desktop only) ---------- */
  if(!touch){
    var cur=document.createElement("div");
    cur.style.cssText="position:fixed;top:0;left:0;width:30px;height:30px;border:2px solid rgba(241,193,75,.9);border-radius:50%;z-index:120;pointer-events:none;transform:translate(-50%,-50%);transition:width .2s,height .2s,background .2s,border-color .2s;mix-blend-mode:screen";
    document.body.appendChild(cur);
    var cx=innerWidth/2,cy=innerHeight/2,tx=cx,ty=cy;
    addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY;});
    (function follow(){cx+=(tx-cx)*0.2;cy+=(ty-cy)*0.2;cur.style.left=cx+"px";cur.style.top=cy+"px";requestAnimationFrame(follow);})();
    var hot="a,button,.card,.chip,.fbtn,input,.theme-toggle";
    document.addEventListener("mouseover",function(e){
      if(e.target.closest(hot)){
        cur.style.width="44px";cur.style.height="44px";
        cur.style.background="radial-gradient(circle at 30% 30%,#e23150,#8a0f22)";
        cur.style.borderColor="rgba(255,224,138,.9)";
      }
    });
    document.addEventListener("mouseout",function(e){
      if(e.target.closest(hot)){cur.style.width="30px";cur.style.height="30px";cur.style.background="transparent";cur.style.borderColor="rgba(241,193,75,.9)";}
    });
    document.body.style.cursor="none";
    var lk=document.querySelectorAll("a,button,input");for(var i=0;i<lk.length;i++)lk[i].style.cursor="none";
  }

  /* ---------- 2. Scroll-driven hero depth ---------- */
  var crest=document.getElementById("crest");
  var heroH1=document.querySelector(".hero h1");
  if(!reduce){
    addEventListener("scroll",function(){
      var y=scrollY;
      if(y<900){
        if(crest)crest.style.opacity=Math.max(0,1-y/600);
        if(heroH1){heroH1.style.transform="translateY("+y*0.25+"px)";heroH1.style.opacity=Math.max(0,1-y/500);}
      }
    },{passive:true});
  }

  /* ---------- 3. Broadcast achievement ticker ---------- */
  var ticker=document.createElement("div");
  ticker.style.cssText="position:relative;z-index:2;overflow:hidden;border-top:1px solid rgba(241,193,75,.2);border-bottom:1px solid rgba(241,193,75,.2);background:rgba(0,0,0,.25);backdrop-filter:blur(6px)";
  var items=["🏏 AWADH STRIKERS","🦁 ROAR OF THE LION","🏆 CHAMPIONS OF LUCKNOW","⚡ PLAY BOLD","👑 ROYAL BLOOD","🔥 NEVER BACK DOWN"];
  var line=items.join("&nbsp;&nbsp;•&nbsp;&nbsp;");
  var inner=document.createElement("div");
  inner.style.cssText="display:inline-block;white-space:nowrap;padding:12px 0;font-family:Anton,sans-serif;letter-spacing:2px;font-size:18px;color:rgba(241,193,75,.65);animation:tk 28s linear infinite";
  inner.innerHTML=line+"&nbsp;&nbsp;•&nbsp;&nbsp;"+line+"&nbsp;&nbsp;•&nbsp;&nbsp;";
  ticker.appendChild(inner);
  var st=document.createElement("style");st.textContent="@keyframes tk{to{transform:translateX(-50%)}}";document.head.appendChild(st);
  var story=document.getElementById("story");
  if(story&&story.parentNode)story.parentNode.insertBefore(ticker,story);

  /* ---------- 4. Live status pill (clock + city) ---------- */
  var pill=document.createElement("div");
  pill.style.cssText="position:fixed;left:22px;bottom:22px;z-index:80;display:flex;align-items:center;gap:10px;padding:10px 16px;border-radius:999px;background:rgba(6,42,31,.7);border:1px solid rgba(241,193,75,.3);backdrop-filter:blur(10px);font-size:13px;font-weight:600;color:#cfe;box-shadow:0 10px 26px rgba(0,0,0,.4)";
  pill.innerHTML='<span style="width:9px;height:9px;border-radius:50%;background:#13d089;box-shadow:0 0 10px #13d089;animation:lp 1.6s infinite"></span><span>🏙️ Lucknow</span><span id="clk" style="color:#ffe08a;font-variant-numeric:tabular-nums"></span>';
  document.body.appendChild(pill);
  var st2=document.createElement("style");st2.textContent="@keyframes lp{0%,100%{opacity:1}50%{opacity:.35}}";document.head.appendChild(st2);
  function tick(){var d=new Date();document.getElementById("clk").textContent=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});}
  tick();setInterval(tick,1000);

  /* ---------- 5. Press "/" to jump to squad search ---------- */
  addEventListener("keydown",function(e){
    if(e.key==="/"&&document.activeElement.tagName!=="INPUT"){
      e.preventDefault();
      var sq=document.getElementById("squad");var s=document.getElementById("search");
      if(sq)sq.scrollIntoView({behavior:"smooth"});
      if(s)setTimeout(function(){s.focus();},500);
    }
  });

  /* ---------- 6. Light-sweep on section headings when revealed ---------- */
  var sweepCss=document.createElement("style");
  sweepCss.textContent=".head h2,.story h2{position:relative;overflow:hidden}.head h2::after,.story h2::after{content:'';position:absolute;top:0;left:-130%;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg)}.in .head h2::after,.in.story h2::after,.reveal.in h2::after{animation:sweep 1.1s .25s ease forwards}@keyframes sweep{to{left:130%}}";
  document.head.appendChild(sweepCss);

  /* ---------- 7. Type "SIX" anywhere → stadium fireworks ---------- */
  var buf="";
  addEventListener("keydown",function(e){
    if(e.key&&e.key.length===1){buf=(buf+e.key.toUpperCase()).slice(-3);if(buf==="SIX")fireworks();}
  });
  function fireworks(){
    var cv=document.getElementById("confetti");if(!cv)return;
    var ctx=cv.getContext("2d");cv.width=innerWidth;cv.height=innerHeight;
    var ps=[],cols=["#f1c14b","#ffe08a","#13d089","#e23150","#fff","#3f72e0"];
    function burst(bx,by){for(var i=0;i<70;i++){var a=Math.random()*Math.PI*2,sp=Math.random()*7+2;ps.push({x:bx,y:by,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,c:cols[(Math.random()*cols.length)|0],s:Math.random()*4+2});}}
    for(var b=0;b<5;b++)burst(Math.random()*innerWidth,Math.random()*innerHeight*0.6+60);
    (function run(){
      ctx.clearRect(0,0,cv.width,cv.height);var alive=false;
      for(var i=0;i<ps.length;i++){var p=ps[i];if(p.life<=0)continue;alive=true;p.vy+=0.08;p.x+=p.vx;p.y+=p.vy;p.life-=0.014;ctx.globalAlpha=Math.max(p.life,0);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill();}
      if(alive)requestAnimationFrame(run);else ctx.clearRect(0,0,cv.width,cv.height);
    })();
  }

  /* ---------- 8. Player card press physics ---------- */
  document.addEventListener("mousedown",function(e){var c=e.target.closest(".card");if(c){c.style.transition="transform .1s";c.style.transform="scale(.97)";}});
  document.addEventListener("mouseup",function(e){var cards=document.querySelectorAll(".card");for(var i=0;i<cards.length;i++){cards[i].style.transform="";}});

})();