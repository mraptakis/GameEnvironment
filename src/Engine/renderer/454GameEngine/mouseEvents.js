import bb from '../../../utils/blackboard.js'

import dragElement from '../../../utils/drag.js';
import objManager from '../ObjectManager.js'

var mouse = { x : 0, y : 0 };

function translator(ev){
    return [ev.offsetX,ev.offsetY]
}


function focused(obj,x,y){
    if(obj.renderer !== '454')return false;
    let boundingBox = obj.getBoundingBox();
    let [mapX,mapY] = obj.getMapCoords();
    // console.log(obj.name,boundingBox);
    if(mapX < x
    && mapX + boundingBox.width > x
    && mapY < y
    && mapY + boundingBox.height > y){
        return true;
    }
    return false;
}

function rightClick(e){
    e.preventDefault();
    [mouse.x,mouse.y] = translator(e);
    let aliveItems = objManager.objects;
    for(var it in aliveItems){
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            return aliveItems[it];
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
        if(focused(aliveItems[it],mouse.x,mouse.y)){
            return aliveItems[it];
        }
    }
    return false;

}

export default {
    'leftClick': leftClick,
    'rightClick': rightClick,
    'mouseDown': mouseDown
}