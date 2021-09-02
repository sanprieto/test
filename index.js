import '/css/Style.css';
import Environment from '/js/app';
import * as THREE from 'three';

const preload = () => {

  const mobile = (navigator.userAgent.match(/Android/i) 
      || navigator.userAgent.match(/webOS/i) 
      || navigator.userAgent.match(/iPhone/i)  
      || navigator.userAgent.match(/iPad/i)  
      || navigator.userAgent.match(/iPod/i) 
      || navigator.userAgent.match(/BlackBerry/i) 
      || navigator.userAgent.match(/Windows Phone/i)) ? true : false;


  var timeleft = 30;
  var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
    }
    document.getElementById("progressBar").value = 10 - timeleft;
    var objetivo = document.getElementById('time');
    objetivo.innerHTML = timeleft;
    timeleft -= 1;
  }, 1000);

  document.querySelector('input').addEventListener('click', ()=>{ 

    alert('Número incorrecto')

  })

}

if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)
)
  preload ();
else
  document.addEventListener("DOMContentLoaded", preload ); 
