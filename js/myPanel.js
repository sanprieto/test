import * as THREE from 'three';

export default class MyPanel {

  constructor( scene, renderer, camera, targets ){ 

    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.targets = targets;
    this.obj = null;

    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    
    this.bindEvents();

  }

  bindEvents(){ 

    document.addEventListener('mousedown', this.onMouseDown.bind( this))

  }

  onMouseDown(){ console.log('click')

    const {top, left, width, height} = this.renderer.domElement.getBoundingClientRect();

    this.mouse.x = -1 + 2 * (event.clientX - left) / width;
    this.mouse.y = 1 - 2 * (event.clientY - top) / height;

    this.raycaster.setFromCamera( this.mouse, this.camera );

    const intersects = this.raycaster.intersectObjects( this.targets );

    if ( intersects.length > 0 ) {

      console.log( intersects[0].object )
      this.obj = intersects[0].object

    }

  }

  render() {

  }


}


