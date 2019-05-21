/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices+1; i++){

            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));  
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.texCoords.push(i/(this.slices+1), 0);
            this.texCoords.push(i/(this.slices+1), 1);
            ang+=alphaAng;
        }

        for(var i = 0; i < this.slices+1; i++){
            if(i != this.slices) {
                this.indices.push(2*i+1, (2*i), (2*i+2));
                this.indices.push(2*i+2, (2*i+3), (2*i+1));
            }
            else {
                this.indices.push(0, 2*this.slices, 2*this.slices-1);
                this.indices.push(2*this.slices, 0, 1);
            }
        }
        
        /*ang = 0;

        for(var i = this.slices; i < 2*this.slices; i++){

            this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
            if(i == 2*this.slices-1)
                this.indices.push(0,this.slices,2*this.slices-1);
            else
                this.indices.push( ((i+1) % (2*this.slices)) , i, (((i+1) % (this.slices))) ); //11, 0, 6

            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.texCoords.push(i/(this.slices-1), 0);
            ang+=alphaAng;
        }*/

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


