import Object from './Object454.js'

import Value from '../../../objects/Value.js'

import bb from '../../../utils/blackboard.js'


class Rectangle extends Object {
    _width;
    _height;
    _frame;

    constructor({name,dim,frame}){
        super(name);
        
        this._width = (dim)?dim.width:100;
        this._height = (dim)?dim.height:100;
        this._frame = frame;
        this.values['width'] = new Value({
            tag: "positional",
            onChange: (value) => {this._width = value;},
            getValue: () => {return this._width;}
        });

        this.values['height'] = new Value({
            tag: "positional",
            onChange: (value) => {this._height = value;},
            getValue: () => {return this._height;}
        });
    }

    getCategory(){
        return "Rectangle";
    }

    render(ctx){
        if(!this._frame){
            ctx.fillStyle = this._color;
            ctx.fillRect(this._x, this._y, this._width, this._height);
            ctx.fillStyle = "#ffffff";
        }else{
            let info = bb.fastGet('gameEngine','animationFilmHolder').getFilm(this._frame);
            let box = info.getFrameBox(0);
            let img = info.bitmap;
            ctx.drawImage(bb.fastGet('assets',img),
            box.x,box.y,box.width,box.height,
            this._x, this._y, this._width, this._height);
        }
    }
}

bb.fastInstall('objects','Rectangle',Rectangle);