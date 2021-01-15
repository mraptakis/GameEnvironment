import './utils/initializationManager.js'

import Engine from './Engine.js'


import init from '../assets/json/pacman.js' //json
import animationManagement from '../assets/json/AnimationManagerJSON.js' //json
import animationFilms from '../assets/json/AnimationFilmHolderJSON.js' //json

Engine.initInfo = init;
Engine.preSetAnimations = animationManagement;
Engine.animationBundle = animationFilms;

Engine.start();