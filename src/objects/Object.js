import bb from '../utils/blackboard.js'
import log from '../utils/logs.js'
export default class Object {
    name
    renderer

    values = {}

    events = {}

    options = {}

    constructor(_name){
        this.name = _name;

        this.events['onClick'] = localStorage.getItem(this.name+"_onClick");
        this.events['onRightClick'] = localStorage.getItem(this.name+"_onRightClick");
        this.events['onGameStart'] = localStorage.getItem(this.name+"_onGameStart");
        this.events['onRemove'] = localStorage.getItem(this.name+"_onRemove");
        this.events['onMove'] = localStorage.getItem(this.name+"_onMove");
        this.events['onEachFrame'] = localStorage.getItem(this.name+"_onEachFrame");


        this.options['isMovable'] = true;
        this.options['isRemovable'] = true;
        this.options['isVisible'] = true;
        this.options['isSolid'] = false;
        this.options['isCollidable'] = true;

        this._executer = bb.fastGet('scripting','executeText');

    }

    getPositional(){
        let toReturn = {};
        for(let i in this.values){
            // if(this.values[i].tag === "positional")toReturn.push([i,this.getValue(i)]);

            if(this.values[i].tag === "positional")toReturn[i]=this.getValue(i);
        }
        return toReturn;
    }

    setColor(col){
        throw Error("setColor needs to be implemented");
    }

    setPosition(x,y){
        throw Error("setPosition needs to be implemented");
    }

    getPosition(){
        throw Error("getPosition needs to be implemented");
    }

    getObject(){
        throw Error("getObject needs to be implemented");
    }

    getCategory(){
        throw Error("getCategory needs to be implemented");
    }

    getName(){
        return this.name;
    }

    setName(newName){
        bb.fastRemove('liveObjects',this.name);
        if(bb.fastGet('state','player') === this)bb.fastSet('state','player',this);
        this.name = newName;
        bb.fastSet('liveObjects',this.name);
    }

    getOptions(){
        return this.options;
    }

    addOption(opt){
        this.options[opt] = true;
    }

    getOption(opt){
        return this.options[opt];
    }

    setOption(opt,val){
        this.options[opt] = val;
    }

    getValues(){
        return this.values;
    }

    addValue(val,v=""){
        if(this.values[val]){
            log.logError('Couldn\'t create value '+val+' because it already exists');
            return;
        }
        this.values[val] = {};
        this.values[val].val = v;
    }

    setValue(val,v){
        if(!this.values[val]){
            log.logError('Couldn\'t set value '+val+' because it doesn\'t exists');
            return;
        }
        this.values[val].val = v;
        if(this.values[val].onChange)this.values[val].onChange(v);
    }
    
    getValue(val){
        if(!this.values[val]){
            log.logError('Couldn\'t get value '+val+' because it doesn\'t exists');
            return;
        }
        if(this.values[val].getValue)return this.values[val].getValue();
        return this.values[val].val;
    }

    getEvents(){
        return this.events;
    }

    addEvent(ev){
        let code = localStorage.getItem(this.name+"_"+ev);
        this.events[ev] = (code)?code:"";
    }

    getEvent(ev){
        return this.events[ev];
    }

    setEvent(ev,code){
        localStorage.setItem(this.name+"_"+ev,code);
        this.events[ev] = code;
    }

    triggerEvent(ev){
        if(!this.events[ev])return;
        this._executer(this.events[ev]);
    }

    move(x,y){
        throw Error("move needs to be implemented");
    }

    animate(){
        throw Error("animate needs to be implemented");
    }

    newFrame(){
        throw Error("newFrame needs to be implemented");
    }

    add(){  //Add this item on renderer
        throw Error("add needs to be implemented");
    }

    clear(){
        for(let i in this.events){
            delete this.events[i];
        }

        for(let i in this.options){
            delete this.options[i];
        }

        for(let i in this.values){
            delete this.values[i];
        }

    }

    remove(){ // Remove this item from blackboard and from renderer to.
        throw Error("remove needs to be implemented");
    }

}