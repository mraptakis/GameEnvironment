import Object from './Object.js'

import bb from '../utils/blackboard.js'

class Plane extends Object {
    
    action;
    constructor({name,texture,rotation,dim}){
        super(name);
        this.geometry = new THREE.PlaneGeometry( (dim&&dim.width)?dim.width:1, (dim&&dim.height)?dim.height:1, 32 );
        let materialInfo = {};

        materialInfo.side = THREE.DoubleSide;
        if(texture) materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;
        this.mesh.userData = this;
        if(rotation)this.mesh.rotation.x = rotation.x;

        this.options.push("removeObject");

    }

    animate(){
        // this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.z += 0.01;
    }

    setAction(str){
        this.action = str;
    }

    getAction(){
        return this.action;
    }

}


bb.fastSet('objects','Plane', Plane);