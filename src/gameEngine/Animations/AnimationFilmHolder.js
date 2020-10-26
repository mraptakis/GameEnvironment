import json from './AnimationFilmHolderJSON.js'

import AnimationFilm from './AnimationFilm.js'

class AnimationFilmHolder {
    _films = {}; // id -> animationFilm

    loadAll(){
        for(let i in json.boxes){
            let id = i.split("_");
            id.length = id.length -1;
            id = id.join("_");
            let item = json.boxes[i];
            if(!this._films[id]){
                let animFilm = new AnimationFilm({
                    id: id,
                    bitmap: item.sprite_url,
                });
                this._films[id] = animFilm;
            }
            this._films[id].append({x:item.x,y:item.y,width:item.width,height:item.height});
        }
    }

    cleanUp(){
        this._films = {};
    }

    getFilm(id){
        return this._films[id];
    }

};

const animationFilmHolder = new AnimationFilmHolder();

export default animationFilmHolder;