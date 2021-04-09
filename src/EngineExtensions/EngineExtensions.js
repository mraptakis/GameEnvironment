import Engine from '../Engine.js'

import ObjectSnapshotManager from './ObjectSnapshotManager.js'
Engine.installManager('ObjectSnapshotManager', new ObjectSnapshotManager());

import ClipboardManager from './ClipboardManager.js'
Engine.installManager('ClipboardManager', new ClipboardManager());

import PauseManager from './PauseManager.js'
Engine.installManager('PauseManager', new PauseManager());

import GridManager from './GridManager.js'
Engine.installManager('GridManager', new GridManager());

import CalculatorManager from './CalculatorManager.js'
Engine.installManager('CalculatorManager', new CalculatorManager());


import QuantizerManager from './QuantizerManager.js'
Engine.installManager('QuantizerManager', new QuantizerManager());

import TimewarpManager from './TimewarpManagerDS.js'
Engine.installManager('TimewarpManager', new TimewarpManager());