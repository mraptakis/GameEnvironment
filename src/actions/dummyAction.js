import bb from '../utils/blackboard.js'

import logManager from '../utils/logs.js'

// function copy(){
//     let obj = bb.fastGet('liveObjects',bb.fastGet('state','focusedObject'));
//     let pos = obj.getPosition();
//     let name = obj.getName();
//     name += "_copy";
//     let catO = bb.fastGet("objects",obj.getCategory());
//     if(typeof catO !== "function"){console.log("There is no category "+category);return;}
//     if(!bb.fastGet('liveObjects',name)){
//         let it = new catO({name});
//         bb.fastSet('liveObjects',name,it);
//         it.setPosition(pos.x,pos.y);
//         it.add();
//         logManager.logAction("Created Object ["+name+"]");
//     }

// }

function dummyAction(){
    const FRAnimator = bb.fastGet('gameEngine','FrameRangeAnimator');
    const FRAnimation = bb.fastGet('gameEngine','FrameRangeAnimation');
    const animationFilmHolder = bb.fastGet('gameEngine','animationFilmHolder');
    let player = bb.fastGet('state','player');

    let animator = new FRAnimator();
    let animation = new FRAnimation({
        start: 0,
        end: animationFilmHolder.getFilm(player.getFilm()).totalFrames-1,
        id: player.getFilm(),
        reps: 10,
        dx: 26,
        dy: 0,
        delay: 90
    });

    animator.onStart = ()=>console.log('ANIMATION STARTED');
    animator.onAction = (th)=>{
        console.log('ANIMATION RUNNING');
        player.setFrame(th.currentFrame);
        player.move(th.animation.dx,th.animation.dy);
    };
    animator.onFinish = ()=>{
        console.log('ANIMATION FINISHED');
    }

    animator.start({
        animation: animation,
        timestamp: new Date().getTime(),
    })

}

bb.fastSet('actions','dummyAction',dummyAction)