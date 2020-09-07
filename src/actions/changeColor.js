import bb from '../utils/blackboard.js'

function changeColor(obj,colour){
    console.log(obj)
    if(!obj)obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
    console.log(obj)
    if(obj)obj.setColor(colour);
}

bb.fastSet('actions','changeColor',changeColor)