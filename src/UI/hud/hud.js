import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

export default {
    name:'hud',
    link: './src/UI/hud/hud.ahtml',
    cb:onHudLoaded, 
    removable: false, 
    loadOnInstall: true
};

function hudState(){
    let isVisible = (bb.fastGet('state','mode') === "editing");
    toggleVisibility();
    toggleVisibility();
    function toggleVisibility(){
        isVisible = !isVisible;
        bb.fastSet('state','mode',(isVisible)?"editing":"play");
        let hudChildren = document.querySelectorAll('.hudChild');
        hudChildren.forEach(element => {
            element.style.visibility = (isVisible)?"visible":"hidden";
            element.style.opacity = (isVisible)?"0.9":"0";
        });
    }
    return toggleVisibility;
}

function showHideCodeUI(show = 'block'){
    document.getElementById('codingArea').style.display = show;
}

function dragElement(elmnt,ev) {
    if(!bb.fastGet('settings','moveUIWithControl'))return;
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    dragMouseDown();
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
  
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
      elmnt.style.top  = (elmnt.offsetTop - pos2) + 'px';
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
}

function onHudLoaded(){
    document.getElementById('hudToggle').addEventListener('click',hudState());

    const ScriptManager = Engine.ScriptingManager;

    let codes;


    let tabOpen = "onClick";
    document.getElementById('playScriptButton').addEventListener('click',()=>{
        let code = ScriptManager.currentScriptAsCode();
        let currObj = bb.fastGet('state','focusedObject');
        ScriptManager.executeCode({text: code, code: code},currObj.id);
    });
    
    document.getElementById('showScriptButton').addEventListener('click',()=>{
        let code = codes.stripped[tabOpen].get();
        if(ScriptManager.getCurrentEditorID() === 'pureJS'){
            ScriptManager.setNewEditor('blockly');
        }else{
            ScriptManager.setNewEditor('pureJS');
        }
        ScriptManager.clearAndLoadFromText(code);
    });

    document.getElementById('saveScriptButton').addEventListener('click',()=>{
        let text = ScriptManager.currentScriptAsText();
        let code = ScriptManager.currentScriptAsCode();
        codes.stripped[tabOpen].set({text:text,code:code});
    });

    function tabInfo(id,cb){
        return ()=>{
            let codes = cb();
            ScriptManager.clearAndLoadFromText(codes);
            tabOpen = id;
            document.getElementById('openTab').innerHTML = tabOpen;
        };
    }

    // let consoleArea = document.getElementById('consoleArea');
    // function onActionChange(newMessage){
    //     consoleArea.value += '\n'+newMessage;
    //     consoleArea.scrollTop = consoleArea.scrollHeight;
    //     // logAllActions += newMessage+'\n';
    //     bb.installWatch('state','lastAction',onActionChange);
    // }

    // bb.installWatch('state','lastAction',onActionChange);
    function onFocusChange(obj){
        let eventsTab = document.getElementById('eventsTab');
        let infoBar = document.getElementById('infoBar');
        showHideCodeUI('block');
        eventsTab.innerHTML = "";
        infoBar.innerHTML = "";
        if(obj === undefined){
            showHideCodeUI('none');
            document.getElementById('openTab').innerHTML = "";
            ScriptManager.clearAndLoadFromText({text: '',code: ''});
            bb.installWatch('state','focusedObject',onFocusChange);
            return;
        }
        let firstObject = true;

        infoBar.innerHTML = 'Scripts for Object ('+obj.name+')';

        codes = obj.getCodes();
        codes.stripped = {};

        let events  = codes.events;
        let states  = codes.states;
        let values  = codes.values;
        let options = codes.options;
        let collisi = codes.collisions;
        
        let eventSplit = document.createElement('div');
        eventSplit.classList = 'tabSplitter';
        eventSplit.innerHTML = 'Events';
        eventsTab.appendChild(eventSplit);

        for(let i in events){
            codes.stripped[i] = events[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,events[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        let stateSplit = document.createElement('div');
        stateSplit.classList = 'tabSplitter';
        stateSplit.innerHTML = 'States';
        eventsTab.appendChild(stateSplit);

        for(let i in states){
            stateSplit = document.createElement('div');
            stateSplit.classList = 'tabSplitter';
            stateSplit.innerHTML = i;
            stateSplit.style.marginLeft = '10%';
            eventsTab.appendChild(stateSplit);
            for(let st in states[i]){
                codes.stripped[st] = states[i][st];
                let elem = document.createElement('div');
                elem.classList = "eventTab";
                elem.innerHTML = st;
                elem.style.marginLeft = '20%';
                elem.addEventListener('click',tabInfo(st,states[i][st].get));
                eventsTab.appendChild(elem);
                if(firstObject){
                    elem.click();
                    firstObject = false;
                }
            }
        }

        let valueSplit = document.createElement('div');
        valueSplit.classList = 'tabSplitter';
        valueSplit.innerHTML = 'Attributes';
        eventsTab.appendChild(valueSplit);

        for(let i in values){
            codes.stripped[i] = values[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,values[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        let optionSplit = document.createElement('div');
        optionSplit.classList = 'tabSplitter';
        optionSplit.innerHTML = 'Flags';
        eventsTab.appendChild(optionSplit);

        for(let i in options){
            codes.stripped[i] = options[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,options[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        let collSplit = document.createElement('div');
        collSplit.classList = 'tabSplitter';
        collSplit.innerHTML = 'Collisions';
        eventsTab.appendChild(collSplit);

        for(let i in collisi){
            codes.stripped[i] = collisi[i];
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.style.marginLeft = '10%';
            elem.addEventListener('click',tabInfo(i,collisi[i].get));
            eventsTab.appendChild(elem);
            if(firstObject){
                elem.click();
                firstObject = false;
            }
        }

        bb.installWatch('state','focusedObject',onFocusChange);
    }

    bb.installWatch('state','focusedObject',onFocusChange);

    let fpsCounter = document.getElementById('fpsCounter');

    function onFPSChange(newFPS){
        fpsCounter.innerHTML = "FPS:"+newFPS;
        bb.installWatch('state','FPS',onFPSChange);
    }

    bb.installWatch('state','FPS',onFPSChange);

    ScriptManager.injectInDiv(document.getElementById('languageDiv'));
    setTimeout(()=>{
        showHideCodeUI('none');
        const codingArea = document.getElementById('codingArea');
        codingArea.onmousedown = (ev)=>{
            if(!ev.ctrlKey) return;
            dragElement(codingArea);
        }
        
        const mainInfoBox = document.getElementById('mainInfoBox');
        mainInfoBox.onmousedown = (ev)=>{
            if(!ev.ctrlKey) return;
            dragElement(mainInfoBox);
        }
    },200);
}