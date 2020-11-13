import bb from '../../utils/blackboard.js'

export default {name:'hud',link: './src/UI/hud/hud.ahtml',cb:onHudLoaded};

function hudState(){
    let isVisible = (bb.fastGet('state','mode') === "editing")?true:false;
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

// function codeAnalysis(srcCode){
//     const reg = /(AK\.)([^\(]+)\(([^\,\)]*)\)/gim;
//     let matches = ((srcCode || '').match(reg) || []);
//     let res = [];

//     matches.forEach((match)=>{
//         let test = match;
//         res.push(match);
//         while((test = test.replace(reg,'$3'))){
//             let m = (test || '').match(reg) || [];
//             console.log(m);
//             if(m.length === 0)return;
//             m.forEach(mat=>res.push(mat));
//         }
//     })
//     console.log(res);
// }


function onHudLoaded(){
    document.getElementById('hudToggle').addEventListener('click',hudState());


    let tabOpen = "onClick";
    document.getElementById('playScriptButton').addEventListener('click',()=>{
        let code = bb.fastGet('scripting','currentScriptAsCode')();
        bb.fastGet('scripting','executeCode')(code);
    });

    document.getElementById('saveScriptButton').addEventListener('click',()=>{
        let text = bb.fastGet('scripting','currentScriptAsText')();
        bb.fastGet('liveObjects',bb.fastGet('state','focusedObject')).setEvent(tabOpen,text);
    });

    function tabInfo(obj,id){
        return ()=>{
            let text = bb.fastGet('liveObjects',obj).getEvent(id);
            bb.fastGet('scripting','clearAndLoadFromText')(text);
            // codeAnalysis(bb.fastGet('scripting','currentScriptAsCode')());
            tabOpen = id;
            document.getElementById('openTab').innerHTML = tabOpen;
        };
    }

    let logAllActions = "";

    let consoleArea = document.getElementById('consoleArea');
    function onActionChange(newMessage){
        consoleArea.value += '\n'+newMessage;
        consoleArea.scrollTop = consoleArea.scrollHeight;
        logAllActions += newMessage+'\n';
        bb.installWatch('state','lastAction',onActionChange);
    }

    bb.installWatch('state','lastAction',onActionChange);

    function onFocusChange(objName){
        let eventsTab = document.getElementById('eventsTab');
        eventsTab.innerHTML = "";
        if(objName === undefined){
            document.getElementById('openTab').innerHTML = "";
            bb.fastGet('scripting','clearAndLoadFromText')("");
            bb.installWatch('state','focusedObject',onFocusChange);
            return;
        }
        tabOpen = "onClick";
        let firstObject = true;
        for(let i in bb.fastGet('liveObjects',objName).getEvents()){
            let elem = document.createElement('div');
            elem.classList = "eventTab";
            elem.innerHTML = i;
            elem.addEventListener('click',tabInfo(objName,i));
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

    bb.fastGet('scripting','injectInDiv')(document.getElementById('languageDiv'));

}