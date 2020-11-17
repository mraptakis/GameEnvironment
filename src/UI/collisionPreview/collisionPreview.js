import bb from '../../utils/blackboard.js'

export default {name:'collisionPreview',link: './src/UI/collisionPreview/collisionPreview.ahtml',cb:onCollisionPreviewLoaded};

// function createPopUp(){
//     let wrap = document.createElement('div');
//     wrap.id = 'collisionPreviewCreateWrapper';
//     document.body.appendChild(wrap);

//     let popUpCloseBack = document.createElement('div');
//     popUpCloseBack.id = 'collisionPreviewCreate_popup_close_back';
//     wrap.appendChild(popUpCloseBack);

//     let popUp = document.createElement('div');
//     popUp.id = 'collisionPreviewCreate_popup';
//     wrap.appendChild(popUp);

//     let toolbar = document.createElement('div');
//     toolbar.id = 'collisionPreviewCreate_popup_toolbar';
//     toolbar.innerHTML = 'Collision Workshop';
//     popUp.appendChild(toolbar);

//     let popUpClose = document.createElement('div');
//     popUpClose.id = 'collisionPreviewCreate_popup_close';
//     popUpClose.innerHTML = 'X';
//     toolbar.appendChild(popUpClose);

//     let chooseArea1 = document.createElement('div');
//     chooseArea1.id = 'collisionPreviewCreate_popup_choosearea1';
//     popUp.appendChild(chooseArea1);

//     let list1Wrapper = document.createElement('ul');
//     list1Wrapper.classList += 'collisionPreviewCreate_popup_listWrapper';
//     chooseArea1.appendChild(list1Wrapper);

//     let chooseArea2 = document.createElement('div');
//     chooseArea2.id = 'collisionPreviewCreate_popup_choosearea2';
//     popUp.appendChild(chooseArea2);

//     let list2Wrapper = document.createElement('ul');
//     list2Wrapper.classList += 'collisionPreviewCreate_popup_listWrapper';
//     chooseArea2.appendChild(list2Wrapper);

//     let combineInfo = document.createElement('div');
//     combineInfo.id = 'collisionPreviewCreate_popup_combineInfo';
//     popUp.appendChild(combineInfo);


//     let aliveItems = bb.getComponent('liveObjects').itemMap;
//     console.log(aliveItems);

//     for(let i in aliveItems){
//         if(i === 'Stage')continue;
//         list1Wrapper.innerHTML += `<li>${i}</li>`;
//         list2Wrapper.innerHTML += `<li>${i}</li>`;
//     }

// }


function closeCollisionWindow(){
    let items = document.getElementsByClassName('collisionPreview_itemWrapper');
    for(let i = 0;i < items.length; i++){
        items.item(i).remove();
    }
}

function showCollisions(){
    console.log(bb.fastGet('collisions','getAllCollisions')());

    let items = bb.fastGet('collisions','getAllCollisions')();

    let objWrapper = document.getElementById('collisionPreviewWrapper');
    for(let i in items){
        let wrap = document.createElement('div');
        wrap.classList += 'collisionPreview_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'collisionPreview_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'collisionPreview_body';
        for(let colWith in items[i]){
            body.innerHTML += " "+colWith;
        }
        wrap.appendChild(body);
    }

    let wrap = document.createElement('div');
    wrap.classList += 'collisionPreview_itemWrapper';
    objWrapper.appendChild(wrap);

    let title = document.createElement('div');
    title.classList += 'collisionPreview_objName';
    title.innerHTML = "Click to create new collision";
    wrap.appendChild(title);
    

    let body = document.createElement('div');
    body.classList += 'collisionPreview_body';
    wrap.appendChild(body);


    let select1 = document.createElement('div');
    select1.classList += 'collisionPreviewCreate_listWrapper';
    body.appendChild(select1);

    let prompt1 = document.createElement('div');
    prompt1.classList += 'collisionPreviewCreate_promptList';
    prompt1.innerHTML = '1st object';
    select1.appendChild(prompt1);

    let list1 = document.createElement('select');
    list1.classList += 'collisionPreviewCreate_list';
    select1.appendChild(list1);

    let select2 = document.createElement('div');
    select2.classList += 'collisionPreviewCreate_listWrapper';
    body.appendChild(select2);

    let prompt2 = document.createElement('div');
    prompt2.classList += 'collisionPreviewCreate_promptList';
    prompt2.innerHTML = '2nd object';
    select2.appendChild(prompt2);

    let list2 = document.createElement('select');
    list2.classList += 'collisionPreviewCreate_list';
    select2.appendChild(list2);

    let createCollision = document.createElement('div');
    createCollision.id = 'collisionPreviewCreate_createCollision';
    createCollision.innerHTML = 'Create Collision';
    body.appendChild(createCollision);

    let aliveItems = bb.getComponent('liveObjects').itemMap;

    for(let i in aliveItems){
        if(i === 'Stage')continue;
        list1.innerHTML += `<option value=${i}>${i}</option>`;
        list2.innerHTML += `<option value=${i}>${i}</option>`;
    }
    
    createCollision.addEventListener('click',()=>{
        bb.fastGet('collisions', 'installCollision')(list1.value,list2.value);
    });

}

function toggleCollisionPreview(){
    let wrapper = document.getElementById('collisionPreviewWrapper');
    let toggleBut = document.getElementById('collisionPreview_makeBig');
    if(wrapper.style.height === '200px'){
        closeCollisionWindow();
        wrapper.innerHTML = '';
        wrapper.style.height = 0;
        toggleBut.style.bottom = '60px';
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        showCollisions();
    }
}

function onCollisionPreviewLoaded(){
    let toggleBut = document.getElementById('collisionPreview_makeBig');
    toggleBut.addEventListener('click',toggleCollisionPreview)
}