import bb from '../../utils/blackboard.js'

import focusObject from '../../transitionHandlers/focusedObject.js'

import logManager from '../../utils/logs.js'

function removeObject(obj){
    if(!obj || typeof obj !== object){
        logManager.logError("On remove object");
        return;
    }
    obj.triggerEvent('onRemove');
    obj.remove();
    logManager.logAction("Removed Object ["+obj.name+"]");
    focusObject(undefined);
}

bb.fastSet('actions','removeObject',removeObject)