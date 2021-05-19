import bb from '../../utils/blackboard.js'

import Engine from '../../Engine.js'
import uiFactory from '../../utils/UIFactory.js';

const FRAnimator = Engine.AnimationManager.getAnimatorCategory('FrameRangeAnimator');
const FRAnimation = Engine.AnimationManager.getAnimationCategory('FrameRangeAnimation');

export default {
    name:'inventoryWindow',
    link: './src/UI/inventoryWindow/inventoryWindow.ahtml',
    cb:onSettingsInventoryLoaded,
    removable: true, 
    loadOnInstall: true
};


let lastGameState;

function closeInventoryWindow(){
    removeAllAnimators();
    bb.fastGet('UI','hideUI')('inventoryWindow');
    bb.fastGet('UI','removeUI')('inventoryWindow');

    if(lastGameState){
        bb.fastSet('state','mode',lastGameState);
    }
}

function focusTab(tabName){
    clear();
    const tabs = document.getElementsByClassName('inventory-window-tabs-item');
    for(let i = 0; i < tabs.length; i++){
        tabs[i].classList = 'inventory-window-tabs-item';
        if(tabs[i].innerHTML === tabName){
            tabs[i].classList += ' inventory-window-tabs-item-selected';
        }
    }
}

function onSettingsInventoryLoaded(){
    document.getElementById('inventory-window-background').addEventListener('click',closeInventoryWindow);
    document.getElementById('inventory-window-head-close').addEventListener('click',closeInventoryWindow);
    
    lastGameState = bb.fastGet('state','mode');
    bb.fastSet('state','mode','popUpOpen');

    const tabDiv = document.getElementById('inventory-window-tabs');

    const body = document.getElementById('inventory-window-body');
    body.innerHTML = '';

    uiFactory.createElement({
        classList: 'inventory-window-tabs-item  inventory-window-tabs-item-selected',
        innerHTML: 'Films',
        parent: tabDiv
    }).onclick = () => {
        focusTab('Films');
        showFilms(body);
    }

    uiFactory.createElement({
        classList: 'inventory-window-tabs-item',
        innerHTML: 'Objects',
        parent: tabDiv
    }).onclick = () => {
        focusTab('Objects');
        showObjects(body);
    }

    uiFactory.createElement({
        classList: 'inventory-window-tabs-item',
        innerHTML: 'Collisions',
        parent: tabDiv
    }).onclick = () => {
        focusTab('Collisions');
        showCollisions(body);
    }

    if(Engine.hasManager('ClipboardManager')){
        uiFactory.createElement({
            classList: 'inventory-window-tabs-item',
            innerHTML: 'Clipboard',
            parent: tabDiv
        }).onclick = () => {
            focusTab('Clipboard');
            showClipboard(body);
        }
    }

    if(Engine.hasManager('SnapshotManager')){
        uiFactory.createElement({
            classList: 'inventory-window-tabs-item',
            innerHTML: 'Snapshots',
            parent: tabDiv
        }).onclick = () => {
            focusTab('Snapshots');
            showSnapshots(body);
        }
    }

    if(Engine.hasManager('SnapshotManager')){
        uiFactory.createElement({
            classList: 'inventory-window-tabs-item',
            innerHTML: 'Scenes',
            parent: tabDiv
        }).onclick = () => {
            focusTab('Scenes');
            showScenes(body);
        }
    }

    focusTab('Films');
    showFilms(body);

}

function checkAndAddEmpty(objWrapper,object){
    const objKeys = Object.keys(object);
    if(objKeys.length === 0){
        uiFactory.createElement({
            parent: objWrapper,
            id: 'inventory-empty-text',
            innerHTML: 'Nothing to be shown'
        });
    }
}


function clear(){
    removeAllAnimators();
}

function showScenes(objWrapper){
    objWrapper.innerHTML = '';
    const items = Engine.SnapshotManager.getAllSceneSnapshots();
    
    checkAndAddEmpty(objWrapper,items);

    for(let i in items){
        const wrap = uiFactory.createElement({
            parent: objWrapper,
            classList: 'inventory-window-itemWrapper'
        });

        uiFactory.createElement({
            parent: wrap,
            classList: 'inventory-window-objName',
            innerHTML: items[i].time
        });

        uiFactory.createElement({
            parent: wrap,
            classList: 'inventory-window-body',
            innerHTML: 'Click to reset to scene ('+items[i].name+')'
        });

        wrap.onclick = ()=>{
            Engine.SnapshotManager.resetSceneToSnapshot(i);
            closeInventoryWindow();
        }
    }
}

