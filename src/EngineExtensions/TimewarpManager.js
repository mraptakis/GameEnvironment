import utils from '../utils/utils.js'
import bb from '../utils/blackboard.js'
import Engine from '../Engine.js';

import Manager from '../Engine/Manager.js'
import Animator from '../Engine/animations/Animators/Animator.js';

export default class TimewarpManager extends Manager{
    _timeWarping;
    _last;

    _inter;

    constructor(){
        super();
        this._timeWarping = {};
    }

    async saveTimeFrame(args){
        let gameTime = bb.fastGet('state','gameTime');
        let objects = Engine.SaveManager.saveObjectsLocal();
        
        let animators = [];
        Engine.AnimationManager.getAnimators().forEach((an)=>{
            animators.push(JSON.stringify(an));
        });

        if(!this._last)
            this._last = gameTime;
        this._timeWarping[gameTime] = {
            timeStamp: gameTime,
            objects: objects,
            animators: animators
        }
        console.log(this._timeWarping);
    }
    
    // setBack(){
    //     let timeWarp = this._timeWarping[this._last];
    //     Engine.AnimationManager.restoreAnimators(timeWarp.animators);
    //     Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - timeWarp.timeStamp);
    // }

    startRecording(interval) {
        this._timeWarping = {};
        this._inter = Engine.ClockManager.callIn(this.saveTimeFrame.bind(this),[],interval,true);
    }

    stopRecording(){
        Engine.ClockManager.cancelCallBack(this._inter);
        Engine.PauseManager.pause();
    }

    showSnapshot(timeStamp){
        // clear all objects;
        // load all objects from the said timestamp;
    }

    resumeFromRecording(timeStamp){
        timeStamp = this._last;
        console.log(timeStamp);
        let timeWarp = this._timeWarping[timeStamp];
        if(!timeWarp)throw Error('Tried to resume a time that was not recorded');
        
        console.log('Stopping All Animations...');
        let animators = Engine.AnimationManager.getAnimators();
        animators.forEach((animator)=>animator.destroy());

        // debugger;
        // Engine.AnimationManager.restoreAnimators(timeWarp.animators);
        // Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - timeWarp.timeStamp);
    }

    onLoad(){
        this.startRecording(0);
        Engine.ClockManager.callIn(this.stopRecording.bind(this),[],5000);
        // Engine.ClockManager.callIn(this.resumeFromRecording.bind(this),[],2700);
    }
}