class MyNest extends CGFobject{
    constructor(scene)
    {        
        super(scene);

        this.semiSphere = new MySemiSphere(this.scene, 20, 1);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(1, 1, 1, 1.0);
        this.appearance.setShininess(120);
        //this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setTexture(this.texture);
        
    }

    display() 
    {        
        this.scene.pushMatrix();
            this.appearance.apply();
            this.scene.translate(0, 1, 0);
            this.scene.scale(1.8, 0.5, 1.8);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.semiSphere.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
            this.appearance.apply();
            this.scene.translate(0, 1, 0);
            this.scene.scale(1.8, 1, 1.8);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.semiSphere.display();
        this.scene.popMatrix();   
    }

    

    updateBuffers(){}
}