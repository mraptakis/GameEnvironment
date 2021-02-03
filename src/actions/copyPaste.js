import bb from '../utils/blackboard.js'

import utils from '../utils/utils.js'

let clipboard;

function copy(){
    let obj = bb.fastGet('state','focusedObject');
    if(!obj)return;
    console.log(obj);
    clipboard = obj;
}

function paste(){
    if(typeof clipboard === 'object')
    console.log(clipboard);
    
    let newObj = JSON.parse(clipboard+'');
    delete newObj._id;
    newObj._name = newObj._name+'_copy';
    console.log(newObj);
    utils.createObject(newObj);


}

bb.fastInstall('actions','Copy',copy)
bb.fastInstall('actions','Paste',paste)