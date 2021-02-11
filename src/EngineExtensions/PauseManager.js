import bb from '../utils/blackboard.js'

import Engine from '../Engine.js'

export default class PauseManager {
    timePaused

    constructor(){
        this.timePaused = undefined;
    }

    pause(){
        if(Engine.timePaused) throw Error('Pause while paused');
        this.timePaused = bb.fastGet('state','gameTime');
        Engine.game.pause();
    }

    resume(){
        if(!this.timePaused) throw Error('Resume without pause');
        Engine.AnimationManager.timeShift(bb.fastGet('state','gameTime') - this.timePaused);
        Engine.game.unpause();
        this.timePaused = undefined;
    }
}