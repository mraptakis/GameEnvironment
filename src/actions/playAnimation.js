import bb from '../utils/blackboard.js'

const animationManager = bb.fastGet('gameEngine','animationManager');
const FRAnimator = bb.fastGet('gameEngine','FrameRangeAnimator');

function playAnimation({object,anim,onStart,onFinish}){

    let obj = (object)?object:bb.fastGet('state','player');
    let animator = new FRAnimator();
    let animation = animationManager.getAnimation(anim);

    let oldFilm;

    console.log(onStart,onFinish);

    animator.onStart = ()=>{
        if(onStart)onStart();
        obj.setAnimator(animator);
        oldFilm = obj.getFilm();
        obj.setFilm(animation.film.id);
    }
    animator.onAction = (th)=>{
        obj.setFrame(th.currentFrame);
        obj.move(th.animation.dx,th.animation.dy);
    };
    animator.onFinish = ()=>{
        obj.setFrame(0);
        obj.setFilm(oldFilm);
        if(onFinish)onFinish();
    }

    animator.start({
        animation: animation.animation,
        timestamp: new Date().getTime(),
    })
}

bb.fastInstall('actions','playAnimation',playAnimation);