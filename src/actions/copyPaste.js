import bb from '../utils/blackboard.js'

import utils from '../utils/utils.js'

class ClipboardManager {
    _clipboard;
    _collection;

    constructor(){
        this._collection = [];
    }

    push(item){
        this._clipboard = item;
        this._collection.push(item);
    }

    top(){
        return this._clipboard;
    }

    getCollection(){
        return this._collection;
    }

}

let clipboardManager = new ClipboardManager();

function copy(){
    let obj = bb.fastGet('state','focusedObject');
    if(!obj)return;
    console.log(obj);
    let newObj = JSON.parse(obj+'');
    delete newObj._id;
    clipboardManager.push(newObj);
    console.log(clipboardManager.getCollection());
}

function paste(){
    let obj = clipboardManager.top();
    obj._name = obj._name+'_'+Math.floor(Math.random() * 1000);
    utils.createObject(obj);


}

bb.fastInstall('actions','Copy',copy)
bb.fastInstall('actions','Paste',paste)