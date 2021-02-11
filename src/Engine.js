import App from './Engine/app.js'
import bb from './utils/blackboard.js'

import FPSCounter from './utils/fps.js'
import inputManager from './Engine/inputManager.js'
import installWatches from './utils/watches.js'

import objectManager from './Engine/renderer/renderer.js'
import AnimationManager from './Engine/animations/animations.js'
import CollisionManager from './Engine/collisions/collisions.js'
import PhysicsManager from './Engine/physics/physics.js'
import SoundManager from './Engine/sound/sound.js'

import utils from './utils/utils.js'

const app = new App();
const game = app.game;

class _Engine {
    _managers

    constructor(){
        this._managers = {};
    }

    installManager(name, manager){
        if(this._managers[name])return false;
        this._managers[name] = manager;
        this[name] = manager;
        bb.fastInstall('Engine',name,manager);
        return true;
    }

    hasManager(name){
        return name in this._managers;
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
        // else throw Error('No level Info provided');
    }

    set animationBundle(an){
        this._animationBundle = an;
    }

    get animationBundle(){
        if(this._animationBundle)return this._animationBundle;
        else throw Error('No Animations provided');
    }

    set preSetAnimations(preSet){
        this._preSetAnimations = preSet;
    }

    get preSetAnimations(){
        if(this._preSetAnimations)return this._preSetAnimations;
        else throw Error('No Animations provided');
    }

}

const Engine = new _Engine();


game.render = ()=>{
    Engine.ObjectManager.renderAll();
};

app.addInitialiseFunction(()=>{
    Engine.installManager('AnimationManager', new AnimationManager(Engine.animationBundle,Engine.preSetAnimations))

    Engine.installManager('CollisionManager', new CollisionManager());

    Engine.installManager('SoundManager', new SoundManager());

    Engine.installManager('ObjectManager', objectManager);

    Engine.installManager('InputManager', inputManager);

    // Engine.installManager('PhysicsManager', new PhysicsManager());

    let init = Engine.initInfo;
    if(init && init.state.background_color)document.body.style.backgroundColor = init.state.background_color;
    if(init && init.state.background)document.body.style.backgroundImage = `url('${init.state.background}')`;

    if(init)
    init.objects.forEach((item)=>{
        utils.createObject(item);
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
});

game.input = ()=>{
    // if(game.gameState === 3)return; // 3 === PAUSED
    Engine.InputManager.pollKeys();
    Engine.InputManager.getReleasedKeys().forEach((key)=>utils.inputHandler('Unpressed'+key));
    Engine.InputManager.getPressedKeys().forEach((key)=>utils.inputHandler('Pressed'+key));
};

game.animation = ()=>{
    Engine.AnimationManager.progress(bb.fastGet('state','gameTime'));
};

game.ai = ()=>{
}

game.physics = ()=>{
    if(Engine.PhysicsManager)Engine.PhysicsManager.update();
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

//--------------------Engine Object--------------------//

Engine.start = ()=>{
    app.main();
    bb.fastInstall('Engine','Self',Engine);

    let aliveItems = Engine.ObjectManager.objects;
    for(let i in aliveItems)
        aliveItems[i].triggerEvent('onGameStart');

    bb.print();
}


export default Engine;