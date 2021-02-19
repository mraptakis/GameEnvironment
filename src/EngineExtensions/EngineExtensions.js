import Engine from '../Engine.js'

// import utils from '../utils/utils.js'
// import bb from '../utils/blackboard.js'

import ObjectSnapshotManager from './ObjectSnapshotManager.js'
Engine.installManager('ObjectSnapshotManager', new ObjectSnapshotManager());

import ClipboardManager from './ClipboardManager.js'
Engine.installManager('ClipboardManager', new ClipboardManager());

import PauseManager from './PauseManager.js'
Engine.installManager('PauseManager', new PauseManager());

import SaveManager from './SaveManager.js'
Engine.installManager('SaveManager', new SaveManager());