class MyBird extends CGFobject {
    constructor(scene, xCoord, zCoord)
    {        
        super(scene);       
        this.x = xCoord;
        this.z = zCoord;

        this.semiSphere = new MySemiSphere(scene, 20, 1);
        this.quad = new MyQuad(scene);
        this.triangle = new MyTriangleSmall(scene);
        this.cone = new MyCone(scene, 20, 1);
    }

    display() {
        
        //-----------------------------------------------------
        
        // Cabeca
        this.scene.pushMatrix();
        this.scene.translate(this.x, 3, this.z+2);
        this.semiSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 3, this.z+2);
        this.scene.scale(1, 1, -1);
        this.semiSphere.display();
        this.scene.popMatrix();


        // Tronco
        this.scene.pushMatrix();
        this.scene.translate(this.x, 2.5, this.z);
        this.scene.scale(1, 1, 2);
        this.semiSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x, 2.5, this.z);
        this.scene.scale(1, 1, -2);
        this.semiSphere.display();
        this.scene.popMatrix();


        // Asa esquerda
        this.scene.pushMatrix();
        this.scene.translate(this.x+1.5, 2.5, this.z);
        this.scene.scale(1.5, 1, 1.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.x+2.86, 2.15, this.z);
        this.scene.scale(1, 1, 1.05);
        this.scene.rotate(-Math.PI/6, 0, 0, 1);
        this.scene.rotate(Math.PI/4, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();


        // Asa direita
        this.scene.pushMatrix();
        this.scene.translate(this.x-1.5, 2.5, this.z);
        this.scene.scale(1.5, 1, 1.5);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix(); 
        
        this.scene.pushMatrix();
        this.scene.translate(this.x-2.86, 2.15, this.z);
        this.scene.scale(1, 1, 1.05);
        this.scene.rotate(Math.PI/6, 0, 0, 1);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();


        // Bico
        this.scene.pushMatrix();
        this.scene.translate(0, 2.8, 2.6);
        this.scene.scale(0.5, 0.5, 1.2);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cone.display();
        this.scene.popMatrix();


        // Cauda
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 2.5, -2.5);
        this.scene.rotate(Math.PI/1.6, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 2.5, -2.5);
        this.scene.rotate(-Math.PI/1.6, 0, 1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();
        

        //--------------------------------

    }

    updateBuffers(){}
}