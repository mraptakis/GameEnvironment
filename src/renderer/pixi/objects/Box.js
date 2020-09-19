import bb from '../../../utils/blackboard.js'

import Object from './ObjectPixi.js'

class Box extends Object {
    constructor({name,texture,dim}){
        super(name);

        bb.fastInstall('state','player',this);
        this.obj = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.obj.width = (dim && dim.width)?dim.width:100;
        this.obj.height = (dim && dim.height)?dim.height:100;
        this.obj.name = name;
        this.setColor("#ffffff");

    }

    getCategory(){
        return "Box";
    }
}  

bb.fastInstall('objects','Box',Box);