import './utils/initialisationManager.js'

import {leftClick,rightClick} from './utils/mouseEvents.js'

import init from '../init.js' //json

var scene = bb.fastGet('liveObjects','scene').getScene();
var camera = bb.fastGet('liveObjects','camera').getCamera();

var renderer = new THREE.WebGLRenderer();
// renderer.domElement.style.position = "absolute";
// renderer.domElement.style.left = "50%";
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );



init.objects.map((item)=>{
    let category = bb.fastGet("objects",item.category);
    if(typeof category !== "function"){console.log("There is no category "+item.category)}
    if(item.name === undefined 
    || !bb.fastGet('liveObjects',item.name)){
        let it = new category({name:item.name});
        bb.fastSet('liveObjects',item.name,it);
        if(item.color)it.setColor(item.color);
        if(item.position)it.setPosition(item.position.x,item.position.y);
        scene.add(it.getObject());
        console.log(item);
    }
})





renderer.domElement.addEventListener("click", leftClick, true);
renderer.domElement.addEventListener("contextmenu", rightClick, true);

document.onkeydown = function(ev) {
    console.log(ev);
    if(ev.key === "1"){
        bb.fastGet('actions','changeColor')(document.getElementById("inputss").value,'#ffffff');
    }
};



let aliveItems = bb.getComponent('liveObjects').itemMap;

bb.print();

function animate() {
    requestAnimationFrame( animate );
    
    for(var it in aliveItems){
        aliveItems[it].animate();
    }

    renderer.render( scene, camera );
}
animate();