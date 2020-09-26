import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

// function copy(){
//     let obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
//     let pos = obj.getPosition();
//     let name = obj.getName();
//     name += "_copy";
//     let catO = bb.fastGet("objects",obj.getCategory());
//     if(typeof catO !== "function"){console.log("There is no category "+category);return;}
//     if(!bb.fastGet('liveObjects',name)){
//         let it = new catO({name});
//         bb.fastSet('liveObjects',name,it);
//         it.setPosition(pos.x,pos.y);
//         it.add();
//         logManager.logAction("Created Object ["+name+"]");
//     }

// }

function dummyAction(){
    console.log(bb.fastGet('liveObjects',bb.fastGet('state','focusedObject')).getPositional());
}

bb.fastSet('actions','dummyAction',dummyAction)