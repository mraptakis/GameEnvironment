import bb from '../utils/blackboard.js'

import collisionManager from './collisionManager.js'

const collisionObject = bb.fastGet('liveObjects', 'Collisions')

collisionManager.setCodeExecutioner(bb.fastGet('scripting','executeText'));

bb.fastInstall('collisions', 'installCollision', (obj1, obj2,codeAsText) => {
    if(collisionManager.installCollision(obj1, obj2, codeAsText)){
        collisionObject.addEvent(`${obj1}_${obj2}`);
    };
});
bb.fastInstall('collisions', 'removeCollision', (obj1, obj2) => {return collisionManager.removeCollision(obj1, obj2)});
bb.fastInstall('collisions', 'checkAndInvoke', (arrOfObj) => collisionManager.checkAndInvoke(arrOfObj));
bb.fastInstall('collisions', 'getAllCollisions', () => {return collisionManager.getAllCollisions()});
bb.fastInstall('collisions', 'getCollisions', (obj) => {return collisionManager.getCollisions(obj)});
bb.fastInstall('collisions', 'getCollision', (obj1, obj2) => {return collisionManager.getCollision(obj1, obj2)});
bb.fastInstall('collisions', 'setCollision', (obj1, obj2,codeAsText) => {return collisionManager.setCollision(obj1, obj2, codeAsText)});

