(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))h(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&h(d)}).observe(document,{childList:!0,subtree:!0});function c(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function h(s){if(s.ep)return;s.ep=!0;const n=c(s);fetch(s.href,n)}})();function C(){const r=[{name:"1.aaaa",artist:"aaa",img:"music_image01",audio:"m_1"},{name:"2.aaaa",artist:"aaa",img:"music_image02",audio:"m_2"},{name:"3.aaaa",artist:"aaa",img:"music_image03",audio:"m_3"},{name:"4.aaaa",artist:"aaa",img:"music_image04",audio:"m_4"},{name:"5.aaaa",artist:"aaa",img:"music_image05",audio:"m_5"},{name:"6.aaaa",artist:"aaa",img:"music_image06",audio:"m_6"},{name:"7.aaaa",artist:"aaa",img:"music_image07",audio:"m_7"},{name:"8.aaaa",artist:"aaa",img:"music_image08",audio:"m_8"},{name:"9.aaaa",artist:"aaa",img:"music_image09",audio:"m_9"},{name:"10.aaaa",artist:"aaa",img:"music_image010",audio:"m_10"}],o=document.querySelector(".music__wrap"),c=o.querySelector(".music__control .title h3"),h=o.querySelector(".music__control .title p"),s=o.querySelector(".music__view .images img"),n=o.querySelector("#main-audio"),d=o.querySelector("#control-play"),H=o.querySelector("#control-prev"),T=o.querySelector("#control-next"),A=o.querySelector(".progress"),M=o.querySelector(".progress .bar"),N=o.querySelector(".progress .timer .current"),L=o.querySelector(".progress .timer .duration"),u=o.querySelector("#control-repeat"),p=o.querySelector("#control-list"),q=o.querySelector(".music__list"),S=o.querySelector(".music__list ul"),B=o.querySelector(".music__list h3 .close");let g=1;const _=i=>{c.innerText=r[i-1].name,h.innerText=r[i-1].artist,s.src=`../images/${r[i-1].img}.png`,s.alt=r[i-1].name,n.src=`audio/${r[i-1].audio}.mp3`},k=()=>{o.classList.add("paused"),d.setAttribute("title","정지"),d.setAttribute("class","stop"),n.play()},I=()=>{o.classList.remove("paused"),d.setAttribute("title","재생"),d.setAttribute("class","play"),n.pause()},D=()=>{g==0?g=r.length:g--,_(g),k(),E()},O=()=>{g==r.length?g=1:g++,_(g),k(),E()};n.addEventListener("timeupdate",i=>{const a=i.target.currentTime,f=i.target.duration;let y=a/f*100;M.style.width=`${y}%`,n.addEventListener("loadeddata",()=>{let t=n.duration,l=Math.floor(t/60),m=Math.floor(t%60);m<10&&(m=`0${m}`),L.innerHTML=`${l}:${m}`});let w=Math.floor(a/60),e=Math.floor(a%60);e<10&&(e=`0${e}`),N.innerText=`${w}:${e}`}),A.addEventListener("click",i=>{let a=A.clientWidth,f=i.offsetX,y=n.duration;n.currentTime=f/a*y}),u.addEventListener("click",()=>{switch(u.getAttribute("class")){case"repeat":u.setAttribute("class","repeat_one"),u.setAttribute("title","한곡 재생");break;case"repeat_one":u.setAttribute("class","shuffle"),u.setAttribute("title","랜덤 재생");break;case"shuffle":u.setAttribute("class","repeat"),u.setAttribute("title","전체 반복");break}}),n.addEventListener("ended",()=>{switch(u.getAttribute("class")){case"repeat":O();break;case"repeat_one":k();break;case"shuffle":let a=Math.floor(Math.random()*r.length+1);do a=Math.floor(Math.random()*r.length+1);while(a==g);g=a,_(g),k();break}E()}),d.addEventListener("click",()=>{o.classList.contains("paused")?I():k()}),H.addEventListener("click",()=>{D()}),T.addEventListener("click",()=>{O()}),p.addEventListener("click",()=>{q.classList.add("show")}),B.addEventListener("click",()=>{q.classList.remove("show")});for(let i=0;i<r.length;i++){let a=`
            <li data-index="${i+1}">
                <span class="img">
                    <img class="img" src="../images/${r[i].img}.png" alt="${r[i].name}">
                </span>
                <span class="title">
                    <strong>${r[i].name}</strong>
                    <em>${r[i].artist}</em>
                    <audio class="${r[i].audio}" src="audio/${r[i].audio}.mp3"></audio>
                </span>
                <span class="audio-duration" id="${r[i].audio}">3:04</span>
            </li>
        `;S.insertAdjacentHTML("beforeend",a);let f=S.querySelector(`#${r[i].audio}`),y=S.querySelector(`.${r[i].audio}`);y.addEventListener("loadeddata",()=>{let w=y.duration,e=Math.floor(w/60),t=Math.floor(w%60);t<10&&(t=`0${t}`),f.innerText=`${e}:${t}`,f.setAttribute("data-duration",`${e}:${t}`)})}function E(){S.querySelectorAll("li").forEach(a=>{let f=a.querySelector(".audio-duration");if(a.addEventListener("click",function(){const y=this.getAttribute("data-index");g=parseInt(y,10),_(g),k(),E()}),a.classList.contains("playing")){a.classList.remove("playing");let y=f.getAttribute("data-duration");f.innerText=y}a.getAttribute("data-index")==g&&(a.classList.add("playing"),f.innerText="재생중")})}E(),window.addEventListener("load",()=>{_(g)}),document.querySelector(".right").addEventListener("click",()=>{document.querySelector(".music__wrap").style.display="none"})}function W(){function r(){let c=navigator.userAgent.toLowerCase(),h=screen.width,s=screen.height,n=document.querySelector(".info");c.indexOf("windows")>=0?n.innerHTML="현재 윈도우를 사용하고 있으며, 화면 크기는 "+h+"x"+s+" 입니다.":c.indexOf("macintosh")>=0?n.innerHTML="현재 맥을 사용하고 있으며, 화면 크기는 "+h+"x"+s+" 입니다.":c.indexOf("iphone")>=0?n.innerHTML="현재 아이폰을 사용하고 있으며, 화면 크기는 "+h+"x"+s+" 입니다.":c.indexOf("android")>=0&&(n.innerHTML="현재 안드로이드 폰을 사용하고 있으며, 화면 크기는 "+h+"x"+s+" 입니다.")}$(".icon1").draggable({containment:".icon_box",scroll:!1,start:function(){$(".cursor img").attr("src","../images/game_mouse01.png"),$("#header").css("background-color","#ff3e3e63")}}),$(".icon2").draggable({containment:".icon_box",scroll:!1,start:function(){$(".cursor img").attr("src","../images/game_mouse02.png"),$("#header").css("background-color","#415dff63")}}),$(".icon3").draggable({containment:".icon_box",scroll:!1,start:function(){$(".cursor img").attr("src","../images/game_mouse03.png"),$("#header").css("background-color","#41ff4b63")}}),$(".icon4").draggable({containment:".icon_box",scroll:!1,start:function(){$(".cursor img").attr("src","../images/game_mouse04.png"),$("#header").css("background-color","#ffeb3b63")}}),$(".music__wrap").draggable({scroll:!1});function o(){let c=new Date;document.querySelector(".time").innerHTML=c.getFullYear()+"년 "+(c.getMonth()+1)+"월 "+c.getDate()+"일 "+c.getHours()+"시 "+c.getMinutes()+"분"+c.getSeconds()+"초"}setInterval(o,1e3),window.onload=function(){window.addEventListener("mousemove",c=>{gsap.to(".cursor",{duration:0,left:c.pageX-7,top:c.pageY-10})}),o(),r()},document.querySelector(".icon1").addEventListener("click",()=>{document.querySelector(".music__wrap").style.display="block"}),document.querySelector(".icon2").addEventListener("click",()=>{document.querySelector(".tetris__wrap").style.display="block"}),document.querySelector(".icon3").addEventListener("click",()=>{}),document.querySelector(".icon4").addEventListener("click",()=>{})}function F(){const r=document.querySelector(".tetris__start"),o=document.querySelector(".tetris__play"),c=document.querySelector(".tetris__end"),h=document.querySelector(".start_btn"),s=document.querySelector(".retry_btn");document.querySelector(".tetris__header .right").addEventListener("click",()=>{document.querySelector(".tetris__wrap").style.display="none"}),h.addEventListener("click",()=>{r.style.display="none",o.style.display="block",B(),q.play(),S.pause()});const d=document.querySelector(".tetris__play .view ul"),H=20,T=12,A={Tmino:[[[2,1],[0,1],[1,0],[1,1]],[[1,2],[0,1],[1,0],[1,1]],[[1,2],[0,1],[2,1],[1,1]],[[2,1],[1,2],[1,0],[1,1]]],Imino:[[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[2,0],[3,0]],[[0,0],[0,1],[0,2],[0,3]],[[0,0],[1,0],[2,0],[3,0]]],Omino:[[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[0,1],[1,0],[1,1]]],Zmino:[[[0,0],[1,0],[1,1],[2,1]],[[1,0],[0,1],[1,1],[0,2]],[[0,0],[1,0],[1,1],[2,1]],[[1,0],[0,1],[1,1],[0,2]]],Smino:[[[1,0],[2,0],[0,1],[1,1]],[[0,0],[0,1],[1,1],[1,2]],[[1,0],[2,0],[0,1],[1,1]],[[0,0],[0,1],[1,1],[1,2]]],Jmino:[[[0,2],[1,0],[1,1],[1,2]],[[0,0],[0,1],[1,1],[2,1]],[[0,0],[1,0],[0,1],[0,2]],[[0,0],[1,0],[2,0],[2,1]]],Lmino:[[[0,0],[0,1],[0,2],[1,2]],[[0,0],[1,0],[2,0],[0,1]],[[0,0],[1,0],[1,1],[1,2]],[[0,1],[1,1],[2,0],[2,1]]]};let M=0,N=500,L,u;const p={type:"",direction:0,top:0,left:4},q=document.querySelector(".bgmPlay_music"),S=document.querySelector(".bgmover_music");function B(){clearInterval(L),d.innerHTML="",M=0,document.querySelector(".tetris__score").innerHTML="score : "+M+"점",N=500,u={...p},g(),i(),_(),q.pause(),S.pause()}function g(){for(let e=0;e<H;e++){const t=document.createElement("li"),l=document.createElement("ul");for(let m=0;m<T;m++){const b=document.createElement("li");l.prepend(b)}t.prepend(l),d.prepend(t)}}function _(e=""){const{type:t,direction:l,top:m,left:b}=u;document.querySelectorAll(".moving").forEach(x=>{x.classList.remove(t,"moving")}),A[t][l].some(x=>{const P=x[0]+b,z=x[1]+m,j=d.childNodes[z]?d.childNodes[z].childNodes[0].childNodes[P]:null;if(a(j))j.classList.add(t,"moving");else return u={...p},setTimeout(()=>{_(),e==="top"?D():k()}),!0}),p.left=b,p.top=m,p.direction=l}function k(){const{type:e,direction:t,top:l,left:m}=u,b=A[e][t];for(let v=0;v<b.length;v++){const x=b[v][0]+m,P=b[v][1]+l;(P<0||d.childNodes[P].childNodes[0].childNodes[x].classList.contains("seized"))&&(clearInterval(L),I())}}function I(){o.style.display="none",c.style.display="block",q.pause(),q.currentTime=0,S.play(),s.addEventListener("click",()=>{c.style.display="none",r.style.display="block",B()})}function D(){document.querySelectorAll(".moving").forEach(t=>{t.classList.remove("moving"),t.classList.add("seized")}),O()}function O(){const e=d.childNodes,t=[];if(e.forEach((l,m)=>{let b=!0;l.children[0].childNodes.forEach(v=>{v.classList.contains("seized")||(b=!1)}),b&&(t.unshift(m),l.children[0].childNodes.forEach(v=>{v.classList.remove("seized")}))}),t.length>0){t.forEach(l=>{const m=e[l];d.removeChild(m),M++});for(let l=0;l<t.length;l++)d.prepend(E());document.querySelector(".tetris__score").innerHTML="score : "+M+"점"}i()}function E(){const e=document.createElement("li"),t=document.createElement("ul");for(let l=0;l<T;l++){const m=document.createElement("li");t.prepend(m)}return e.prepend(t),e}function i(){clearInterval(L),L=setInterval(()=>{f("top",1)},N);const e=Object.entries(A),t=Math.floor(Math.random()*e.length);p.type=e[t][0],p.top=0,p.left=4,p.direction=0,u={...p},_()}function a(e){return!(!e||e.classList.contains("seized"))}function f(e,t){u[e]+=t,_(e)}function y(){u.direction===3?u.direction=0:u.direction+=1,_()}function w(){clearInterval(L),L=setInterval(()=>{f("top",1)},10)}document.addEventListener("keydown",e=>{switch(e.keyCode){case 39:f("left",1);break;case 37:f("left",-1);break;case 40:f("top",1);break;case 32:w();break;case 38:y();break}})}W();C();F();
