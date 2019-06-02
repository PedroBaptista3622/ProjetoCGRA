class MyLeaf extends CGFobject {
    constructor(scene)
    {        
        super(scene);

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(0.0, 0.6, 0.1, 1);
        this.material.setDiffuse(0.0, 0.6, 0.0, 1);
        this.material.setSpecular(0.0, 0.6, 0.0, 1);
        this.material.setShininess(10.0);
        this.texture = new CGFtexture(this.scene, "images/leaves.jpg");
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setTexture(this.texture);

        this.triangle = new MyTriangle(this.scene);
    }

    display() {
        
        //-----------------------------------------------------
        
        // Cubo
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.triangle.display();
        this.scene.popMatrix();

        //--------------------------------

    }

    updateBuffers(){}
}