function showCollisions(objWrapper){
    objWrapper.innerHTML = '';
    const items = Engine.CollisionManager.getAllCollisions();
    checkAndAddEmpty(objWrapper,items);

    for(let i in items){
        const wrap = uiFactory.createElement({
            parent: objWrapper,
            classList: 'inventory-window-itemWrapper'
        });

        uiFactory.createElement({
            parent: wrap,
            classList: 'inventory-window-objName',
            innerHTML: i
        });
        
        let str = '';
        for(let colWith in items[i]){
            str += colWith+'\n';
        }

        uiFactory.createElement({
            parent: wrap,
            classList: 'inventory-window-body',
            innerHTML: str
        });
    }
}

function showSnapshots(objWrapper){
    objWrapper.innerHTML = '';

    const allSnapshots = Engine.SnapshotManager.getAllSnapshots();
    checkAndAddEmpty(objWrapper,allSnapshots);
    for(let i in allSnapshots){
        const currSnapshots = allSnapshots[i];
        currSnapshots.forEach((snap,index)=>{
            const wrap = uiFactory.createElement({
                classList: 'inventory-window-itemWrapper',
                parent: objWrapper
            });
    
            uiFactory.createElement({
                classList: 'inventory-window-objName',
                innerHTML: snap._name,
                parent: wrap
            });
            
            const body = uiFactory.createElement({
                classList: 'inventory-window-body',
                innerHTML: `Category: ${snap._category}
                Name: ${snap._name}
                Time: ${snap._time}`,
                parent: wrap
            });
    
            body.style.cursor = 'pointer';
            
            body.onclick = () => {
                Engine.SnapshotManager.resetObjectToSnapshot(i,index);
                closeInventoryWindow();
            };
        });
    }
}

function showClipboard(objWrapper){
    objWrapper.innerHTML = '';
    const clipboardObjs = Engine.ClipboardManager.getCollection();
    checkAndAddEmpty(objWrapper,clipboardObjs);
    clipboardObjs.reverse();
    clipboardObjs.forEach((item,index)=>{
        const wrap = uiFactory.createElement({
            classList: 'inventory-window-itemWrapper',
            parent: objWrapper
        });

        uiFactory.createElement({
            classList: 'inventory-window-objName',
            innerHTML: item._name,
            parent: wrap
        });
        

        const body = uiFactory.createElement({
            classList: 'inventory-window-body',
            innerHTML: `Category: ${item._category}
            Name: ${item._name}
            Time: ${item._time}`,
            parent: wrap
        });

        body.style.cursor = 'pointer';
        
        body.onclick = () => {
            Engine.ClipboardManager.paste((clipboardObjs.length -  1) - index);
            closeInventoryWindow();
        };

    });
}

function showObjects(objWrapper){
    objWrapper.innerHTML = '';
    const items = Engine.ObjectManager.objects;

    objWrapper = uiFactory.createElement({
        classList: 'inventory-window-body-grid',
        parent: objWrapper
    });

    for(let i in items){
        const item = items[i];
        const wrap = uiFactory.createElement({
            classList: 'inventory-window-itemWrapper',
            parent: objWrapper
        });

        uiFactory.createElement({
            classList: 'inventory-window-objName',
            innerHTML: item.name,
            parent: wrap
        });
        

        const body = uiFactory.createElement({
            classList: 'inventory-window-body',
            parent: wrap
        });

        if(item.renderer === 'dom'){
            const newItem = item.getObject().cloneNode(true);
            body.appendChild(newItem);
            const oldCSS = document.defaultView.getComputedStyle(item.getObject(), "");
            newItem.id = newItem.id+'_objectMenu_inventory';
            newItem.style.color = oldCSS.getPropertyValue('color');
            newItem.classList = '';
            newItem.style.top = '';
            newItem.style.left = '';
            newItem.style.position = '';
            newItem.style.transform = 'rotate(0)';

        }else if(item.renderer === '454'){
            const pos = item.getPositional();
            if(item._film){
                const info = item._getFilm(item._film);
                const box = info.getFrameBox(item._frame);
                const img = info.bitmap;
                const canv = uiFactory.createElement({
                    type: 'canvas',
                    id: item.id+'_objectMenu_inventory',
                    parent: body
                });
                canv.style.width = '100%';
                canv.style.height = '100%';
                const ctx = canv.getContext('2d');
                const x = canv.width/2 - pos.width/2;
                const y = canv.height/2 - pos.height/2;
                ctx.drawImage(bb.fastGet('assets',img),
                box.x,box.y,box.width,box.height,
                x, y, pos.width, pos.height);
            }
        }else {
            body.innerHTML = 'Preview for '+item.name+' isn\'t possible';
        }

    }

}


