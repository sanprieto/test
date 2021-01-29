import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log( OrbitControls )

export default class Environment {

  constructor( textures, mobile ){ 

    this.textures = textures;
    this.mobile = mobile;
    
    this.stats = new Stats();
    document.body.appendChild( this.stats.dom );

    this.container = document.querySelector( '#magic' );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xFFFFFF)
    this.createCamera();
    this.controls = new OrbitControls( this.camera, this.container );
    this.createRenderer();

    this.setup()
    this.bindEvents();
  }

  bindEvents(){

    window.addEventListener( 'resize', this.onWindowResize.bind( this ) );
    
  }

  setup(){ 

    const geometry = new THREE.BoxGeometry( 100, 100, 100 );
    const material = new THREE.MeshBasicMaterial( {map: this.textures[0]} );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

  }

  render() {

     this.stats.update();

     this.renderer.render( this.scene, this.camera )
  }

  createCamera() {

    const perspective = 800;
    const fov = (180 * ( 2 * Math.atan( this.container.clientHeight / 2 / perspective))) / Math.PI;

    this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
    this.camera.position.set( 0,0, perspective );

  }

  createRenderer() {

    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

    this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2));

    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.container.appendChild( this.renderer.domElement );

    this.renderer.setAnimationLoop(() => { this.render() })

  }

  onWindowResize(){


    // const fov = (180 * (2 * Math.atan(this.container.clientHeight / 2 / 800))) / Math.PI;
    // this.camera.fov = fov;

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

  }

}


