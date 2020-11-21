import bb from '../utils/blackboard.js'

export default function focusedObjectTransition(toObj){
    // Do not refresh things if the current focused object is the the new target object 
    if(document.getElementById('focusedObjText').innerText === toObj)return;
    toObj = (toObj)?toObj:"Stage";
    document.getElementById("focusedObjText").innerText = toObj;
    bb.fastSet('state','focusedObject',toObj);
}
