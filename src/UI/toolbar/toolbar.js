import bb from '../../utils/blackboard.js'

import focusedObject from '../../transitionHandlers/focusedObject.js'

import Engine from '../../Engine.js'

export default {name:'toolbar',link: './src/UI/toolbar/toolbar.ahtml',cb:onToolbarLoaded};

function actionsDropdown(){
    let isVisible = false;

    function getActions(){
        let actions = [];
        for(let action in bb.getComponent('actions').itemMap){
            actions.push(action);
        }
        return actions;
    }

    function createDropdown(){
        let actions = getActions();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_actions_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_actions').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        actions.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_action_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            ddItem.addEventListener('click',()=>bb.fastGet('actions',item)());
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }

    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_actions_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}

function objectsDropdown(){
    let isVisible = false;

    function getObjects(){
        let objects = [];
        const liveObjects = Engine.ObjectManager.objects;
        for(let object in liveObjects){
            objects.push(liveObjects[object]);
        }
        return objects;
    }

    function createDropdown(){
        let objects = getObjects();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_liveobjects_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_liveobjects').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        objects.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item.id;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item.name;
            ddItem.addEventListener('click',()=>focusedObject(item.id));
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }
  
    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_liveobjects_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}

function eventsDropdown(){
    let isVisible = false;

    function getEvents(){
        let events = [];
        let focused = bb.fastGet('state','focusedObject');
        if(!focused)return [];
        for(let event in focused.getEvents()){
            events.push(event);
        }
        return events;
    }

    function createDropdown(){
        let events = getEvents();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_events_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_events').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        events.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            ddItem.addEventListener('click',()=>bb.fastGet('state','focusedObject').triggerEvent(item));
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }
  
    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_events_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}

function uisDropdown(){
    let isVisible = false;

    function getUIs(){
        return bb.fastGet('UI','getUIs')();
    }

    function createDropdown(){
        let UIs = getUIs();
        let dropdown = document.createElement('div');
        dropdown.id = 'toolbar_uis_dropdown';
        dropdown.classList += 'toolbar_dropdown';
        dropdown.style.left = document.getElementById('toolbar_uis').offsetLeft + 'px'; 
        document.body.appendChild(dropdown);
        UIs.forEach((item)=>{
            let ddItem = document.createElement('div');
            ddItem.id = 'toolbar_object_'+item;
            ddItem.classList += 'toolbar_dropdown_item';
            ddItem.innerHTML = item;
            let itemIsVis = true;
            ddItem.addEventListener('click',()=>{
                bb.fastGet('UI',(itemIsVis)?'hideUI':'loadUI')(item);
                itemIsVis = !itemIsVis;
                // if(itemIsVis === 0){
                //     bb.fastGet('UI','hideUI')(item);
                //     itemIsVis = false;
                // }else {
                //     bb.fastGet('UI','loadUI')(item);
                //     itemIsVis = true;
                // }
            });
            dropdown.appendChild(ddItem);
        });
        bb.installWatch('state','focusedObject',closeDropdown);
    }
  
    function closeDropdown(){
        isVisible = false;
        let dropdown = document.getElementById('toolbar_uis_dropdown');
        if(dropdown)dropdown.remove();
    }

    function toggleDropdown(){
        isVisible = !isVisible;
        if(isVisible)createDropdown();
        else closeDropdown();
    }

    return toggleDropdown;
}

import setWindow from '../settingsWindow/settingsWindow.js'

function openSettings(){
    bb.fastGet('UI','installUI')({name:setWindow.name,link:setWindow.link,cb:setWindow.cb});
    bb.fastGet('UI','loadUI')(setWindow.name);
}

function onToolbarLoaded(){
    let dropdown = document.getElementById('toolbar_actions_dropdown_button');
    let toggle = actionsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_actions').addEventListener('click',toggle);

    dropdown = document.getElementById('toolbar_liveobjects_dropdown_button');
    toggle = objectsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_liveobjects').addEventListener('click',toggle);

    dropdown = document.getElementById('toolbar_events_dropdown_button');
    toggle = eventsDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_events').addEventListener('click',toggle);
    
    dropdown = document.getElementById('toolbar_uis_dropdown_button');
    toggle = uisDropdown();
    dropdown.addEventListener('click',toggle);
    document.getElementById('toolbar_uis').addEventListener('click',toggle);

    document.getElementById('toolbar_settings').addEventListener('click',openSettings);

}