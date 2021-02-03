import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    // Do not refresh things if the current focused object is the the new target object 
    let currObj = bb.fastGet('state', 'focsuedObject');
    if(currObj && currObj.name === toObj)return;

    let obj;
    if(toObj){
        obj = bb.fastGet('Engine','ObjectManager').getObject(toObj);
    }else{
        toObj = "Stage";
        obj =bb.fastGet('Engine','ObjectManager').getObjectByName(toObj)
    }
    bb.fastSet('state','focusedObject',obj);
}
