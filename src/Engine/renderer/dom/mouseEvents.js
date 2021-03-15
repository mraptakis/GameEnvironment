import bb from '../../../utils/blackboard.js'

import focusTransition from '../../../utils/focusedObject.js'
import dragElement from '../../../utils/drag.js';

import objManager from '../ObjectManager.js'

var mouse = { x : 0, y : 0 };

function translator(ev){
    return [ev.offsetX,ev.offsetY]
}

function focused(obj,x,y){
    if(obj.renderer !== 'dom')return false;
    let boundingBox = obj.getBoundingBox();
    // console.log(obj.name,boundingBox);
    if(boundingBox.x < x
    && boundingBox.x + boundingBox.width > x
    && boundingBox.y < y
    && boundingBox.y + boundingBox.height > y){
        return true;
    }
    return false;
}

function rightClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        // console.log(aliveItems[it].getPosition());
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            // aliveItems[it].getObject().click();
            focusTransition(it);
            aliveItems[it].triggerEvent('onRightClick');
            return true;
        }
    }
}

function mouseDown(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            if(!aliveItems[it].getOption('isMovable'))return false;
            if(bb.fastGet('settings','Dragging Objects'))dragElement(aliveItems[it],e);
            return true;
        }
    }
}

function leftClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        // console.log(aliveItems[it].getPosition());
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            focusTransition(it);
            aliveItems[it].triggerEvent('onClick');
            return true;
        }
    }
    return false;

}

export default {
    'leftClick': leftClick,
    'rightClick': rightClick,
    'mouseDown': mouseDown
}