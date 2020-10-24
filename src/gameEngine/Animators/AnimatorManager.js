class AnimatorManager{
    _running = [];
    _suspended = [];

    register(anim){ // class Animator
        // if(this._suspended.find(anim) !== undefined) throw Error('Error while registering animation',anim);
        this._suspended.push(anim);
    }

    cancel(anim){
        let index = this._suspended.indexOf(anim);
        if(index > -1){
            this._suspended.splice(this._suspended.indexOf(anim),1);
        }else{
            throw Error('Error while canceling animation',anim);
        }
    }

    markAsRunning(anim){
        if(anim.hasFinished())throw Error(anim,'already running');
        let index = this._suspended.indexOf(anim);
        if(index > -1){
            this._suspended.splice(this._suspended.indexOf(anim),1);
        }else{
            throw Error('Error while marking animation as running',anim);
        }
        this._running.push(anim);
    }

    markAsSuspended(anim){
        if(!anim.hasFinished())throw Error(anim,'already suspended');
        let index = this._running.indexOf(anim);
        if(index > -1){
            this._running.splice(this._running.indexOf(anim),1);
        }else{
            throw Error('Error while marking animation as suspended',anim);
        }
        this._suspended.push(anim);
    }

    progress(currTime) {
        for (let an in this._running)
            this._running[an].progress(currTime);
    }

    timeShift(dt) {
        for (let an in this._running)
        this._running[an].timeShift(dt);
    }

}

const animatorManager = new AnimatorManager();
export default animatorManager;
