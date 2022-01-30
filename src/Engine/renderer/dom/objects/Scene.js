import stage from '../../EnvironmentObject.js'

class Scene {
    _items;
    _aspectRatio;
    _background;

    constructor(){
        this.div = document.createElement("div");
        this._background = document.createElement('div');

        this._items = {};

        this.div.style.position = "absolute";
        this.div.id = 'scene';
        this.div.style.width = (stage._windowWidth/stage._aspectRatio) + 'px';
        this.div.style.height = (stage._windowHeight/stage._aspectRatio) + 'px';
        this.div.style.top = ((window.innerHeight - (stage._windowHeight/stage._aspectRatio) )/2) + 'px';
        
        this._background.style.position = 'absolute';
        this._background.id = 'gamebackground';
        this._background.style.width = (stage._windowWidth/stage._aspectRatio) + 'px';
        this._background.style.height = (stage._windowHeight/stage._aspectRatio) + 'px';
        this._background.style.top = ((window.innerHeight - (stage._windowHeight/stage._aspectRatio) )/2) + 'px';
        this._background.style.zIndex = -1;

        this._aspectRatio = 1920/window.innerWidth;


        document.body.appendChild(this._background);
        document.body.appendChild(this.div);

        this._category = 'Scene';

    }

    getScene(){
        return this.div;
    }
    
    addItem(it){
        this.div.appendChild(it.div);
        this._items[it.id] = it;
    }

    remove(it){
        this.div.removeChild(it.div);
        delete this._items[it.id];
    }

    renderObjects(){
        for(let i in this._items){
            this._items[i].render();
        }
    }

}

const sceneObj = new Scene();

export default sceneObj;