import bb from '../../utils/blackboard.js'

import Vue from '../../../libs/vue.min.js'

export default {name:'settingsWindow',link: './src/UI/settingsWindow/settingsWindow.ahtml',cb:onSettingsWindowLoaded};

function closeSettingsWindow(){
    bb.fastGet('UI','hideUI')('settingsWindow');
}

const settings = {
    mainColor: {
        onChange: (ev)=>{
            document.documentElement.style.setProperty('--main-color', ev.target.value);
        },
        name: 'mainColor',
        inputType:'color'
    },
    mainColorHover: {
        onChange: (ev)=>{
            document.documentElement.style.setProperty('--main-color-hover', ev.target.value);
        },
        name: 'mainColorHover',
        inputType:'color'
    },
    mainColorText: {
        onChange: (ev)=>{
            document.documentElement.style.setProperty('--main-color-text', ev.target.value);
        },
        name: 'mainColorText',
        inputType:'color'
    },
    secondaryColor: {
        onChange: (ev)=>{
            document.documentElement.style.setProperty('--secondary-color', ev.target.value);
        },
        name: 'secondaryColor',
        inputType:'color'
    },
    secondaryColorHover: {
        onChange: (ev)=>{
            document.documentElement.style.setProperty('--secondary-color-hover', ev.target.value);
        },
        name: 'secondaryColorHover',
        inputType:'color'
    },
    secondaryColorText: {
        onChange: (ev)=>{
            document.documentElement.style.setProperty('--secondary-color-text', ev.target.value);
        },
        name: 'secondaryColorText',
        inputType:'color'
    },
    myName: {
        onChange: ()=>console.log('b'),
        name: 'myName',
        change:'text'
    }
}

function onSettingsWindowLoaded(){
    document.getElementById('settings-window-background').addEventListener('click',closeSettingsWindow);


    // Vue.component('settings-item', {
    //     props: ['object'],
    //     template: '<div class="objectItem">{{ object.name }} {{ object.id }}</div>'
    //   })
    // let objects = bb.fastGet('Engine','ObjectManager').objects;

    // let vue = new Vue({
    //     el: '#settings-window',
    //     data: {
    //         objects
    //     },
    //     methods: {
    //         changeListItem: () => {
    //             console.log(objects);
    //         }
    //     }
    // })

    Vue.component('settings-item-input', {
        props: ['setting'],
        template: 
        `<input :type="setting.inputType" v-on:input="setting.onChange"></input>`
      })
    Vue.component('settings-item', {
        props: ['setting'],
        template: 
        `<div class="objectItem">{{ setting.name }} <settings-item-input v-bind:setting="setting" v-bind:key="setting.name"/></div>`
      })
    let vue = new Vue({
        el: '#settings-window',
        data: {
            settings
        },
        methods: {
            
        }
    })
}