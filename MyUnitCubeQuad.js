class MyUnitCubeQuad extends CGFobject{
    constructor(scene, bottomTex, sideTex, topTex , bottomM, sideM, topM)
    {        
        super(scene);

        this.wallTop = new CGFtexture(this.scene, topTex);
        this.wallSide = new CGFtexture(this.scene, sideTex);
        this.wallBottom = new CGFtexture(this.scene, bottomTex);

        this.quad1 = new MyQuad(scene, 1, 1);

        this.wall = sideM;
        this.wall1 = topM;
        this.wall2 = bottomM;
    }

    display() {
        
        //-----------------------------------------------------

        this.scene.pushMatrix();

            //this.scene.translate(-0.5, 0, 0);

            this.scene.pushMatrix();
            this.wall.apply();

            this.wall.setTexture(this.wallSide);

            this.scene.translate(-0.5, 0, 0.5);
            //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad1.display();
            this.scene.popMatrix();



            this.scene.pushMatrix();
            this.scene.translate(0.5, 0, 0);
            this.scene.rotate(Math.PI/2, 0, 1, 0);
            this.scene.translate(-0.5, 0, 0);
            this.quad1.display();
            this.scene.popMatrix();



            this.scene.pushMatrix();
            this.scene.translate(-0.5, 0, 0)
            this.scene.rotate(-Math.PI/2, 0, 1, 0);
            this.scene.translate(-0.5, 0, 0);
            this.quad1.display();
            this.scene.popMatrix();



            this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.translate(-0.5, 0, 0);
            this.quad1.display();
            this.scene.popMatrix();


            //----------------


            this.scene.pushMatrix();
            this.wall1.apply();

            this.wall1.setTexture(this.wallTop);

            this.scene.translate(0, 0.5, 0);
            this.scene.rotate(-Math.PI/2, 1, 0, 0);
            this.scene.translate(-0.5, 0, 0);
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad1.display();
            this.scene.popMatrix();


            //----------------


            this.scene.pushMatrix();
            this.wall2.apply();

            this.wall2.setTexture(this.wallBottom);

            this.scene.translate(0, -0.5, 0);
            this.scene.rotate(Math.PI/2, 1, 0, 0);
            this.scene.translate(-0.5, 0, 0);
            this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
            this.quad1.display();
            this.scene.popMatrix();


        this.scene.popMatrix();

        //--------------------------------

    }

    updateBuffers(){}
}