class MyTreeBranch extends CGFobject{
    constructor(scene)
    {        
        super(scene);

        this.cylinder = new MyCylinder(this.scene, 10, 1);

        this.x = (Math.random()-0.5) * 10;
        this.z = (Math.random()-0.5) * 10;
        this.rotation = (Math.random() * 2 * Math.PI);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(1, 1, 1, 1.0);
        this.appearance.setShininess(120);
        //this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        //this.appearance.setTexture(this.texture);

    }

    display() 
    {        
        this.scene.pushMatrix();
            this.appearance.apply();
            this.scene.translate(this.x, 0, this.z);
            this.scene.rotate(this.rotation, 0, 1, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.scale(0.05, 1, 0.05);
            //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.cylinder.display();
        this.scene.popMatrix();    
    }

    updateBuffers(){}
}