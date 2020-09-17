import bb from '../../../utils/blackboard.js'

import Object from '../../../objects/Object.js'

import scene from './Scene.js'
function fromPercentageToPx(x,y){
    x = x/100 * window.innerWidth;
    y = y/100 * window.innerHeight;
    return [x,y];
}
export default class ObjectThreeJS extends Object{
    material
    geometry 
    mesh

    constructor(name){
        super(name);
        this.renderer = 'threejs';

        this.values['x'] = {
            val: 0,
            onChange: (value) => {
                this.mesh.position.x = value;
            },
            getValue: () => {
                return this.mesh.position.x.toFixed(2);
            }
        }

        this.values['y'] = {
            val: 0,
            onChange: (value) => {
                this.mesh.position.y = value;
            },
            getValue: () => {
                return this.mesh.position.y.toFixed(2);
            }
        }

        this.values['z'] = {
            val: 0,
            onChange: (value) => {
                this.mesh.position.z = value;
            },
            getValue: () => {
                return this.mesh.position.z.toFixed(2);
            }
        }
        
        this.values['colour'] = {
            val: 0,
            onChange: (value) => {
                this.material.color = value;
            },
            getValue: () => {
                return "#"+this.material.color.getHexString();
            }
        }
    }

    setColor(col){
        this.material.color = new THREE.Color(col);
    }

    setPosition(x,y,z = 0){
        // [x,y] = fromPercentageToPx(x,y);
        // [x,y] = translator(x,y);
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    getPosition(){
        return this.mesh.position;
    }

    getGeometry(){
        return this.geometry;
    }

    getObject(){
        return this.mesh;
    }

    getMaterial(){
        return this.material;
    }

    move(x,y,z = 0){
        if(!this.options['isMovable'])return;
        // [x,y] = translator(x,y);
        this.mesh.position.x += x;
        this.mesh.position.y += y;
        this.mesh.position.z += z;
    }

    animate(){}

    newFrame(){
        this.triggerEvent('onEachFrame');
    }

    add(){
        scene.addItem(this.mesh);
    }

    remove(){
        console.log("removing "+this.name);
        bb.fastRemove('liveObjects',this.name);
        bb.fastSet('state','focusedObject',undefined);
        scene.getScene().remove(this.mesh);
    }

}