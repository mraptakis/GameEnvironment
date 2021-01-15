export default class State {
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