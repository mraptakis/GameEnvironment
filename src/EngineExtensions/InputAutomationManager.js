import Manager from '../Engine/Manager.js'

import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

function pressKey(key){
    let code;
    if(isNaN(key)){
        code = 'Key'+key;
    }else{
        code = 'Digit'+key;
    }
    return (()=>{
        return Engine.InputManager.keyPressed(code);
    });
}

function releaseKey(key){
    let code;
    if(isNaN(key)){
        code = 'Key'+key;
    }else{
        code = 'Digit'+key;
    }
    return (()=>{
        return Engine.InputManager.keyReleased(code);
    });
}

export default class InputAutomationManager extends Manager{

    _actions
    _actionsCB

    constructor() {
        super();
        this._actions = [];
        this._actionsCB = [];

        this.addAction('D',1000,true);
        this.addAction('W',500,true);
        this.addAction('W',600,false);
        this.addAction('D',3000,false);
        this.addAction('M',3500,true);
        this.addAction('M',3550,false);
    }


    addAction(key,delay,pressed = true){
        this._actions.push({
            delay: delay,
            action: (pressed)?pressKey(key):releaseKey(key)
        });
    }

    startInputAutomation(){
        this._actions.forEach(action => {
            this._actionsCB.push(Engine.ClockManager.callIn(action.action,{},action.delay));
        });
    }

    stopInputAutomation(){
        this._actionsCB.forEach(action => {
            Engine.ClockManager.cancelCallBack(action);
        });
    }
}