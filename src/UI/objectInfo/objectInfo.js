import bb from '../../utils/blackboard.js'

import transition from '../../transitionHandlers/focusedObject.js'
import Engine from '../../Engine.js';

export default {name:'objectInfo',link: './src/UI/objectInfo/objectInfo.ahtml',cb:onObjectInfoLoaded};

function updateInfo(obj){
    if(!document.getElementById('mainInfoBox'))return;
    if(obj === undefined || bb.fastGet('state','mode') !== 'editing'){
        document.getElementById('mainInfoBox').style.display = "none";
        bb.installWatch('state','focusedObject',updateInfo);
        return;
    }
    document.getElementById('mainInfoBox').style.display = "block";
    document.getElementById('objName').innerHTML = obj.name;
    document.getElementById('categName').innerHTML = "("+obj.getCategory()+")";

    let statesInfo = document.getElementById('statesInfo');
    statesInfo.innerHTML = "";
    let statesTitle = document.getElementById('InfoBox_currentState');
    statesTitle.innerHTML = '(Current State: '+obj.getCurrentState()+')';
    for(let i in obj.getStates()){
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = i;
        statesInfo.appendChild(item);
    }

    document.getElementById('addStateButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addStateText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addState(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue;
        item.classList += "InfoBox_item";
        statesInfo.appendChild(item);
        document.getElementById('addStateText').value = "";
        transition(undefined);
        transition(focusedObj.getName());
    });

    let fieldsInfo = document.getElementById('fieldsInfo');
    fieldsInfo.innerHTML = "";
    for(let i in obj.getValues()){
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = i + " = " + obj.getValue(i);
        fieldsInfo.appendChild(item);
    }

    document.getElementById('addFieldButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addFieldText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addValue(textValue);
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = textValue + " = " + focusedObj.getValue(textValue);
        fieldsInfo.appendChild(item);
        document.getElementById('addFieldText').value = "";
    });

    let eventsInfo = document.getElementById('eventsInfo');
    eventsInfo.innerHTML = "";
    for(let i in obj.getEvents()){
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = i;
        eventsInfo.appendChild(item);
    }

    document.getElementById('addEventButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addEventText').value;
        if(textValue === "")return;
        let focusedObj = Engine.ObjectManager.getObject(bb.fastGet('state','focusedObject'));
        focusedObj.addEvent(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue;
        item.classList += "InfoBox_item";
        eventsInfo.appendChild(item);
        document.getElementById('addEventText').value = "";
        transition(undefined);
        transition(focusedObj.getName());
    });

    let attributeInfo = document.getElementById('attributeInfo');
    attributeInfo.innerHTML = "";
    for(let i in obj.getOptions()){
        let item = document.createElement('div');
        item.innerHTML = i + " = " + obj.getOption(i);
        item.classList += "InfoBox_item";
        attributeInfo.appendChild(item);
    }

    document.getElementById('addAttributeButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addAttributeText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addOption(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue + " = " + focusedObj.getOption(textValue);
        item.classList += "InfoBox_item";
        attributeInfo.appendChild(item);
        document.getElementById('addAttributeText').value = "";
    });

    bb.installWatch('state','focusedObject',updateInfo);
}

function onObjectInfoLoaded(){
    let focObj = bb.fastGet('state','focusedObject');
    updateInfo((focObj)?focObj:undefined);
}
