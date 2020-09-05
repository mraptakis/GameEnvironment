function changeColor(objName,color){
    bb.fastGet('liveObjects',objName).setColor(color);
}

bb.fastSet('actions','changeColor',changeColor)