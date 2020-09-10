import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'

class Sphere extends ActionObject {
    
    constructor({name,texture,dim}){
        super(name);
        this.div = document.createElement('div');
        this.div.id = name;
        this.div.style.width = (dim&&dim.width)?dim.width: "100px";
        this.div.style.height = (dim&&dim.height)?dim.height: "100px";

        
        if(texture){
            this.div.style.backgroundImage = texture;
            this.div.style.backgroundSize = 'cover';
            this.div.style.backgroundPosition = 'center';
        }
        this.div.style.position = "absolute";
        this.div.style.borderRadius = "50px";
        
        this.options.push('move');
        this.options.push('changeColor');
        this.options.push("removeObject");

    }

    animate(){
        // this.mesh.position.x += 0.01;
        // this.mesh.position.y += 0.01;
    }
}

bb.fastInstall('objects','Sphere',Sphere);