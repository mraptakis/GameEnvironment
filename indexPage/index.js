import carouselTab from './carouselTab/carouselTab.js'
import gamesTab from './gamesTab/gamesTab.js'
import informationTab from './informationTab/informationTab.js'

console.log(carouselTab);
console.log(gamesTab);
console.log(informationTab);

import uiFactory from './utils/UIFactory.js'

let wrapper = document.getElementById('main-body');

let footer = uiFactory.createElement({
    parent: wrapper,
    id: 'footer'
});

uiFactory.createElement({
    parent: footer,
    id: 'footer-content',
    innerHtml: `This project is part of Alexandros Katsarakis' thesis and everything was develop from scratch (except Blockly and the physics engine)`
});