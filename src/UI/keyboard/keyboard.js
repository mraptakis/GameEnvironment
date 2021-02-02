import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'

export default {name:'keyboard',link: './src/UI/keyboard/keyboard.ahtml',cb:onKeyboardLoaded};

function onKeyboardInteraction(value){
    function action(){
        if(isNaN(value))
            Engine.ObjectManager.objects.KciKIiWkUB9QL6d.triggerEvent('PressedKey'+value);
            // localStorage.setItem("Key"+value ,bb.fastGet('scripting','currentScriptAsCode')());
        else
            localStorage.setItem("Digit"+value ,bb.fastGet('scripting','currentScriptAsCode')());
    }

    return action;
}


function onKeyboardLoaded(){

    let keys = [...document.getElementsByClassName("keyboardKey")];
    keys.forEach(key => {
        key.addEventListener('click',onKeyboardInteraction(key.innerHTML));
    })
}