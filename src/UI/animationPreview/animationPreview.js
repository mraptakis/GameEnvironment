import bb from '../../utils/blackboard.js'
import blackboard from '../../utils/blackboard.js';

function readTextFile(file,onFinish){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.body.insertAdjacentHTML('beforeend',allText);
                convertHTMLtoObjects();
                onFinish();
            }
        }
    }
    rawFile.send(null);
}
readTextFile('./src/UI/animationPreview/animationPreview.ahtml', onAnimationPreviewLoaded);

function convertHTMLtoObjects(){
    let children = [ ...document.body.children ];
    children.map(child => {
        if(child.attributes.getNamedItem("category")){
            let objCat = bb.fastGet('objects',child.attributes["category"].nodeValue);
            document.body.removeChild(child);
            let obj = new objCat({name:child.id,div:child});
            bb.fastSet('liveObjects',child.id,obj);
            obj.add();
        }
    })
}

const FRAnimator = bb.fastGet('gameEngine','FrameRangeAnimator');
const FRAnimation = bb.fastGet('gameEngine','FrameRangeAnimation');

let animatorsForPreview = [];

function showAnimations(){
    let items = bb.fastGet('gameEngine','animationFilmHolder')._films;

    let objWrapper = document.getElementById('animationPreviewWrapper');
    objWrapper.innerHTML = '';
    for(let i in items){
        let wrap = document.createElement('div');
        wrap.classList += 'animationPreview_itemWrapper';
        objWrapper.appendChild(wrap);

        let title = document.createElement('div');
        title.classList += 'animationPreview_objName';
        title.innerHTML = i;
        wrap.appendChild(title);
        

        let body = document.createElement('div');
        body.classList += 'animationPreview_body';

        let anim = document.createElement('canvas');
        anim.classList += 'animationPreview_film';
        let ctx = anim.getContext('2d');

        // console.log(items[i])
        
        let animator = new FRAnimator();
        let animation = new FRAnimation({
            id: '_prev_'+i,
            start: 0,
            end: items[i].totalFrames - 1,
            reps: -1,
            delay: 100
        })

        animatorsForPreview.push(animator);

        animator.onAction = (th)=>{
            let firstBox = items[i].getFrameBox(th.currentFrame);
            ctx.clearRect(0,0,anim.width,anim.height);
            ctx.drawImage(bb.fastGet('assets',items[i].bitmap),
                firstBox.x,firstBox.y,firstBox.width,firstBox.height,
                (anim.width/2) - (firstBox.width*5/2),(anim.height/2) - (firstBox.height*5/2),firstBox.width*5,firstBox.height*5)
        };

        
    
        animator.start({
            animation: animation,
            timestamp: bb.fastGet('state','gameTime'),
        })

        body.appendChild(anim);

        wrap.appendChild(body);

    }
}

function removeAllAnimators(){
    animatorsForPreview.forEach((an)=>an.stop());
}

function toggleAnimationPreview(){
    let wrapper = document.getElementById('animationPreviewWrapper');
    let toggleBut = document.getElementById('animationPreview_makeBig');
    if(wrapper.style.height === '200px'){
        removeAllAnimators();
        wrapper.innerHTML = '';
        wrapper.style.height = 0;
        toggleBut.style.bottom = '40px';
    }else{
        wrapper.style.height = '200px';
        toggleBut.style.bottom = '200px';
        showAnimations();
    }
}

function onAnimationPreviewLoaded(){

    let toggleBut = document.getElementById('animationPreview_makeBig');
    toggleBut.addEventListener('click',toggleAnimationPreview)
}