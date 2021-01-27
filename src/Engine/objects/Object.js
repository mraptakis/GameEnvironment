import bb from '../../utils/blackboard.js'
import log from '../../utils/logs.js'
import rand from '../../utils/randomGenerator.js'

import Event from './Event.js'
import State from './State.js'

export default class Object {
    _id 
    _name 
    renderer 
    values = {}

    events = {}

    options = {}

    currentState;
    states = {}

    _category;

    constructor(_name, _id) {
        this._name = _name;
        this.id = (_id) ? _id : rand.generateGameID();

        this.events['onClick'] = new Event({tag: 'system'});
        this.events['onRightClick'] = new Event({tag: 'system'});
        this.events['onGameStart'] = new Event({tag: 'system'});
        this.events['onRemove'] = new Event({tag: 'system'});
        this.events['onMove'] = new Event({tag: 'system'});
        this.events['onEachFrame'] = new Event({tag: 'system'});

        this.states['idle'] = new State({tag: 'idle'});

        this.currentState = this.states['idle'];

        this.options['isMovable'] = true;
        this.options['isRemovable'] = true;
        this.options['isVisible'] = true;
        this.options['isSolid'] = false;
        this.options['isCollidable'] = true;

    }

    getCategory() {
        return this._category;
    }

    getPositional() {
        let toReturn = {};
        for (let i in this.values) { // if(this.values[i].tag === "positional")toReturn.push([i,this.getValue(i)]);

            if (this.values[i].tag === "positional") 
                toReturn[i] = this.getValue(i);
            
        }
        return toReturn;
    }

    getCodes() {
        let toReturn = {};

        let events = this.getEvents();
        for (let i in events) {
            toReturn[i] = {};
            toReturn[i].get = () => {
                return this.getEvent(i)
            } 
            toReturn[i].set = (code) => {
                this.setEvent(i, code)
            }
        }

        let states = this.getStates();
        for(let i in states){
            let state = this.getState(i);
            toReturn[i+'_From'] = {};
            toReturn[i+'_From'].get = () => {
                return state.transitionFrom;
            } 
            toReturn[i+'_From'].set = (code) => {
                this.setState(i,code,undefined);
            }
            toReturn[i+'_To'] = {};
            toReturn[i+'_To'].get = () => {
                return state.transitionTo;
            } 
            toReturn[i+'_To'].set = (code) => {
                this.setState(i,undefined,code);
            }
        }

        return toReturn;
    }

    setColor(col) {
        throw Error("setColor needs to be implemented");
    }

    setPosition(x, y) {
        throw Error("setPosition needs to be implemented");
    }

    getPosition() {
        throw Error("getPosition needs to be implemented");
    }

    getObject() {
        throw Error("getObject needs to be implemented");
    }

    get id() {
        return this._id;
    }

    set id(newID) {
        this._id = newID;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName;
    }

    getName() {
        return this.name;
    }

    setName(newName) {
        this.name = newName;
    }


    getOptions() {
        return this.options;
    }

    addOption(opt) {
        this.options[opt] = true;
    }

    getOption(opt) {
        return this.options[opt];
    }

    setOption(opt, val) {
        this.options[opt] = val;
    }

    getCurrentState() {
        return this.currentState.tag;
    }

    setCurrentState(newState) {
        if (!this.states[newState]) 
            return;
         // TODO

        bb.fastGet('scripting', 'executeText')(this.currentState.transitionFrom); // TODO
        this.currentState = this.states[newState];
        bb.fastGet('scripting', 'executeText')(this.currentState.transitionTo); // TODO

    }

    getStates() {
        return this.states;
    }

    addState(state) {
        this.states[state] = new State({tag: state})
    }

    getState(state) {
        return this.states[state];
    }

    setState(state, transitionFrom, transitionTo) {
        if(transitionFrom) this.states[state].transitionFrom = transitionFrom;
        if(transitionTo) this.states[state].transitionTo = transitionTo;
    }

    getValues() {
        return this.values;
    }

    addValue(val, v = "") {
        // if(this.values[val]){
        //     log.logError('Couldn\'t create value '+val+' because it already exists');
        //     return;
        // }
        this.values[val] = {};
        this.values[val].val = v;
    }

    setValue(val, v) {
        if (!this.values[val]) {
            this.addValue(val, v);
            return;
        }
        this.values[val].val = v;
        if (this.values[val].onChange) 
            this.values[val].onChange(v);
        
    }

    getValue(val) {
        if (!this.values[val]) { // log.logError('Couldn\'t get value '+val+' because it doesn\'t exists');
            return;
        }
        if (this.values[val].getValue) 
            return this.values[val].getValue();
        
        return this.values[val].val;
    }

    getEvents() {
        return this.events;
    }

    addEvent(ev, code) {
        this.events[ev] = new Event({
            tag: 'custom',
            value: (code) ? code : ""
        });
    }

    getEvent(ev) {
        if (!this.events[ev]) { // log.logError('Couldn\'t get event '+ev+' because it doesn\'t exists');
            return;
        }
        if (this.events[ev].getValue) 
            return this.events[ev].getValue();
        
        return this.events[ev].val;
    }

    setEvent(ev, code) {
        if (!this.events[ev]) {
            this.addEvent(ev, code);
            return;
        }
        this.events[ev].val = code;
        if (this.events[ev].onChange) 
            this.events[ev].onChange(code);
        
    }

    triggerEvent(ev) {
        if (!this.events[ev]) 
            return;
        
        bb.fastGet('scripting', 'executeText')(this.getEvent(ev)); // TODO
    }

    move(x, y) {
        throw Error("move needs to be implemented");
    }

    animate() {
        throw Error("animate needs to be implemented");
    }

    newFrame() {
        throw Error("newFrame needs to be implemented");
    }

    add() { // Add this item on renderer
        throw Error("add needs to be implemented");
    }

    save() {
        let savedData = {};
        savedData['id'] = this._id;
        savedData['name'] = this._name;

        savedData['events'] = {};
        let events = savedData['events'];
        for (let i in this.events) {
            events[i] = this.getEvent(i);
        }

        savedData['options'] = {};
        let options = savedData['options'];
        for (let i in this.options) {
            options[i] = this.getOption(i);
        }

        savedData['values'] = {};
        let values = savedData['values'];
        for (let i in this.values) {
            values[i] = this.getValue(i);
        }
        savedData['category'] = this._category;
        return savedData;
    }

    loadFromSaved(objData) {
        this.id = objData.id;
        this.name = objData.name;

        let events = objData.events;
        for (let i in events) {
            this.setEvent(i, events[i]);
        }

        let options = objData.options;
        for (let i in options) {
            this.setOption(i, options[i]);
        }

        let values = objData.values;
        for (let i in values) {
            this.setValue(i, values[i]);
        }
    }

    clear() {
        for (let i in this.events) {
            delete this.events[i];
        }

        for (let i in this.options) {
            delete this.options[i];
        }

        for (let i in this.values) {
            delete this.values[i];
        }

    }

    remove() { // Remove this item from blackboard and from renderer to.
        throw Error("remove needs to be implemented");
    }

}
