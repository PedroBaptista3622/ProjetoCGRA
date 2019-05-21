class MyHouse extends CGFobject {
    constructor(scene, xCoord, zCoord, pillarTex, wallTex, roofTex, doorTex, windowTex)
    {        
        super(scene);       
        this.x = xCoord;
        this.z = zCoord; 
        this.pillarTex = pillarTex;
        this.wallTex = wallTex;
        this.roofTex = roofTex;

        //Roof
        this.roof1 = new CGFappearance(this.scene);
        this.roof1.setAmbient(0, 0, 0, 1);
        this.roof1.setDiffuse(0.8, 0.8, 0.8, 1);
        this.roof1.setSpecular(0.002, 0.002, 0.002, 1);
        this.roof1.setShininess(10.0);
        this.roof1.setTextureWrap('REPEAT', 'REPEAT');

        //Roof Texture
        this.roofTex = new CGFtexture(this.scene, roofTex);
    

        //Wall
        //Wall (Sides)
        this.wall = new CGFappearance(this.scene);
        this.wall.setAmbient(0, 0, 0, 1.0);
        this.wall.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.wall.setSpecular(0.002, 0.002, 0.002, 1.0);
        this.wall.setShininess(10.0);
        this.wall.setTextureWrap('REPEAT', 'REPEAT');

        //Wall (Top)
        this.wall1 = new CGFappearance(this.scene);
        this.wall1.setAmbient(0, 0, 0, 1.0);
        this.wall1.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.wall1.setSpecular(0, 0, 0, 1.0);
        this.wall1.setShininess(10.0);
        this.wall1.setTextureWrap('REPEAT', 'REPEAT');

        //Wall (Bottom)
        this.wall2 = new CGFappearance(this.scene);
        this.wall2.setAmbient(0, 0, 0, 1.0);
        this.wall2.setDiffuse(0, 0, 0, 1.0);
        this.wall2.setSpecular(0, 0, 0, 1.0);
        this.wall2.setShininess(10.0);
        this.wall2.setTextureWrap('REPEAT', 'REPEAT');
        

        //Pillar
        this.pillar = new CGFappearance(this.scene);
        this.pillar.setAmbient(0, 0, 0, 1.0);
        this.pillar.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.pillar.setSpecular(0.02, 0.02, 0.02, 1.0);
        this.pillar.setShininess(10.0);
        this.pillar.setTextureWrap('REPEAT', 'REPEAT');

        //Pillar Texture
        this.pillarTex = new CGFtexture(this.scene, pillarTex);
        

        //Door
        this.doorM = new CGFappearance(this.scene);
        this.doorM.setAmbient(0, 0, 0, 1.0);
        this.doorM.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.doorM.setSpecular(1, 1, 1, 1.0);
        this.doorM.setShininess(10.0);
        this.doorM.setTextureWrap('REPEAT', 'REPEAT');

        //Door Texture
        this.doorTex = new CGFtexture(this.scene, doorTex);


        //Window
        this.windowM = new CGFappearance(this.scene);
        this.windowM.setAmbient(0, 0, 0, 1.0);
        this.windowM.setDiffuse(0.5, 0.5, 0.5, 1.0);
        this.windowM.setSpecular(1, 1, 1, 1.0);
        this.windowM.setShininess(10.0);
        this.windowM.setTextureWrap('REPEAT', 'REPEAT');

        //Window Texture
        this.windowTex = new CGFtexture(this.scene, windowTex);

        this.cube = new MyUnitCubeQuad(scene, this.wallTex, this.wallTex, this.wallTex, this.wall2, this.wall, this.wall1);
        this.roof = new MyPyramid(scene, 4, 1);
        this.prism = new MyPrism(scene, 10, 1);
        this.roof2 = new MyPyramid(scene, 3, 1);
        this.door = new MyQuad(scene);
    }

    display() {
        
        //-----------------------------------------------------
        
        // Cubo
        this.scene.pushMatrix();
        this.scene.translate(this.x, 0, this.z);
        this.scene.scale(6, 3, 3);
        this.scene.translate(0 , 0.5, 0);
        this.cube.display();
        this.scene.popMatrix();

        // Telhado 1
        this.scene.pushMatrix();
        this.roof1.apply();

        if(this.scene.displayTextures)
            this.roof1.setTexture(this.roofTex);
        else
            this.roof1.setTexture();

        this.scene.translate(this.x, 3, this.z);
        this.scene.scale(6, 2.5, 3.5);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.roof.display();
        this.scene.popMatrix();

        // Coluna 1
        this.scene.pushMatrix();
        this.pillar.apply();
        if(this.scene.displayTextures)
            this.pillar.setTexture(this.pillarTex);
        else
            this.pillar.setTexture();
            
        this.scene.translate(3.5+this.x, 0, 2+this.z);
        this.scene.scale(0.25, 3, 0.25);
        this.prism.display();
        this.scene.popMatrix();

        // Coluna 2
        this.scene.pushMatrix();
        this.scene.translate(3.5+this.x, 0, -2+this.z);
        this.scene.scale(0.25, 3, 0.25);
        this.prism.display();
        this.scene.popMatrix();

        // Coluna 3
        this.scene.pushMatrix();
        this.scene.translate(-3.5+this.x, 0, 2+this.z);
        this.scene.scale(0.25, 3, 0.25);
        this.prism.display();
        this.scene.popMatrix();

        // Coluna 4
        this.scene.pushMatrix();
        this.scene.translate(-3.5+this.x, 0, -2+this.z);
        this.scene.scale(0.25, 3, 0.25);
        this.prism.display();
        this.scene.popMatrix();

        //Door
        this.scene.pushMatrix();
        this.doorM.apply();

        if(this.scene.displayTextures)
            this.doorM.setTexture(this.doorTex);
        else
            this.doorM.setTexture();

        this.scene.translate(this.x, 1, this.z + 1.51);
        this.scene.scale(3.2, 2, 1);
        this.door.display();
        this.scene.popMatrix();


        //Window
        this.scene.pushMatrix();
        this.windowM.apply();

        if(this.scene.displayTextures)
            this.windowM.setTexture(this.windowTex);
        else
            this.windowM.setTexture();

        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.translate(this.x, 1.75, this.z + 3.01);
        this.scene.scale(1.5, 1.75, 1);
        this.door.display();
        this.scene.popMatrix();
        

        //--------------------------------

    }

    updateBuffers(){}
}