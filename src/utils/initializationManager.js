'use strict';

import bb from './blackboard.js'

bb.fastSet('state','mode','editing');
bb.fastSet('state','focusedObject',undefined);


bb.fastSet('settings','noDrag', true);
bb.fastSet('settings','highlightInvisibleObjects',false);

// <Engine>
import '../Engine.js'
// </Engine>

// <Required>
import '../scripting/scripting.js'

import '../actions/actions.js'
// </Required>

// <Extra>
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