import bb from '../../../utils/blackboard.js'

import Object from './ObjectPixi.js'

function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}

class Sphere extends Object {
    constructor({name,texture,dim}){
        super(name);
        let [X,Y] = fromPercentageToPx((dim&&dim.width)?dim.width:5,(dim&&dim.height)?dim.height: 5);
        this.obj = new PIXI.Graphics();
        this.obj.beginFill(0xffffff);
        this.obj.drawCircle(30, 30, 30);
        this.obj.endFill();
        this.obj.width = X;
        this.obj.height = X;

        this.obj.name = name;
        this.setColor("#ffffff");

    }

    getCategory(){
        return "Sphere";
    }
}  

bb.fastInstall('objects','Sphere',Sphere);