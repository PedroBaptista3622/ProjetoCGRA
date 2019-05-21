class MySemiSphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var alpha = 2 * Math.PI / this.slices;
        var theta = (Math.PI / 2) / this.slices;

        for (let j = 0; j <= this.slices; j++) 
        {
            for (let i = 0; i <= this.slices; i++) 
            {
                this.vertices.push(Math.cos(alpha * i) * Math.cos(theta * j), Math.sin(alpha * i) * Math.cos(theta * j), Math.sin(theta * j));
                this.normals.push(Math.cos(alpha * i) * Math.cos(theta * j), Math.sin(alpha * i) * Math.cos(theta * j), Math.sin(theta * j));
                this.texCoords.push(i * 1 / this.slices, j * 1 / this.slices);
            }
        }


        for (let i = 0; i < this.slices; i++) 
        {
            for (let j = 0; j < this.slices; j++) 
            {

                this.indices.push(i * (this.slices + 1) + j, i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);
                this.indices.push(i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);

                this.indices.push(i * (this.slices + 1) + 1 + j, i * (this.slices + 1) + j, (i + 1) * (this.slices + 1) + j);
                this.indices.push((i + 1) * (this.slices + 1) + 1 + j, i * (this.slices + 1) + 1 + j, (i + 1) * (this.slices + 1) + j);
            }
        }

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


