import bb from '../../utils/blackboard.js'

function trimPX(str){
    return Number.parseFloat(str.slice(0, -2));
}

class MatterJS {
    engine

    objMap = {};

    constructor(){
        this.engine = Matter.Engine.create();
    }

    addToWorld(item){
        if(this.objMap[item.getName()])throw Error("This item already exist in matter world");
        let pos = item.getPositional();
        this.objMap[item.getName()] = {realObject: item};
        let objMapItem = this.objMap[item.getName()];
        for(let i in pos){
            objMapItem[i] = trimPX(pos[i]);
        }
        let options = {
            isStatic: item.getOption('isSolid')
        };
        if(pos.r !== undefined){
            let x = objMapItem.x + objMapItem.r/2;
            let y = objMapItem.y + objMapItem.r/2;
            objMapItem["phObject"] = Matter.Bodies.circle(x, y, objMapItem.r, options);
        }else{
            let x = objMapItem.x+ objMapItem.width/2;
            let y = objMapItem.y+ objMapItem.height/2;
            objMapItem["phObject"] = Matter.Bodies.rectangle(x, y, objMapItem.width, objMapItem.height, options);
        }
        objMapItem["phObject"].name = item.getName();
        Matter.World.add(this.engine.world, objMapItem["phObject"]);
        console.log(objMapItem);
    }

    removeFromWorld(name){
        if(!this.objMap[name])throw Error("This item doesn't exist in matter world");
        Matter.World.remove(this.engine.world, this.objMap[name]["phObject"]);
        delete this.objMap[name];
    }

    update(){
        Matter.Engine.update(this.engine);
        this.engine.world.bodies.forEach((body)=>{
            let realObj = bb.fastGet('liveObjects',body.name);
            if(!realObj){
                this.removeFromWorld(body.name);
                return;
            }
            let proxy = this.objMap[body.name];
            if(body.label === "Rectangle Body"){
                realObj.setValue('x',body.position.x - proxy.width/2);
                realObj.setValue('y',body.position.y - proxy.height/2);
            }else {
                realObj.setValue('x',body.position.x - proxy.r);
                realObj.setValue('y',body.position.y - proxy.r);
            }
        });
    }
}

const matter = new MatterJS();

bb.fastInstall('physics','addToWorld',(item)=>matter.addToWorld(item));
bb.fastInstall('physics','removeFromWorld',(item)=>matter.removeFromWorld(item));
bb.fastInstall('physics','update',()=>matter.update());



bb.fastSet('actions','playPhysics',()=>bb.fastGet('physics','update')()); ///