import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

class Box extends ActionObject {
    goal
    constructor({name,texture,dim}){
        super(name);
        bb.fastInstall('state','player',name);
        this.geometry = new THREE.BoxGeometry((dim&&dim.width)?dim.width:1, (dim&&dim.height)?dim.height:1,1);
        let materialInfo = {};

        if(texture)materialInfo.map = new THREE.TextureLoader().load( texture );
        
        this.material = new THREE.MeshBasicMaterial( materialInfo );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.mesh.name = name;

        this.goal = new THREE.Object3D;
        this.goal.position.set(0, 4, -4);
        this.mesh.add( this.goal );
        this.options.push('changeColor');
        this.options.push("removeObject");

        this.events['onEachFrame'] = localStorage.getItem(this.name+"_onEachFrame");

    }

    animate(){
        this.triggerEvent('onEachFrame');
    }

    getGoal(){
        return this.goal;
    }

}


bb.fastInstall('objects','Box',Box);