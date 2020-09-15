import './utils/initializationManager.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'

import init from '../assets/json/init.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json

init.objects.forEach((item)=>{
    let category = bb.fastGet("objects",item.category);
    if(typeof category !== "function"){console.log("There is no category "+item.category)}
    if(item.meta.name === undefined 
    || !bb.fastGet('liveObjects',item.meta.name)){
        let it = new category(item.meta);
        bb.fastSet('liveObjects',item.meta.name,it);
        if(item.color)it.setColor(item.color);
        if(item.position)it.setPosition(item.position.x,item.position.y,item.position.z);
        it.add();
    }
})

document.onkeydown = function(ev) {
    for(var key in keyToAction){
        if(ev.code === key){
            keyToAction[key].map((action)=>bb.fastGet('actions',action)(bb.fastGet('state','focusedObject')));
        }
    }
    // if(bb.fastGet('state','mode') === "editing")return;
    if(localStorage.getItem(ev.code)){
        bb.fastGet('scripting','executeCode')(localStorage.getItem(ev.code));
    }
};



let aliveItems = bb.getComponent('liveObjects').itemMap;

bb.print();


function gameLoop() {
    requestAnimationFrame( gameLoop );
    
    FPSCounter();
    for(var it in aliveItems){
        aliveItems[it].animate();
    }
    bb.fastGet('renderer','render').forEach((it)=>it())
    
}
gameLoop();