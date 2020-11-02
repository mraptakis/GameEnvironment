import './EnvironmentObject.js'

import './dom/renderer.js'
import './454GameEngine/renderer.js'
// import './pixi/renderer.js'
// import './threejs/renderer.js'

import bb from '../utils/blackboard.js'

import changeFocus from '../transitionHandlers/focusedObject.js'

let clickWrapper = document.createElement('div');
    clickWrapper.id = "clickWrapper";
    clickWrapper.style.width = window.innerWidth + 'px';
    clickWrapper.style.height = window.innerHeight + 'px';
    clickWrapper.style.opacity = 0;
    clickWrapper.style.position = 'absolute';
    clickWrapper.style.top = 0;
    clickWrapper.style.left = 0;
    document.body.appendChild(clickWrapper);


let funcsLC = bb.fastGet('renderer','leftClick');
clickWrapper.addEventListener('click',(ev)=>{
    let anythingFocused = false;
    for(var f in funcsLC){
        anythingFocused = funcsLC[f](ev);
        if(anythingFocused)break;
    }
    if(!anythingFocused)changeFocus(undefined);
});

let funcsMD = bb.fastGet('renderer','mouseDown');
clickWrapper.addEventListener('mousedown',(ev)=>{
    if(bb.fastGet('state','mode') !== "editing")return;
    for(var f in funcsMD){
        if(funcsMD[f](ev))break;
    }
});

let funcsRC = bb.fastGet('renderer','rightClick');
clickWrapper.addEventListener('contextmenu',(ev) => {
    for(var f in funcsRC){
        if(funcsRC[f](ev))break;
    }
})