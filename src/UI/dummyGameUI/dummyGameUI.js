export default {
    name:'dummyGameUI',
    link: './src/UI/dummyGameUI/dummyGameUI.ahtml',
    cb:onDummyGameUILoaded,
    removable: false, 
    loadOnInstall: true
};

function onDummyGameUILoaded(){
    console.log('Dummy UI loaded');

}