import bb from '../utils/blackboard.js'

function moveFWD(step = 3){
    bb.fastGet('state','player').move(0,-step);
}

bb.fastSet('actions','moveForward',moveFWD);