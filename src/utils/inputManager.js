

class InputManager {
    currentlyPressed = {}
    
    keyPressed(key){
        if(this.currentlyPressed[key] === false)return;
        this.currentlyPressed[key] = true;
    }
    
    keyReleased(key){
        delete this.currentlyPressed[key];
    }
    
    getPressedKeys(){
        let keysPressed = [];
        for(let i in this.currentlyPressed){
            if(this.currentlyPressed[i])
                keysPressed.push(i);
            this.currentlyPressed[i] = false;
        }
        return keysPressed;
    }
}


let inputManager = new InputManager();

document.onkeydown = (ev)=>inputManager.keyPressed(ev.code);

document.onkeyup = (ev)=>inputManager.keyReleased(ev.code);

export default inputManager;