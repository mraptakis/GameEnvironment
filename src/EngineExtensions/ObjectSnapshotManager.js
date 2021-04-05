import bb from '../utils/blackboard.js'
import utils from '../utils/utils.js'

import Manager from '../Engine/Manager.js'

export default class ObjectSnapshotManager extends Manager{
    _collection;

    constructor(){
        super();
        this._collection = {};
    }

    snapshotObject(item){
        item = item || bb.fastGet('state','focusedObject');
        let objCollection = this._collection[item.id];
        if(!objCollection){
            this._collection[item.id] = [];
        }
        this._collection[item.id].push(JSON.parse(item.toString()));
    }
    
    getSnapshots(item){
        return this._collection[item.id];
    }
    
    getAllSnapshots(){
        return this._collection;
    }

    resetObjectToSnapshot(objID,snapID){
        utils.resetObject(this._collection[objID][snapID]);
    }

}

