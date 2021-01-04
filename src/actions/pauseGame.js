import bb from '../utils/blackboard.js'

let timePaused = undefined;

function pauseGame(){
    if(timePaused) throw Error('Pause while paused');
    timePaused = bb.fastGet('state','gameTime');
    bb.fastGet('state','game').pause();
}

bb.fastInstall('actions','pauseGame',pauseGame);

function resumeGame(){
    if(!timePaused) throw Error('Resume without pause');
    bb.invoke('animation','timeShift',bb.fastGet('state','gameTime') - timePaused);
    bb.fastGet('state','game').unpause();
    timePaused = undefined;
}

bb.fastInstall('actions','resumeGame',resumeGame);