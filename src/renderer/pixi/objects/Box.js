import bb from '../../../utils/blackboard.js'

import Object from './ObjectPixi.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Box extends Object {
    constructor({name,texture,dim}){
        super(name);

        bb.fastInstall('state','player',this);
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.obj = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.obj.width = X;
        this.obj.height = X;
        this.obj.name = name;
        this.setColor("#ffffff");

    }

    getCategory(){
        return "Box";
    }
}  

bb.fastInstall('objects','Box',Box);