import bb from '../utils/blackboard.js'

function moveRight(step = 3){
    bb.fastGet('state','player').move(step,0);
}

bb.fastSet('actions','moveRight',moveRight);