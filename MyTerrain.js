class MyTerrain extends CGFobject{
    constructor(scene)
    {        
        super(scene);

        this.plane = new Plane(this.scene);

      
        this.mapMat = new CGFappearance(this.scene);
        this.mapMat.setAmbient(1, 1, 1, 1.0);
        this.mapMat.setDiffuse(1, 1, 1, 1.0);
        this.mapMat.setSpecular(1, 1, 1, 1.0);
        this.mapMat.setShininess(10.0);
        this.mapMat.setTextureWrap('REPEAT', 'REPEAT');

        this.dayTexture_Map = new CGFtexture(this.scene, dayTextureFileName);

        this.sideDimension = sideDimension;
    }

    display() 
    {
        this.scene.pushMatrix();
        this.mapMat.apply();
        this.mapMat.setTexture(this.dayTexture_Map);
        //this.scene.scale(-this.sideDimension, -this.sideDimension, -this.sideDimension);
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.plane.display(); 
        this.scene.popMatrix();
    }

    updateBuffers(){}
}