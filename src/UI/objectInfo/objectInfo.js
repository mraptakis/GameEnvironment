import bb from '../../utils/blackboard.js'

import transition from '../../transitionHandlers/focusedObject.js'
import Engine from '../../Engine.js';

export default {name:'objectInfo',link: './src/UI/objectInfo/objectInfo.ahtml',cb:onObjectInfoLoaded};

function updateInfoNew(obj){
    if(!document.getElementById('mainInfoBox'))return;
    if(obj === undefined || bb.fastGet('state','mode') !== 'editing'){
        document.getElementById('mainInfoBox').style.display = "none";
        bb.installWatch('state','focusedObject',updateInfoNew);
        return;
    }
    document.getElementById('mainInfoBox').style.display = "block";
    document.getElementById('mainInfoBox-head-name').innerHTML = 'Name: '+obj.name;
    document.getElementById('mainInfoBox-head-categ').innerHTML = 'Category: '+obj.getCategory();

    let statesInfo = document.getElementById('mainInfoBox-body-states-main');
    let addStateBut = document.getElementById('mainInfoBox-body-states-add');
    addStateBut.onclick = ()=>{
        console.log('a');
    }
    statesInfo.innerHTML = "";
    let states = obj.getStates();
    for(let i in states){
        let item = document.createElement('div');
        item.classList += "mainInfoBox-body-states-main-wrap";
        
        let text = document.createElement('div');
        text.classList = 'mainInfoBox-shard-main-text';
        text.innerHTML = i;
        text.insertAdjacentHTML('beforeend', '<svg class="mainInfoBox-shard-main-remove" height="448pt" viewBox="-69 0 448 448.00446" width="448pt" xmlns="http://www.w3.org/2000/svg"><path d="m283.429688 45.714844h-73.140626v-18.285156c0-15.125-12.304687-27.429688-27.429687-27.429688h-54.855469c-15.125 0-27.429687 12.304688-27.429687 27.429688v18.285156h-73.144531c-15.125 0-27.42578175 12.304687-27.42578175 27.429687v45.710938h18.28515575v301.71875c0 15.125 12.300782 27.429687 27.425782 27.429687h219.429687c15.125 0 27.429688-12.304687 27.429688-27.429687v-301.71875h18.285156v-45.710938c0-15.125-12.304687-27.429687-27.429687-27.429687zm-164.570313-18.285156c0-5.042969 4.097656-9.144532 9.144531-9.144532h54.855469c5.046875 0 9.144531 4.101563 9.144531 9.144532v18.285156h-73.144531zm155.429687 393.144531c0 5.046875-4.097656 9.144531-9.144531 9.144531h-219.429687c-5.042969 0-9.140625-4.097656-9.140625-9.144531v-301.71875h237.714843zm18.285157-320.003907h-274.285157v-27.425781c0-5.042969 4.097657-9.144531 9.140626-9.144531h256c5.046874 0 9.144531 4.101562 9.144531 9.144531zm0 0"/><path d="m210.289062 384.003906c5.054688 0 9.140626-4.089844 9.140626-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140626-9.144532-5.054687 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.144531 9.140625zm0 0"/><path d="m155.429688 384.003906c5.054687 0 9.144531-4.089844 9.144531-9.140625v-201.148437c0-5.050782-4.089844-9.144532-9.144531-9.144532-5.050782 0-9.140626 4.09375-9.140626 9.144532v201.148437c0 5.050781 4.089844 9.140625 9.140626 9.140625zm0 0"/><path d="m100.574219 384.003906c5.054687 0 9.140625-4.089844 9.140625-9.140625v-201.148437c0-5.050782-4.085938-9.144532-9.140625-9.144532-5.054688 0-9.144531 4.09375-9.144531 9.144532v201.148437c0 5.050781 4.089843 9.140625 9.144531 9.140625zm0 0"/></svg>');
        text.insertAdjacentHTML('beforeend', '<svg class="mainInfoBox-shard-main-edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.873 477.873" style="enable-background:new 0 0 477.873 477.873;" xml:space="preserve"><g><g><path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/></g></g><g><g><path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955C443.754,73.631,440.467,81.575,434.603,87.419z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>');

        item.appendChild(text);

        statesInfo.appendChild(item);
    }


    
    bb.installWatch('state','focusedObject',updateInfoNew);
}

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
        transition(focusedObj.id);
    });

    let attributesInfo = document.getElementById('attributeInfo');
    attributesInfo.innerHTML = "";
    for(let i in obj.getValues()){
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        let inp = document.createElement('input');
        inp.type = 'Text';
        inp.style.width = '40%';
        inp.value = obj.getValue(i);
        inp.onchange = (ev)=>{
            if(isNaN(inp.value))
                obj.setValue(i,inp.value);
            else
                obj.setValue(i,Number.parseFloat(inp.value));
        }
        item.innerHTML = i + " = ";
        item.appendChild(inp);
        attributesInfo.appendChild(item);
    }

    document.getElementById('addAttributeButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addAttributeText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addValue(textValue);
        let item = document.createElement('div');
        item.classList += "InfoBox_item";
        item.innerHTML = textValue + " = " + focusedObj.getValue(textValue);
        attributesInfo.appendChild(item);
        document.getElementById('addAttributeText').value = "";
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
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addEvent(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue;
        item.classList += "InfoBox_item";
        eventsInfo.appendChild(item);
        document.getElementById('addEventText').value = "";
        transition(undefined);
        transition(focusedObj.id);
    });

    let flagsInfo = document.getElementById('flagsInfo');
    flagsInfo.innerHTML = "";
    for(let i in obj.getOptions()){
        let item = document.createElement('div');
        let opt = document.createElement('select');
        let trueOpt = document.createElement('option');
        trueOpt.value = 'true';
        trueOpt.text = 'true';
        let falseOpt = document.createElement('option');
        falseOpt.value = 'false';
        falseOpt.text = 'false';

        if(obj.getOption(i)){
            trueOpt.selected = 'selected';
        }else{
            falseOpt.selected = 'selected';
        }

        opt.appendChild(trueOpt);
        opt.appendChild(falseOpt);

        opt.onchange = (ev) => {
            if(ev.target.value === 'true'){
                obj.setOption(i,true);
            }else{
                obj.setOption(i,false);
            }
        }

        item.innerHTML = i + " = ";
        item.appendChild(opt);
        item.classList += "InfoBox_item";
        flagsInfo.appendChild(item);
    }

    document.getElementById('addFlagButton').addEventListener('click',()=>{
        let textValue = document.getElementById('addFlagText').value;
        if(textValue === "")return;
        let focusedObj = bb.fastGet('state','focusedObject');
        focusedObj.addOption(textValue);
        let item = document.createElement('div');
        item.innerHTML = textValue + " = " + focusedObj.getOption(textValue);
        item.classList += "InfoBox_item";
        flagsInfo.appendChild(item);
        document.getElementById('addFlagText').value = "";
    });

    bb.installWatch('state','focusedObject',updateInfo);
}

function onObjectInfoLoaded(){
    let focObj = bb.fastGet('state','focusedObject');
    updateInfoNew((focObj)?focObj:undefined);
}
