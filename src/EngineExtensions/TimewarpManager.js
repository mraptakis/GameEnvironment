import utils from '../utils/utils.js'
import bb from '../utils/blackboard.js'
import Engine from '../Engine.js';

import Manager from '../Engine/Manager.js'

export default class TimewarpManager extends Manager{
    _timeWarping;

    _inter;
    _playBackInter;

    constructor(){
        super();
        this._playBackInter = {};
        this._timeWarping = {};
    }

    async saveTimeFrame(){
        let gameTime = bb.fastGet('state','gameTime');
        let objects = Engine.SaveManager.saveObjectsLocal();
        
        let animators = [];
        Engine.AnimationManager.getAnimators().forEach((an)=>{
            // animators.push(JSON.stringify(an));
            // animators.push(an);
            animators.push({
                _onAction: an._onAction,
                _onFinish: an._onFinish,
                _onStart: an._onStart,
                _lastTime: an._lastTime,
                _currentRep: an._currentRep,
                _name: an._name,
                _anim: an._anim
            });
        });

        this._timeWarping[gameTime] = {
            timeStamp: gameTime,
            objects: objects,
            animators: animators
        }
    }

    startRecording(interval) {
        this._timeWarping = {};
        this._inter = Engine.ClockManager.callIn(this.saveTimeFrame.bind(this),[],interval,true);
    }

    stopRecording(){
        Engine.ClockManager.cancelCallBack(this._inter);
        Engine.PauseManager.pause();
    }

    stopPlayback(){
        for(let i in this._playBackInter){
            Engine.ClockManager.cancelCallBack(this._playBackInter[i]);
        }
        this._playBackInter = {};
    }

    playForward(fromTimestamp,speedFactor = 1){
        this.stopPlayback();
        let ts = Object.keys(this._timeWarping);

        let index = ts.indexOf(fromTimestamp+'');

        if(index === -1) throw Error('Tried to play forward from a timestamp that doesn\'t exist');
        if(speedFactor === 0) throw Error('');

        const factor = 1/speedFactor;

        for(let i = index; i < ts.length; i++){
            let realTS = Number.parseInt(ts[i]);
            let dt = realTS - fromTimestamp;
            dt = dt * factor;
            this._playBackInter[realTS] = Engine.ClockManager.callIn(()=>this.showSnapshot(realTS),[],dt);
        }
    }

    playBackward(fromTimestamp,speedFactor = 1){
        this.stopPlayback();
        let ts = Object.keys(this._timeWarping);

        let index = ts.indexOf(fromTimestamp+'');

        if(index === -1) throw Error('Tried to play forward from a timestamp that doesn\'t exist');
        if(speedFactor === 0) throw Error('');

        const factor = 1/speedFactor;
        for(let i = index; i !== 0; --i){
            let realTS = Number.parseInt(ts[i]);
            let dt = fromTimestamp - realTS;
            dt = dt * factor;
            this._playBackInter[realTS] = Engine.ClockManager.callIn(()=>this.showSnapshot(realTS),[],dt);
        }
    
    }

    showSnapshot(timeStamp){
        let timeWarp = this._timeWarping[timeStamp];
        if(!timeWarp)throw Error('Tried to resume a time that was not recorded');
        
        let objs = timeWarp.objects;
        // TODO:find if an object has been deleted; and if it has then delete if from map;
        let liveObjs = Engine.ObjectManager.objects;
        for(let i in liveObjs){
            if(!objs[i])liveObjs[i].remove();
        }

        for(let i in objs){
            let obj = objs[i];
            utils.resetObject(obj);
        }
        
        if(this._playBackInter[timeStamp])delete this._playBackInter[timeStamp];

        let first = Object.keys(this._timeWarping)[0];
        document.getElementById('timewarp-showRecords').value = timeStamp - first;
    }

    getRecordedTimestamps(){
        return Object.keys(this._timeWarping);
    }

    resumeFromRecording(timeStamp){

        let timeWarp = this._timeWarping[timeStamp];
        if(!timeWarp)throw Error('Tried to resume a time that was not recorded');

        this.showSnapshot(timeStamp);
        Engine.PauseManager.resume();

        // let animators = Engine.AnimationManager.getAnimators();
        // animators.forEach((animator)=>animator.destroy());

        // timeWarp.animators.forEach((an)=>{
        //     let Animator = Engine.AnimationManager.getAnimatorCategory(an._name);
        //     if(!Animator)return;
        
        //     let animator = new Animator();

        //     animator.onStart = an._onStart;
        //     animator.onAction = an._onAction;
        //     animator.onFinish = an._onFinish;
        
        //     animator.start({
        //         animation: an._anim,
        //         timestamp: bb.fastGet('state','gameTime'),
        //     })
        // });

        // debugger;
        // Engine.AnimationManager.restoreAnimators(timeWarp.animators);
        // Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - timeWarp.timeStamp);
    }

    // test(arg) {
    //     // console.log(arg);
    //     bb.installWatch('events','last',Engine.TimewarpManager.test);
    // }

    // onLoad(){
    //     bb.installWatch('events','last',Engine.TimewarpManager.test);
    // }
}