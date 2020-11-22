import bb from '../utils/blackboard.js'

import Object from '../objects/Object.js'
import Value from '../objects/Value.js'
import Event from '../objects/Event.js'
import log from '../utils/logs.js'
import collisionManager from '../collisions/collisionManager.js'

class CollisionsObject extends Object {

    renderer = 'None';
    name = 'Collisions';

    constructor(){
        super('Collisions');

        // this.values['x'] = new Value({
        //     tag: "positional",
        //     value: 0,
        //     onChange: (value) => {log.logError(`Can't change x value of ${this.name}`);}
        // });

        // this.values['y'] = new Value({
        //     tag: "positional",
        //     value: 0,
        //     onChange: (value) => {log.logError(`Can't change y value of ${this.name}`);}
        // });

        // this.values['width'] = new Value({
        //     tag: "positional",
        //     value: 0,
        //     onChange: (value) => {log.logError(`Can't change width value of ${this.name}`);}
        // });

        // this.values['height'] = new Value({
        //     tag: "positional",
        //     value: 0,
        //     onChange: (value) => {log.logError(`Can't change height value of ${this.name}`);}
        // });
        

        delete this.options['isMovable'];
        delete this.options['isRemovable'];
        delete this.options['isVisible'];
        delete this.options['isSolid'];
        delete this.options['isCollidable'];

        delete this.events['onCollision'];
        delete this.events['onRemove'];
        delete this.events['onMove'];
        delete this.events['onGameStart'];
        delete this.events['onEachFrame'];

        delete this.events['onClick'];
        delete this.events['onRightClick'];

    }

    move(x,y){
        if(!this.options['isMovable'])return;

    }    
    
    getEvent(ev){
        let split = ev.split('_');
        return bb.fastGet('collisions', 'getCollision')(split[0],split[1]);
    }

    setEvent(ev,code){
        localStorage.setItem(this.name+"_"+ev,code);
        let split = ev.split('_');
        bb.fastGet('collisions', 'setCollision')(split[0],split[1],code);
    }
    
    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    remove(){
        this.clear();
        bb.fastRemove('liveObjects',this.name);
    }

    getCategory(){
        return 'Collisions';
    }

}

const collisionsObject = new CollisionsObject();

bb.fastSet('liveObjects','Collisions',collisionsObject);

export default collisionsObject;