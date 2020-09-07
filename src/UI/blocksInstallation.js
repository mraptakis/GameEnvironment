const colourPalette = {
    colour: 24,
    object: 40
}



Blockly.Blocks['colour_change'] = {
    init: function() {
        this.appendValueInput('VALUE')
            .setCheck('Colour')
            .appendField('Change Colour');
        this.setColour(colourPalette.colour);
        this.setTooltip('Change the colour of the object it refers.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['colour_change'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return 'bb.fastGet("actions","changeColor")(undefined,'+argument0 + ');';
};

Blockly.Blocks['move_right'] = {
    init: function() {
        this.appendValueInput('Number')
            .appendField('Move Right');
        this.setColour(colourPalette.object);
        this.setTooltip('Move an object right.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['move_right'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'Number',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    argument0 /= 100;
    return 'bb.fastGet("actions","move")(undefined,'+argument0 + ');';
};

Blockly.Blocks['get_object'] = {
    init: function() {
        this.appendValueInput('Object')
            .setCheck('String')
            .appendField('Get Object');
        this.setColour(colourPalette.object);
        this.setOutput(true, 'VALUE');
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        return 0;
    }
};

Blockly.JavaScript['get_object'] = function(block) {
    var argument0 = Blockly.JavaScript.valueToCode(block, 'Object',
    Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    return 'bb.fastGet("liveObjects",' + argument0 + ')';
};

Blockly.Blocks['console_log'] = {
    init: function() {
        this.appendValueInput('CON_LOG')
            .appendField('Log');
        this.setColour(colourPalette.object);
        this.setTooltip('Get an object by name.');
        this.setHelpUrl('none');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        return 0;
    }
};

Blockly.JavaScript['console_log'] = function(block) {
    var argument0 = Blockly.JavaScript.statementToCode(block, 'CON_LOG',
    Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'console.log('+argument0+');';
};