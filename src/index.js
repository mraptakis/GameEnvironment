import './utils/initializationManager.js'

import App from './app.js'

import bb from './utils/blackboard.js'
import FPSCounter from './utils/fps.js'
import inputManager from './utils/inputManager.js'
import installWatches from './utils/watches.js'

import init from '../assets/json/pacman.js' //json
import keyToAction from '../assets/json/keyToActions.js' //json


const app = new App();
const game = app.game;

function inpHandler(key) {
    // if(bb.fastGet('state','mode') === 'editing')return;
    if(keyToAction[key])keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
    if(localStorage.getItem(key))bb.fastGet('scripting','executeCode')(localStorage.getItem(key));
};

const aliveItems            = bb.getComponent('liveObjects').itemMap;
const progressAllAnimations = bb.fastGet('animation','progress');
const animationLoader       = bb.fastGet('animation','load');
const assetsToLoad          = bb.fastGet('animation', 'requiredAssets');
const rend                  = bb.fastGet('renderer','render');
const phUpdate              = bb.fastGet('physics','update');

app.addInitialiseFunction(()=>{

    if(init.state.background_color)document.body.style.backgroundColor = init.state.background_color;
    if(init.state.background)document.body.style.backgroundImage = `url('${init.state.background}')`;

    init.objects.forEach((item)=>{
        let category = bb.fastGet('objects',item.category);
        if(!category || typeof category !== "function"){console.log("There is no category "+item.category)}
        if(item.meta.name === undefined 
        || !bb.fastGet('liveObjects',item.meta.name)){
            let it = new category(item.meta);
            if(item.color)it.setColor(item.color);
            if(item.position)it.setPosition(item.position.x,item.position.y);
            if(item.attributes){
                for(let a in item.attributes){
                    if(typeof item.attributes[a] !== "boolean")throw Error('Attributes must be boolean');
                    it.setOption(a,item.attributes[a]);
                }
            }
            if(item.fields){
                for(let f in item.fields){
                    it.addValue(f,item.fields[f]);
                }
            }
            if(item.events){
                for(let e in item.events){
                    it.addEvent(item.events[e]);
                }
            }
            it.add();
            if(bb.fastGet('physics','addToWorld'))bb.fastGet('physics','addToWorld')(it);
        }
    });

});

app.addLoadFunction(()=>{
    animationLoader();
    assetsToLoad().forEach((asset)=>{
        if(!bb.fastGet('assets',asset)){
            let img = new Image();
            img.src = asset;
            bb.fastInstall('assets',asset,img);
        }
    });
    installWatches();
    bb.print();
});

game.render = ()=>{
    if(rend)
        rend.forEach((it)=>it());
};

game.input = ()=>{
    inputManager.getPressedKeys().forEach((key)=>inpHandler(key));
};

game.animation = ()=>{
    progressAllAnimations(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{
}

game.physics = ()=>{
    if(phUpdate)phUpdate();
};


// TODO: move this to collisionManager
function collided(obj1,obj2){
    if(obj1 === obj2)return;
    if(!obj1.getOption('isCollidable') || !obj2.getOption('isCollidable'))return;
    let pos1 = obj1.getPositional();
    let pos2 = obj2.getPositional();
    if(pos1.x >= pos2.x + pos2.width || pos2.x >= pos1.x + pos1.width){
        return false;
    }

    if(pos1.y >= pos2.y + pos2.height || pos2.y >= pos1.y + pos1.height){
        return false;
    }

    obj1.triggerEvent('onCollision');
    obj2.triggerEvent('onCollision');
    console.log(obj1.name,obj2.name);
}

game.collisions = ()=>{
    for(let i in aliveItems){
        for(let j in aliveItems){
            collided(aliveItems[i],aliveItems[j]);
        }
    }
};

game.userCode = ()=>{
    for(let i in aliveItems){
        aliveItems[i].newFrame();
    }
};

game.extra = ()=>{
    FPSCounter();
};


// window.onbeforeunload = function(e) {
//     app.game.stop();
//     bb.fastGet('gameEngine','animationFilmHolder').cleanUp();
//     Blockly = undefined;
//     let objs = bb.getComponent('liveObjects').itemMap;
//     for(let i in objs){
//         objs[i].remove();
//     }
//     bb.clear();
//     return true;
// };

app.main();