var M="https://media.cricheroes.in/user_profile/";
var P=[
["Avinash","1781546330578_1c4BDWWmHeZZ.jpg","RHB","Right-arm medium",135,693,116,["Classicist","Wildcard"],"allr","The skipper who leads with the bat and bites with the ball — 116 wickets of pure leadership."],
["Abhishek Srivastava","1753046905564_bdbc6UTS1esz.jpg","RHB","Right-arm fast",39,64,42,["Aspirant"],"bowl","A genuine quick who lets the new ball do the talking."],
["Abhishek Tiwari","1735477198133_yfkC3RXSDTlD.jpeg","RHB","Right-arm medium",76,274,16,["Classicist","Aspirant"],"allr","Textbook strokes and tidy medium pace — dependable in every situation."],
["Ashwani","1766931215187_1SVHyRRNONvo.jpg","RHB","Right-arm Leg Break",72,938,89,["Hard Hitter","Wildcard"],"allr","Leg-spin web in hand, brute power in the swing — a true matchwinner."],
["Chandan Manglani","1742654078721_uRan421Z6PSD.jpeg","RHB","Right-arm medium",81,488,4,["Accumulator"],"bat","The anchor who builds the innings brick by brick."],
["Chandan Personal","","RHB","Right-arm fast",10,88,2,[],"bat","Quietly effective with the willow — a steady middle-order presence."],
["Himanshu","","RHB","Right-arm Leg Break",38,165,12,["Steady Batter","Aspirant"],"allr","Calm at the crease and crafty with the leg-break."],
["Kuldeep Singh","1743824564611_FLdZIUv2pKR2.jpg","RHB","Right-arm medium",130,1349,129,["Accumulator","Wildcard"],"allr","1349 runs and 129 wickets — the engine-room all-rounder."],
["Mukesh","","RHB","",17,39,0,[],"bat","A scrappy competitor who battles for every run the team needs."],
["Pankaj","","RHB","Right-arm medium",11,106,4,[],"allr","Handy with bat and ball — the utility man every squad treasures."],
["Parth Shukla","1777499793971_SZMmKjPi5yjk.jpg","RHB","Slow left-arm chinaman",4,80,2,[],"allr","A rare chinaman magician — mystery spin that ties batters in knots."],
["Prateek Sahu","1778296728533_5Y0rhp4CGHja.jpg","RHB","Right-arm medium",11,150,16,["Aspirant"],"allr","16 wickets in just 11 games — a wicket-taking spark on the rise."],
["Ravi Srivastava","1744434308364_IgHkX9wSttmh.jpg","LHB","Left-arm medium",80,365,3,["Steady Batter"],"bat","The left-hander who brings balance and a cool head to the top order."],
["Rohan Bhawnani","1776401012825_CPiVWnz8KccF.jpeg","RHB","Right-arm medium",21,241,0,["Accumulator"],"bat","Patient, precise and tough to dislodge — the glue of the middle order."],
["Sanju S","1781397887137_S3Ecu9XN7zvV.jpg","RHB","Right-arm medium",125,830,69,["Classicist","Aspirant"],"allr","Elegant runs and 69 wickets — class personified with bat and ball."],
["Satyam","1686711598723_8uzQsDOduoUD.jpg","LHB","Left-arm fast",156,1391,43,["Destroyer","Aspirant"],"allr","A southpaw destroyer who swings it both ways — 1391 runs and rising."],
["Saurabh Rai","1734154128879_DE84U9kde17K.jpg","RHB","Right-arm fast",48,1057,54,["Hard Hitter","Aspirant"],"allr","1000+ runs and 54 wickets — the explosive all-round package."],
["Shreyansh","1735481041131_ZrFXP0mBZnA6.jpg","RHB","Right-arm fast",29,510,5,["Destroyer"],"bat","510 runs of fearless hitting — a destroyer who plays without fear."],
["Sukhbeer Singh","1780671558209_0SI1O3w6eeBr.jpg","RHB","Right-arm Off Break",378,6866,386,["Accumulator","Economist"],"allr","378 matches, 6866 runs, 386 wickets — the ultimate veteran all-rounder."]
];
function ini(n){return n.split(" ").map(function(w){return w[0];}).join("").slice(0,2).toUpperCase();}
function render(f){
  var g=document.getElementById("grid");g.innerHTML="";
  P.forEach(function(p){
    if(f!=="all"&&p[8]!==f)return;
    var name=p[0],ph=p[1]?M+p[1]:"",bat=p[2],bowl=p[3],m=p[4],r=p[5],w=p[6],tags=p[7],liner=p[9];
    var img=ph?'<img src="'+ph+'" alt="'+name+'" loading="lazy" onerror="this.outerHTML=\'<div class=ph>'+ini(name)+'</div>\'">':'<div class="ph">'+ini(name)+'</div>';
    var tg=tags.map(function(t,i){return '<span class="tg '+(i%2?"r":"b")+'">'+t+'</span>';}).join("");
    var card=document.createElement("div");
    card.className="card";
    card.innerHTML='<div class="ring">'+img+'</div><h3>'+name+'</h3><div class="style">'+bat+(bowl?" · "+bowl:"")+'</div><div class="tags">'+tg+'</div><div class="liner">"'+liner+'"</div><div class="mini"><div><b>'+m+'</b><span>Matches</span></div><div><b>'+r+'</b><span>Runs</span></div><div><b>'+w+'</b><span>Wickets</span></div></div>';
    g.appendChild(card);
  });
}
render("all");
var btns=document.querySelectorAll(".fbtn");
for(var i=0;i<btns.length;i++){
  btns[i].addEventListener("click",function(){
    for(var j=0;j<btns.length;j++)btns[j].classList.remove("active");
    this.classList.add("active");
    render(this.getAttribute("data-f"));
  });
}
var y=document.getElementById("yr");if(y)y.textContent=new Date().getFullYear();