import bb from '../../utils/blackboard.js'
class State {
    tag
    transitionFrom
    transitionTo
    constructor({tag,transitionFrom,transitionTo}){
        if(typeof tag !== 'string')
            throw Error('Error creating State')

        this.tag = tag;
        this.transitionFrom = transitionFrom || "";
        this.transitionTo = transitionTo || "";
    }
}

export default class StateManager{
    _currState;
    _regStates = {}

    constructor(){
        this.registerState('idle');

        this._currState = this.getState('idle');
    }

    getCurrentState() {
        return this._currState.tag;
    }

    setCurrentState(newState) {
        if (!this._regStates[newState]) 
            return;
         // TODO

        bb.fastGet('scripting', 'executeText')(this._currState.transitionFrom); // TODO
        this._currState = this._regStates[newState];
        bb.fastGet('scripting', 'executeText')(this._currState.transitionTo); // TODO

    }

    getStates() {
        return this._regStates;
    }

    registerState(state) {
        this._regStates[state] = new State({tag: state})
    }

    getState(state) {
        return this._regStates[state];
    }

    setState(state, transitionFrom, transitionTo) {
        if(transitionFrom) this._regStates[state].transitionFrom = transitionFrom;
        if(transitionTo) this._regStates[state].transitionTo = transitionTo;
    }

    removeState(state) {
        delete this._regStates[state]
    }

}