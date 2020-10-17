import './utils/initializationManager.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'
import inputManager from './utils/inputManager.js'

import init from '../assets/json/init.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json

init.objects.forEach((item)=>{
    let category = bb.fastGet("objects",item.category);
    if(typeof category !== "function"){console.log("There is no category "+item.category)}
    if(item.meta.name === undefined 
    || !bb.fastGet('liveObjects',item.meta.name)){
        if(!category)return;
        let it = new category(item.meta);
        if(item.color)it.setColor(item.color);
        if(item.position)it.setPosition(item.position.x,item.position.y);
        if(item.attributes)item.attributes.forEach((attr)=>it.setOption(attr,true));
        it.add();
        if(bb.fastGet('physics','addToWorld'))bb.fastGet('physics','addToWorld')(it);
    }
})

function inpHandler(key) {
    if(keyToAction[key])keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    if(bb.fastGet('state','mode') === 'editing')return;
    if(localStorage.getItem(key))bb.fastGet('scripting','executeCode')(localStorage.getItem(key));
};


let aliveItems = bb.getComponent('liveObjects').itemMap;

bb.print();

function GameLoop() {

    let _map = {
        'Render': ()=>{bb.fastGet('renderer','render').forEach((it)=>it())},
        'Input': ()=>{inputManager.getPressedKeys().forEach((key)=>inpHandler(key));},
        'ProgressAnimations': ()=>{},
        'AI': ()=>{},
        'Physics': ()=>{if(bb.fastGet('physics','update'))bb.fastGet('physics','update')()},
        'CollisionChecking': ()=>{},
        'CommitDestructions': ()=>{},
        'UserCode': ()=>{},
        'FPS': ()=>FPSCounter()
    };

    let _loopIterationOrder = [
        'Render',
        'Input',
        'ProgressAnimations',
        'AI',
        'Physics',
        'CollisionChecking',
        'CommitDestructions',
        'UserCode',
        'FPS'
    ];

    function run(){
        _loopIterationOrder.forEach(item => _map[item]());
    }

    return run;
}

let gameLoop = new GameLoop();

function refresh() {
    requestAnimationFrame( refresh );
    gameLoop();
}
refresh();