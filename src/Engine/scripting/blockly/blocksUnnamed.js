import objManager from '../../renderer/ObjectManager.js'

import bb from '../../../utils/blackboard.js'

const colourPalette = {
    colour: 24,
    object: 190
};

function getObjects(){
    let map = objManager.objects;
    let categs = [];
    for(let i in map){
            categs.push([map[i].name,i]);
    }
    return categs;
}

function getValues(objID){
    let values = objManager.getObject(objID).getValues();
        
    let toAdd = [];
    
    for(let i in values){
        toAdd.push([i,i])
    }
    
    if(toAdd.length === 0)toAdd = [['','']];
    return toAdd;
}


function getStates(objID){
    let values = objManager.getObject(objID).getStates();
    let toAdd = [];
    
    for(let i in values){
        toAdd.push([i,i])
    }
    
    if(toAdd.length === 0)toAdd = [['','']];
    return toAdd;
}


Blockly.Blocks['get_unnamed_object_field'] = {
    validate(newValue){
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },

    init: function() {
        this.appendValueInput('objName')
            .setCheck('Object')
            .appendField('treat object');
        this.appendDummyInput('castObject')
            .appendField('as')
            .appendField(new Blockly.FieldDropdown(getObjects(),this.validate), 'MODE')
        this.appendDummyInput('values')
            .appendField('to get attribute')
            .appendField(new Blockly.FieldDropdown([["",""]]), 'FIELD');
        this.setColour(colourPalette.object);
        this.setOutput(true,undefined);
    },

    updateConnections: function(newValue) {
        let toAdd = getValues(newValue);
        this.removeInput('values', /* no error */ true);
        this.appendDummyInput('values')
            .appendField('to get attribute')
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD');
    },

};

Blockly.JavaScript['get_unnamed_object_field'] = function(block) {
    let obj_val = Blockly.JavaScript.statementToCode(block, 'objName',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    let field_val = block.getFieldValue('FIELD');
    return [`AK.getAttribute(${obj_val},'${field_val}')`,Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

///////////////////////////////SET STATE////////////////////////////////////////

Blockly.Blocks['set_unnamed_object_cstate'] = {
    validate(newValue){
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },

    init: function() {
        this.appendValueInput('objName')
            .setCheck('Object')
            .appendField('treat object');
        this.appendDummyInput('castObject')
            .appendField('as')
            .appendField(new Blockly.FieldDropdown(getObjects(),this.validate), 'MODE')
        this.appendDummyInput('values')
            .appendField('to set state')
            .appendField(new Blockly.FieldDropdown([["",""]]), 'FIELD');
        this.setColour(colourPalette.object);
        this.setOutput(true,undefined);
    },

    updateConnections: function(newValue) {
        let toAdd = getStates(newValue);
        this.removeInput('values', /* no error */ true);
        this.appendDummyInput('values')
            .appendField('to set state')
            .appendField(new Blockly.FieldDropdown(toAdd), 'FIELD');
    },

};

Blockly.JavaScript['set_unnamed_object_cstate'] = function(block) {
    let obj_val = Blockly.JavaScript.statementToCode(block, 'objName',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    let field_val = block.getFieldValue('FIELD');
    return [`AK.setCurrentState(${obj_val},'${field_val}')`,Blockly.JavaScript.ORDER_FUNCTION_CALL];
};