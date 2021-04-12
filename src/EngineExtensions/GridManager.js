import Engine from '../Engine.js'

import bb from '../utils/blackboard.js'

import Manager from '../Engine/Manager.js'

export default class GridManager extends Manager{
    _gridRectangles;

    constructor(){
        super();
        this._gridRectangles = [];
    }

    onLoad(){
        this.calculateGrid();
        bb.installWatch('events', 'last', (e)=>this.onEvent(e));
    }

    calculateGrid(){
        let objs = Engine.ObjectManager.objects;

        this._gridRectangles = [];
        for(let i in objs){
            let obj = objs[i];
            if(obj.getOption('isSolid') === true){ // === true on purpose to prevent auto conversions
                this._gridRectangles.push(obj.getPositional());
            }
        }
    }

    getGrid(){
        return [...this._gridRectangles];
    }

    objectsOnPlatform(platFormObj){
        const objManager = Engine.ObjectManager;
        let objs = objManager.objects;

        
        let isAttached = [];
        
        for(let i in objs){
            let obj = objs[i];
            if(objManager.isSystemObject(obj.id) || obj === platFormObj)
            continue;
            
            const pos1 = platFormObj.getPositional();
            const pos2 = obj.getPositional();
            if(pos1.x >= pos2.x + pos2.width || pos2.x >= pos1.x + pos1.width){
                continue;
            }
        
            if(pos1.y > pos2.y + pos2.height || pos2.y > pos1.y + (pos1.height/4)){
                continue;
            }
        
            isAttached.push(obj);
        }

        return isAttached;
    }

    isPointInGrid(x,y){
        for(let i in this._gridRectangles){
            let rect = this._gridRectangles[i];
            if(rect.x < x 
            && rect.x + rect.width > x
            && rect.y < y
            && rect.y + rect.height > y)
                return true;
        }
        return false;
    }

    canMove(objID,action){
        if(action.type === 'x'){
            let obj = Engine.ObjectManager.objects[objID];
            let boundingBox = obj.getPositional();
            if(action.oldVal > action.value){
                let h = boundingBox.y + boundingBox.height;
                let w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.y; i < h; ++i){
                    if(this.isPointInGrid(boundingBox.x+2,i)){
                        obj.setValue('x',action.oldVal);
                        return;
                    }
                }
            }else{
                let h = boundingBox.y + boundingBox.height;
                let w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.y; i < h; ++i){
                    if(this.isPointInGrid(w-2,i)){
                        obj.setValue('x',action.oldVal);
                        return;
                    }
                }
            }
        }else if(action.type === 'y'){
            let obj = Engine.ObjectManager.objects[objID];
            let boundingBox = obj.getPositional();
            if(action.oldVal > action.value){
                let w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.x; i < w; ++i){
                    if(this.isPointInGrid(i,boundingBox.y)){
                        obj.setValue('y',action.oldVal);
                        return;
                    }
                }
            }else{
                let h = boundingBox.y + boundingBox.height;
                let w = boundingBox.x + boundingBox.width;
                for(let i = boundingBox.x; i < w; ++i){
                    if(this.isPointInGrid(i,h)){
                        obj.setValue('y',action.oldVal);
                        return;
                    }
                }
            }
        }
    }

    /*
    *   e: {
    *       type: string,
    *       objectID: string
    *       information: {
    *           oldVal: all
    *           type: string,
    *           value: all
    *       }   
    *   }
    */
    onEvent(e){
       if(!Engine.ObjectManager.isSystemObject(e.objectID)){
           if(e.type === 'setValue'){
                this.canMove(e.objectID,e.information);
                let obj = Engine.ObjectManager.getObject(e.objectID);
                if(obj && obj.getOption('isPlatform')){
                    if(e.information.type === 'x'){
                        let diff = e.information.value - e.information.oldVal;
                        this.objectsOnPlatform(obj).forEach((objOnP)=>{
                            objOnP.move(diff,0);
                        })
                    } else if(e.information.type === 'y'){
                        let diff = e.information.value - e.information.oldVal;
                        this.objectsOnPlatform(obj).forEach((objOnP)=>{
                            objOnP.move(0,diff);
                        })
                    }
                }
            }
        }

        bb.installWatch('events','last',(e)=>{this.onEvent(e);});

    }
}