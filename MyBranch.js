class MyBranch extends CGFobject {
    constructor(scene)
    {        
        super(scene);

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.setDiffuse(1, 1, 1, 1.0);
        this.material.setSpecular(1, 1, 1, 1.0);
        this.material.setShininess(120);
        this.texture = new CGFtexture(this.scene, "images/wood.jpg");
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setTexture(this.texture);

        this.cylinder = new MyCylinder(this.scene, 4, 1);

    }

    display() {
        
        //-----------------------------------------------------
        
        // Cubo
        this.scene.pushMatrix();
        this.material.apply();
        this.scene.scale(0.3,1,0.3);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.cylinder.display();
        this.scene.popMatrix();

        //--------------------------------

    }

    updateBuffers(){}
}