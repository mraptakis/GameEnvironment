import Engine from '../../Engine.js'

import uiFactory from '../../utils/UIFactory.js'

export default {
    name:'timewarp',
    link: './src/UI/timewarp/timewarp.ahtml',
    cb:onTimewarpLoad,
    removable: true, 
    loadOnInstall: true
};

function getLowerNumber(array,number){
    for(let i = 1; i < array.length; ++i){
        if(number < array[i]) return array[i-1];
    }
    return array[array.length -1];
}

function onTimewarpLoad(){
    if(!Engine.hasManager('TimewarpManager')) throw Error('Trying to install UI that requires Timewarp Manager but it\'s not installed');


    const timeWrapper = document.getElementById('timewarp-wrapper');


    let recBut = document.getElementById('timewarp-record');

    recBut.onclick = ()=> {
            recBut.style.backgroundColor = 'grey';
        Engine.TimewarpManager.startRecording(0);

        let stopRecBut = uiFactory.createElement({
            parent: timeWrapper,
            classList: 'timewarp-button'
        });

        recBut.style.backgroundColor = 'grey';
        stopRecBut.style.backgroundColor = 'red';
    
        stopRecBut.onclick = ()=> {
            stopRecBut.remove();

            Engine.TimewarpManager.stopRecording();
            
            let recordedTimes = Engine.TimewarpManager.getRecordedTimestamps();
            if(!recordedTimes) throw Error('No recorded times on stop');

            let firstTime = Number.parseInt(recordedTimes[0]);
            recordedTimes = recordedTimes.map((time)=>time - firstTime);
            console.log(recordedTimes);

            let range = uiFactory.createElement({
                parent: timeWrapper,
                type: 'input',
                inputType: 'range',
                id: 'timewarp-showRecords'
            });

            range.min = recordedTimes[0];
            range.max = recordedTimes[recordedTimes.length - 1];
            range.value = recordedTimes[recordedTimes.length - 1];

            range.onchange = (ev) => {
                let number = Number.parseInt(ev.target.value);
                let realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.showSnapshot(firstTime+realNumber);
            }

            let factor = uiFactory.createElement({
                parent: timeWrapper,
                type: 'input',
                inputType: 'number',
                classList: 'timewarp-button',
                value: 1
            });
            factor.style.padding = '0';
            factor.style.margin = '0';
            factor.style.border = '0';
            factor.style.backgroundColor = 'white';

            let showBackward = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-showBackward', 
                classList: 'timewarp-button'
            });

            showBackward.onclick = ()=>{
                let number = Number.parseInt(range.value);
                let realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.playBackward(firstTime+realNumber,factor.value);
            }  

            let pausePlayBut = uiFactory.createElement({
                parent: timeWrapper,
                classList: 'timewarp-button'
            });
            pausePlayBut.style.backgroundColor = 'cyan';
            pausePlayBut.onclick = ()=>{
                Engine.TimewarpManager.stopPlayback();
            }          
            
            let showForward = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-showForward', 
                classList: 'timewarp-button'
            });

            showForward.onclick = ()=>{
                let number = Number.parseInt(range.value);
                let realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.playForward(firstTime+realNumber,factor.value);
            }

            let resumeBut = uiFactory.createElement({
                parent: timeWrapper,
                id: 'timewarp-resume', 
                classList: 'timewarp-button'
            });

            resumeBut.onclick = ()=>{                
                let number = Number.parseInt(range.value);
                let realNumber = getLowerNumber(recordedTimes,number);
                Engine.TimewarpManager.resumeFromRecording(firstTime+realNumber);
            }

        }
    }



}