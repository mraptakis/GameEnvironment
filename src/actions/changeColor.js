import bb from '../utils/blackboard.js'

function changeColor(objName,colour){
    if(!colour){
        let obj = bb.fastGet('liveObjects',objName);
        if(obj)obj.setColor("#ffffff");
    }else{
        let obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
        if(obj)obj.setColor(colour);
    }
}

bb.fastSet('actions','changeColor',changeColor)