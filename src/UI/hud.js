import bb from '../utils/blackboard.js'

let hudcss = document.createElement('link');
hudcss.setAttribute('rel','stylesheet');
hudcss.setAttribute('href','./src/UI/hud.css');
document.body.appendChild(hudcss);


let inp = document.createElement("input");
inp.id = "inputss";
document.body.appendChild(inp);

let blocklyDiv = document.createElement('div');
blocklyDiv.id = 'blocklyDiv';
blocklyDiv.style.position = "absolute";
blocklyDiv.style.height = "500px";
blocklyDiv.style.width = "500px";
blocklyDiv.style.top = "50px";
document.body.appendChild(blocklyDiv);

let workspace = Blockly.inject('blocklyDiv',
{toolbox: document.getElementById('toolbox'),scrollbars: true});

Blockly.JavaScript.addReservedWords('code');

let focused = document.createElement("div");
focused.id = "focusedObjText";
document.body.appendChild(focused);

let objMenuButton = document.createElement("div");
objMenuButton.id = "objMenuButton";
document.body.appendChild(objMenuButton);



objMenuButton.addEventListener('click',()=>{
    if(document.getElementById('objMenu'))document.getElementById('objMenu').remove();
    let objMenu = document.createElement("div");
    objMenu.id = "objMenu";
    document.body.appendChild(objMenu);

    let focusedObj = bb.fastGet('state','focusedObject');
    if(!focusedObj)return;
    let options = bb.fastGet('liveObjects',focusedObj).getOptions();
    options.map(opt=>{
        let i = document.createElement('div');
        i.className = "objMenuButton";
        i.innerHTML = opt;
        i.addEventListener('click',()=>{
            bb.fastGet('actions',opt)(focusedObj);
        })
        objMenu.appendChild(i);
    })
    console.log(options);
});