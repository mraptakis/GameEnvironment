import bb from '../../utils/blackboard.js'

import logManager from '../../utils/logs.js'

function renameObject(obj = "BOOOOOX",newName = "NEWNAMEEEE"){
    if(bb.fastGet('liveObjects',newName)){
        logManager.logError("Name " + newName + " already exists");
        return;
    }
    bb.fastGet('liveObjects',obj).setName(newName);
}

bb.fastSet('actions','renameObject',renameObject);