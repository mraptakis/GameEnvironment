'use strict';

import bb from './blackboard.js'

bb.fastSet('state','mode','editing');
bb.fastSet('state','focusedObject',undefined);

// <Engine>

import '../Engine.js'

import '../Engine/animations/animations.js'

// import '../physics/physics.js'

import '../Engine/renderer/renderer.js'

import '../Engine/collisions/collisions.js'

import '../sound/sound.js'
// </Engine>

// <Extra>
import '../scripting/scripting.js'

import '../actions/actions.js'

import '../UI/UI.js'
// </Extra>


// <SanityChecks>
import requirements from '../../assets/json/strictRequirementsAfterLoad.js' // json

for(let i in requirements){
    if(!bb.getComponent(i))throw Error("Missing Component "+i);
    requirements[i].forEach(element => {
        if(!bb.fastGet(i,element))throw Error("Missing Component Element " + i + "->" + element);
    });
}
// </SanityChecks>