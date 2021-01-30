import log from '../../utils/logs.js'

class Value {
    val
    tag
    constructor({tag,value,onChange,getValue}){
        if(typeof tag !== 'string'
        || (typeof onChange !== 'function' && onChange !== undefined)
        || (typeof getValue !== 'function' && getValue !== undefined)){
            throw Error("Error creating value")
        }
        this.tag = tag;
        this.val = value;
        this.onChange = onChange;
        this.getValue = getValue;
    }
}

export default class ValueHandler{
    _regValues = {}

    getValues() {
        return this._regValues;
    }

    registerValue(val, {tag,value,onChange,getValue}) {
        // if(this._regValues[val]){
        //     log.logError('Couldn\'t create value '+val+' because it already exists');
        //     return;
        // }
        this._regValues[val] = new Value({
            tag: tag || 'undefined',
            value: (value !== undefined)?value : '',
            onChange: (onChange !== undefined)?onChange : undefined,
            getValue: (getValue !== undefined)?getValue : undefined
        });
    }

    setValue(val, v) {
        if (!this._regValues[val]) {
            this.registerValue(val, {value:v});
            return;
        }
        this._regValues[val].val = v;
        if (this._regValues[val].onChange) 
            this._regValues[val].onChange(v);
        
    }

    getValue(val) {
        let value = this._regValues[val];
        
        if (!value) { 
            // log.logError('Couldn\'t get value '+val+' because it doesn\'t exists');
            return;
        }
        if (value.getValue) 
            return value.getValue();
        
        return value.val;
    }

    removeValue(val){
        let value = this._regValues[val];
        if(!value){
            log.logError('Tried to remove unregistered value '+val);
            return;
        }
        delete this._regValues[val];
    }

    getValueTag(val){
        let value = this._regValues[val];
        return value.tag;
    }
}