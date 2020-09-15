import bb from '../utils/blackboard.js'

import logAction from '../utils/logs.js'

function dummyAction(){
    let obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
    let pos = obj.getPosition();
    let name = obj.getName();
    name += "_copy";
    let catO = bb.fastGet("objects",obj.getCategory());
    if(typeof catO !== "function"){console.log("There is no category "+category);return;}
    if(!bb.fastGet('liveObjects',name)){
        let it = new catO({name});
        bb.fastSet('liveObjects',name,it);
        it.setPosition(pos.x,pos.y,pos.z);
        it.add();
        logAction("Created Object ["+name+"]");
    }

}

bb.fastSet('actions','dummyAction',dummyAction)