const animatorsForPreview = [];

function removeAllAnimators(){
    animatorsForPreview.forEach((an)=>an());
}

function createPopUp(film){
    const wrap = document.createElement('div');
    wrap.id = 'animationWorkshopCreateWrapper';
    document.body.appendChild(wrap);

    const popUpCloseBack = document.createElement('div');
    popUpCloseBack.id = 'animationWorkshopCreate_popup_close_back';
    wrap.appendChild(popUpCloseBack);

    const popUp = document.createElement('div');
    popUp.id = 'animationWorkshopCreate_popup';
    wrap.appendChild(popUp);

    const toolbar = document.createElement('div');
    toolbar.id = 'animationWorkshopCreate_popup_toolbar';
    toolbar.innerHTML = 'Animation Workshop';
    popUp.appendChild(toolbar);

    const popUpClose = document.createElement('div');
    popUpClose.id = 'animationWorkshopCreate_popup_close';
    popUpClose.innerHTML = 'X';
    toolbar.appendChild(popUpClose);

    const mainArea = document.createElement('div');
    mainArea.id = 'animationWorkshopCreate_popup_mainarea';
    popUp.appendChild(mainArea);

    const mainAreaCanvas = document.createElement('canvas');
    mainAreaCanvas.id = 'animationWorkshopCreate_popup_mainarea_canvas';
    mainArea.appendChild(mainAreaCanvas);

    const filmArea = document.createElement('div');
    filmArea.id = 'animationWorkshopCreate_popup_filmarea';
    popUp.appendChild(filmArea);

    
    for(let i = 0; i < film.totalFrames; ++i){
        const box = film.getFrameBox(i);
        const preview = document.createElement('canvas');
        const width = filmArea.offsetWidth-2;
        preview.style.width = width;
        preview.style.height = width;
        preview.classList = 'animationWorkshopCreate_popup_filmarea_box';
        const previewCtx = preview.getContext('2d');
        previewCtx.canvas.width = width;
        previewCtx.canvas.height = width;
        previewCtx.drawImage(bb.fastGet('assets',film.bitmap),
        box.x,box.y,box.width,box.height,
        0, 0, width*(box.width/box.height), width);


        filmArea.appendChild(preview);
    }




    const editArea = document.createElement('div');
    editArea.id = 'animationWorkshopCreate_popup_editarea';
    popUp.appendChild(editArea);

    const delayWrapper = document.createElement('div');
    delayWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(delayWrapper);

    const delaySliderPrompt = document.createElement('div');
    delaySliderPrompt.innerHTML = 'Delay: ';
    delaySliderPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    delayWrapper.appendChild(delaySliderPrompt);

    const delaySlider = document.createElement('input');
    delaySlider.type = 'range';
    delaySlider.id = 'animationWorkshopCreate_popup_editarea_delaySlider';
    delaySlider.min = '20';
    delaySlider.max = '200';
    delaySlider.step = '1';
    delaySlider.value = '90';
    delaySlider.classList += 'animationWorkshopCreate_popup_editarea_value';
    delayWrapper.appendChild(delaySlider);

    const dxWrapper = document.createElement('div');
    dxWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(dxWrapper);

    const dxPrompt = document.createElement('div');
    dxPrompt.innerHTML = 'Dx: ';
    dxPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    dxWrapper.appendChild(dxPrompt);

    const dxInput = document.createElement('input');
    dxInput.type = 'number';
    dxInput.min = '-50';
    dxInput.max = '50';
    dxInput.step = '1';
    dxInput.value = '0';
    dxWrapper.appendChild(dxInput);    
    
    const dyWrapper = document.createElement('div');
    dyWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(dyWrapper);

    const dyPrompt = document.createElement('div');
    dyPrompt.innerHTML = 'Dy: ';
    dyPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    dyWrapper.appendChild(dyPrompt);

    const dyInput = document.createElement('input');
    dyInput.type = 'number';
    dyInput.min = '-50';
    dyInput.max = '50';
    dyInput.step = '1';
    dyInput.value = '0';
    dyWrapper.appendChild(dyInput);

    const repsWrapper = document.createElement('div');
    repsWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(repsWrapper);

    const repsPrompt = document.createElement('div');
    repsPrompt.innerHTML = 'Repetitions: ';
    repsPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    repsWrapper.appendChild(repsPrompt);

    const repsInput = document.createElement('input');
    repsInput.type = 'number';
    repsInput.min = '-1';
    repsInput.max = '100';
    repsInput.step = '1';
    repsInput.value = '-1';
    repsWrapper.appendChild(repsInput);

    const idWrapper = document.createElement('div');
    idWrapper.classList += 'animationWorkshopCreate_popup_editarea_wrap';
    editArea.appendChild(idWrapper);

    const idPrompt = document.createElement('div');
    idPrompt.innerHTML = 'Animation ID: ';
    idPrompt.classList += 'animationWorkshopCreate_popup_editarea_prompt';
    idWrapper.appendChild(idPrompt);

    const idInput = document.createElement('input');
    idInput.type = 'text';
    idInput.classList = 'animationWorkshopCreate_popup_editarea_value';
    idInput.placeholder = 'my animation';
    idWrapper.appendChild(idInput);

    const startAnim = document.createElement('div');
    startAnim.id = 'animationWorkshopCreate_popup_editarea_play';
    startAnim.innerHTML = 'Reset Position';
    editArea.appendChild(startAnim);

    const createAnim = document.createElement('div');
    createAnim.id = 'animationWorkshopCreate_popup_editarea_create';
    createAnim.innerHTML = 'Create Animation';
    editArea.appendChild(createAnim);

    let animator = new FRAnimator();
    let animation = new FRAnimation({
        id: '_prevCreate',
        start: 0,
        end: film.totalFrames - 1,
        dx: 0,
        dy: 0,
        reps: -1,
        delay: 90
    });
    const ctx = mainAreaCanvas.getContext('2d');
    ctx.width = mainAreaCanvas.width;
    ctx.height = mainAreaCanvas.height;
    let firstBox = film.getFrameBox(0);
    let currPos = {
        x:(mainAreaCanvas.width/2) - ((firstBox.width/firstBox.height)*(mainAreaCanvas.height/3)/2),
        y:(mainAreaCanvas.height/2) - ((mainAreaCanvas.height/3)/2)
    };

    animator.onAction = (th)=>{
        firstBox = film.getFrameBox(th.currentFrame);
        currPos.x += th.animation.dx;
        currPos.y += th.animation.dy;
        if(currPos.x > mainAreaCanvas.width)
            currPos.x = -firstBox.width;
        else if(currPos.x + firstBox.width < 0)
            currPos.x = mainAreaCanvas.width-firstBox.width;
        if(currPos.y > mainAreaCanvas.height)
            currPos.y = -firstBox.height;
        else if(currPos.y + firstBox.height < 0)
            currPos.y = mainAreaCanvas.height-firstBox.height;
        ctx.clearRect(0,0,mainAreaCanvas.width,mainAreaCanvas.height);
        ctx.drawImage(bb.fastGet('assets',film.bitmap),
            firstBox.x,firstBox.y,firstBox.width,firstBox.height,
            currPos.x ,
            currPos.y ,
            (firstBox.width/firstBox.height)*(mainAreaCanvas.height/3),
            (mainAreaCanvas.height/3)
        )
    };
    // anim.height*(firstBox.width/firstBox.height), anim.height
    animator.start({
        animation: animation,
        timestamp: bb.fastGet('state','gameTime'),
    });

    function destroyPopUP(){
        animator.stop();
        wrap.remove();
    }

    function restartAnimation(){
        if(!animator.hasFinished())animator.stop();
        animation = new FRAnimation({
            id: '_prevCreate',
            start: 0,
            end: film.totalFrames - 1,
            dx: Number.parseInt(dxInput.value),
            dy: Number.parseInt(dyInput.value),
            reps: Number.parseInt(repsInput.value),
            delay: Number.parseInt(delaySlider.value)
        });
        animator.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        });
    }

    function saveAnimation(){
        if(idInput.value !== ""){
            Engine.AnimationManager.registerNewAnimation(new FRAnimation({
                id: idInput.value,
                start: 0,
                end: film.totalFrames - 1,
                dx: Number.parseInt(dxInput.value),
                dy: Number.parseInt(dyInput.value),
                reps: Number.parseInt(repsInput.value),
                delay: Number.parseInt(delaySlider.value)
            }),film.id);
            destroyPopUP();
        }
    }

    dxInput.addEventListener('change',restartAnimation);
    dyInput.addEventListener('change',restartAnimation);
    repsInput.addEventListener('change',restartAnimation);
    delaySlider.addEventListener('change',restartAnimation);
    startAnim.addEventListener('click',()=>{
        currPos = {
            x:(mainAreaCanvas.width/2) - ((firstBox.width/firstBox.height)*(mainAreaCanvas.height/3)/2),
            y:(mainAreaCanvas.height/2) - ((mainAreaCanvas.height/3)/2)
        };
    });
    createAnim.addEventListener('click',saveAnimation);
    popUpClose.addEventListener('click',destroyPopUP);
    popUpCloseBack.addEventListener('click',destroyPopUP);

}

