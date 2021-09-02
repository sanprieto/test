import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import MyPanel from "/js/myPanel.js";

export default class Environment {

  constructor( textures, mobile ){ 

    this.textures = textures;
    this.mobile = mobile;
    this.targets = [];
    
    this.stats = new Stats();
    document.body.appendChild( this.stats.dom );

    this.container = document.querySelector( '#magic' );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xFFFFFF)
    this.createCamera();
    this.controls = new OrbitControls( this.camera, this.container );

    this.createRenderer();

    this.setup();
    this.bindEvents();
    this.helpers();
    this.thePanel();
  }

  thePanel(){

    this.myPanel = new MyPanel( this.scene, this.renderer, this.camera, this.targets )
  }

  bindEvents(){

    window.addEventListener( 'resize', this.onWindowResize.bind( this ) );
    
  }

  setup(){ 

    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    const material = new THREE.MeshBasicMaterial( {map: this.textures[0]} );
    const cube = new THREE.Mesh( geometry, material );
    this.scene.add( cube );

    this.targets.push( cube )

    console.log( cube )

  }

  render() {

     this.stats.update();

     this.renderer.render( this.scene, this.camera )
  }

  createCamera() {

    this.camera = new THREE.PerspectiveCamera( 65, this.container.clientWidth / this.container.clientHeight, 1, 10000 );
    this.camera.position.set( 0,0, 15 );

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

    console.log( window.innerHeight, this.container.clientHeight )

    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );

  }

  helpers(){

    const size = 20;
    const divisions = 20;

    const gridHelper = new THREE.GridHelper( size, divisions );
    this.scene.add( gridHelper );

    const axesHelper = new THREE.AxesHelper( 15 );
    this.scene.add( axesHelper );
  }

}


