var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xaaaaaa );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.domElement.style.position = "absolute";
renderer.domElement.style.left = "50%";
renderer.setSize( window.innerWidth/2 , window.innerWidth/2 );
document.body.appendChild( renderer.domElement );

class Object {
    material

    constructor(){
        this.material = new THREE.MeshBasicMaterial( { color: 0x00ff00 });
    }

    setColor(col){
        this.material.color = new THREE.Color(col);
    }

    getMaterial(){
        return this.material;
    }
}

class Box extends Object {
    geometry 
    mesh
    
    constructor(){
        super();
        this.geometry = new THREE.BoxGeometry();
        this.mesh = new THREE.Mesh( this.geometry, this.material );
    }
    
    getGeometry(){
        return this.geometry;
    }

    getObject(){
        return this.mesh;
    }

    animate(){
        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;
    }

}

class Sphere extends Object {
    geometry 
    mesh
    
    constructor(){
        super();
        this.geometry = new THREE.SphereGeometry();
        this.mesh = new THREE.Mesh( this.geometry, this.material );
    }
    
    getGeometry(){
        return this.geometry;
    }

    getObject(){
        return this.mesh;
    }

    animate(){
        this.mesh.position.x += 0.01;
        this.mesh.position.y += 0.01;
    }
}

var box = new Box();
box.setColor(0x00ffff);
scene.add( box.getObject() );

var sphere = new Sphere();
scene.add( sphere.getObject() );

camera.position.z = 10;

function animate() {
    requestAnimationFrame( animate );
    
    box.animate();

    sphere.animate();

    renderer.render( scene, camera );
}
animate();