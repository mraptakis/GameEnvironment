import bb from '../../utils/blackboard.js'

import AK from '../../utils/API.js'
import logManager from '../../utils/logs.js'

let inputArea = document.createElement('textarea');
inputArea.style.width = "100%";
inputArea.style.height = "100%";
inputArea.style.resize = "none";
inputArea.spellcheck = "false";

bb.fastInstall('scripting','currentScriptAsText',()=>{
    return inputArea.value;
});

bb.fastInstall('scripting','currentScriptAsCode',()=>{
    return inputArea.value;
});

bb.fastInstall('scripting','clear',()=>{
    inputArea.value = "";
});

bb.fastInstall('scripting','fromTextToCode',(text) => {
    return text;
});

let currObject;
bb.fastInstall('scripting','executeText',(codes,currentObject) => {
    if(!codes || !codes.text)
        return;
    let prevObject = currObject;
    currObject = currentObject;
    try{
        eval(codes.code);
    }catch(e){
        logManager.logError(e);
        console.log(e);
    }
    currObject = prevObject;
    // eval(text);
});

bb.fastInstall('scripting','executeCode',(codes,currentObject) => {
    if(!codes || !codes.code)
        return;
    let prevObject = currObject;
    currObject = currentObject;
    try{
        eval(codes.code);
    }catch(e){
        logManager.logError(e);
        console.log(e);
    }
    currObject = prevObject;
    // eval(text);
});

bb.fastInstall('scripting','clearAndLoadFromText',(codes)=>{
    if(!codes || !codes.code)
        inputArea.value = '';
    inputArea.value = codes.code;
});

bb.fastInstall('scripting','injectInDiv',(div)=>{
    div.style.height = "500px";
    div.style.width = "500px";
    
    div.appendChild(inputArea);
});