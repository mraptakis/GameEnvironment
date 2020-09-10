import ActionObject from './ActionObject.js'

import bb from '../../../utils/blackboard.js'
function pxToNumber(str){
    str.substr(1,str.length-4);
    return parseInt(str);
}
class Text extends ActionObject {
    
    constructor({name,texture,dim,defaultText}){
        super(name);
        
        this.div = document.createElement('div');
        this.div.id = name;
        this.div.innerHTML = (defaultText)?defaultText:name;
        // this.div.style.width = (dim&&dim.width)?dim.width: "100px";
        // this.div.style.height = (dim&&dim.height)?dim.height: "100px";

        this.div.style.position = "absolute";

        this.options.push('move')
        this.options.push('changeColor');
        this.options.push('removeObject');

    }

    animate(){
        
    }

    getBoundingBox(){
        return {
            x: pxToNumber(this.div.style.left),
            y: pxToNumber(this.div.style.top),
            width: (this.div.offsetWidth),
            height: (this.div.offsetHeight)
        }
    }

    setColor(col){
        this.div.style.color = col;
    }

    setValue(val){
        this.value = val;
        this.div.innerHTML = val;
    }

}


bb.fastInstall('objects','Text',Text);