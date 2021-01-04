import App from './Engine/app.js'
import bb from './utils/blackboard.js'

import FPSCounter from './utils/fps.js'
import inputManager from './utils/inputManager.js'
import installWatches from './utils/watches.js'

const rend                  = bb.fastGet('renderer',   'render');
const phUpdate              = bb.fastGet('physics',    'update');

const app = new App();
const game = app.game;

class _Engine {
    _managers

    constructor(){
        this._managers = {};
    }

    get app(){
        return app;
    }

    get game(){
        return game;
    }

    set initInfo(info){
        this._initInfo = info;
    }

    get initInfo(){
        if(this._initInfo)return this._initInfo;
        else throw Error('No level Info provided');
    }

    set animationBundle(an){
        this._animationBundle = an;
    }

    get animationBundle(){
        if(this._animationBundle)return this._animationBundle;
        // else throw Error('No Animations provided');
    }

    set preSetAnimations(preSet){
        this._preSetAnimations = preSet;
    }

    get preSetAnimations(){
        if(this._preSetAnimations)return this._preSetAnimations;
        // else throw Error('No Animations provided');
    }

    set timePaused(tp){
        this._timePaused = tp;
    }

    get timePaused(){
        return this._timePaused;
    }

    set AnimationManager(anM){
        if(!(anM instanceof AnimationManager)) throw Error('Set AnimationManager isn\'t Instance of AnimationManager');
        this._managers['AnimationManager'] = anM;
    }

    get AnimationManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['AnimationManager']) throw Error('AnimationManager wasn\'t initialised');
        return this._managers['AnimationManager'];
    }

    set CollisionManager(anM){
        if(!(anM instanceof CollisionManager)) throw Error('Set CollisionManager isn\'t Instance of CollisionManager');
        this._managers['CollisionManager'] = anM;
    }

    get CollisionManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['CollisionManager']) throw Error('CollisionManager wasn\'t initialised');
        return this._managers['CollisionManager'];
    }

    set ObjectManager(anM){
        this._managers['ObjectManager'] = anM;
    }

    get ObjectManager(){
        // PB: PERFORMANCE BOOST
        // if(!this._managers['ObjectManager']) throw Error('ObjectManager wasn\'t initialised');
        return this._managers['ObjectManager'];
    }

}

const Engine = new _Engine();


game.render = ()=>{
    if(rend)
        rend.forEach((it)=>it());
};

app.addInitialiseFunction(()=>{
    Engine.AnimationManager = new AnimationManager(Engine.preSetAnimations,Engine.animationBundle);
    Engine.CollisionManager = new CollisionManager();
    Engine.ObjectManager = objectManager;

    let init = Engine.initInfo;
    if(init.state.background_color)document.body.style.backgroundColor = init.state.background_color;
    if(init.state.background)document.body.style.backgroundImage = `url('${init.state.background}')`;

    init.objects.forEach((item)=>{
        let category = Engine.ObjectManager.getConstructor(item.category);
        if(!category || typeof category !== "function"){console.log("There is no category "+item.category)}
        if(item.meta.name !== undefined){
            let it = new category(item.meta,item.id);
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
    Engine.AnimationManager.load();
    Engine.AnimationManager.requiredAssets().forEach((asset)=>{
        if(!bb.fastGet('assets',asset)){
            let img = new Image();
            img.src = asset;
            bb.fastInstall('assets',asset,img);
        }
    });
    installWatches();
    Engine.CollisionManager.loadSaved();
});

game.input = ()=>{
    // if(game.gameState === 3)return; // 3 === PAUSED
    inputManager.pollKeys();
    inputManager.getPressedKeys().forEach((key)=>inpHandler(key));
};

game.animation = ()=>{
    Engine.AnimationManager.progress(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{
}

game.physics = ()=>{
    if(phUpdate)phUpdate();
};

game.collisions = ()=>{
    Engine.CollisionManager.checkAndInvoke(Engine.ObjectManager.objects);
};

game.userCode = ()=>{
    const aliveItems = Engine.ObjectManager.objects;
    for(let i in aliveItems){
        aliveItems[i].newFrame();
    }
};

game.extra = ()=>{
    FPSCounter();
};



import keyToAction from '../assets/json/keyToActions.js' //json
// TODO: move this to somewhere better
function inpHandler(key) {
    // if(bb.fastGet('state','mode') === 'editing')return;
    if(keyToAction[key]){
        keyToAction[key].forEach((action)=>bb.fastGet('actions',action)());
        return;
    }
    if(localStorage.getItem(key))bb.fastGet('scripting','executeCode')(localStorage.getItem(key));
};

//--------------------Engine Object--------------------//

Engine.start = ()=>{
    app.main();

    bb.fastInstall('manager','AnimationManager',Engine.AnimationManager);
    bb.fastInstall('manager','CollisionManager',Engine.CollisionManager);
    bb.fastInstall('manager','ObjectManager',Engine.ObjectManager);

    bb.print();
}

Engine.pause = ()=>{
    if(Engine.timePaused) throw Error('Pause while paused');
    Engine.timePaused = bb.fastGet('state','gameTime');
    Engine.game.pause();
}

Engine.resume = ()=>{
    if(!Engine.timePaused) throw Error('Resume without pause');
    Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - Engine.timePaused);
    Engine.game.unpause();
    Engine.timePaused = undefined;
}


import objectManager from './Engine/renderer/renderer.js'
import AnimationManager from './Engine/animations/animations.js'
import CollisionManager from './Engine/collisions/collisions.js'

export default Engine;