function showFilms(objWrapper){
    const items = Engine.AnimationManager.getAllFilms();
    objWrapper.innerHTML = '';

    const pageSwapWrap = uiFactory.createElement({
        parent: objWrapper,
        classList: 'inventory-window-body-page-swap'
    });

    objWrapper = uiFactory.createElement({
        classList: 'inventory-window-body-grid',
        parent: objWrapper
    });

    const itemsPerPage = 24;

    const keys = Object.keys(items);
    const pages = Math.ceil((keys.length-1) / itemsPerPage);
    let currPage = 1;

    
    function currFilmsShowing(){
        
        const starting = (currPage - 1) * itemsPerPage;
        let ending = (currPage) * itemsPerPage;
        if(ending > (keys.length)) ending = keys.length;
        pageSwapWrap.innerHTML = '';
        for(let i = 1; i <= pages; ++i){
            uiFactory.createElement({
                parent: pageSwapWrap,
                classList: 'inventory-window-body-page-item' + 
                ((Number.parseInt(currPage) === i)?
                    ' inventory-window-body-page-item-current':
                    ''),
                innerHTML: i
            }).onclick = (ev) => {
                objWrapper.innerHTML = '';
                currPage = ev.target.innerHTML;
                removeAllAnimators();
                currFilmsShowing();
            };
        }

        for(let j = starting; j < ending; ++j){
            const i = keys[j];
            const wrap = uiFactory.createElement({
                classList: 'inventory-window-animationPreview_itemWrapper',
                parent: objWrapper
            });
            const popuplistener = wrap.addEventListener('click',()=>{
                createPopUp(items[i]);
            });
    
            uiFactory.createElement({
                classList: 'inventory-window-animationPreview_objName',
                innerHTML: i,
                parent: wrap
            });
    
            const body = uiFactory.createElement({
                classList: 'inventory-window-animationPreview_body',
                parent: wrap
            });
    
            const anim = uiFactory.createElement({
                type: 'canvas',
                classList: 'inventory-window-animationPreview_film',
                parent: body
            });
            const ctx = anim.getContext('2d');
            
            const animator = new FRAnimator();
            const animation = new FRAnimation({
                id: '_prev_'+i,
                start: 0,
                end: items[i].totalFrames - 1,
                reps: -1,
                delay: 100
            });
    
            animator.onAction = (th)=>{
                const firstBox = items[i].getFrameBox(th.currentFrame);
                ctx.clearRect(0,0,anim.width,anim.height);
                ctx.drawImage(bb.fastGet('assets',items[i].bitmap),
                    firstBox.x,firstBox.y,firstBox.width,firstBox.height,
                    0,0,anim.height*(firstBox.width/firstBox.height), anim.height);
            };
    
            
        
            animator.start({
                animation: animation,
                timestamp: bb.fastGet('state','gameTime'),
            });
    
    
            animatorsForPreview.push(()=>{
                animator.stop();
                wrap.removeEventListener('click',popuplistener);
            });
        }
    }

    currFilmsShowing();
}