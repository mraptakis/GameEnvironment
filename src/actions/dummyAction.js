import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

import Engine from '../Engine.js'


function dummyAction(){
    
}

bb.fastInstall('actions','dummyAction',dummyAction)