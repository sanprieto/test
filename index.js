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

  let manager = new THREE.LoadingManager();
  manager.onLoad = function() { 

    const environment = new Environment( myTextures, mobile );

  }

  let imgHtml = document.querySelectorAll('.picture');
  let myTextures = [];

  imgHtml.forEach(( img )=>{

    var loader = new THREE.TextureLoader( manager )
    loader.load( img.src, function ( texture ) {
        texture.encoding = THREE.sRGBEncoding;
        myTextures.push( texture )
        img.style.opacity = 0; //HTML imagen
    }); 
  })
}

if ( document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)
)
  preload ();
else
  document.addEventListener("DOMContentLoaded", preload ); 
