import Object from './ObjectThreeJS.js'

import bb from '../../../utils/blackboard.js'

class Camera extends Object {
    camera
    vect
    constructor(){
        super("camera");
        this.camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.5, 1000 );
        this.camera.position.z = 1;
        // var w = window.innerWidth;
        // var h =  window.innerHeight;
        // var fullWidth = w * 3;
        // var fullHeight = h;
        // this.camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
        this.isMovable = false;
        this.vect = new THREE.Vector3;
    }

    setColor(col){
        alert("Can't change color of camera");
    }

    getCamera(){
        return this.camera;
    }

    animate(){
        let obj = bb.fastGet('liveObjects','BOOOOOX');
        this.vect.setFromMatrixPosition(obj.getGoal().matrixWorld);
        this.camera.position.lerp(this.vect, 0.1);
        this.camera.lookAt(obj.getObject().position);
    }

}

const cameraObj = new Camera();

export default cameraObj;

bb.fastSet('liveObjects','camera',cameraObj);