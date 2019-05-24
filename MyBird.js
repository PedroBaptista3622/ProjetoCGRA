class MyBird extends CGFobject {
    constructor(scene, xCoord, yCoord, zCoord)
    {        
        super(scene);       
        this.x = xCoord;
        this.y = yCoord;
        this.z = zCoord;

        this.speed = 0;
        this.orientation = 0;

        this.semiSphere = new MySemiSphere(scene, 20, 1);
        this.quad = new MyQuad(scene);
        this.triangle = new MyTriangleSmall(scene);
        this.cone = new MyCone(scene, 20, 1);

        this.height;
        this.ang;
    }

    update(t, deltaT)
    {
        if(t > 0)
        {
            this.height = Math.sin(t/300);
            this.ang = Math.sin(t/300);
        }

        //this.scene.rotate(this.orientation, 0, 1, 0);
    }
    
    display() {
        
        //-----------------------------------------------------
        
        this.update();
        this.accelarate();

        this.scene.pushMatrix();
            this.scene.translate(this.x, this.height + this.y, this.z);
            this.scene.rotate(this.orientation, 0, 1, 0);
            
            
            // Cabeca
            this.scene.pushMatrix();
                this.scene.translate(0, 0.5, 2);
                this.semiSphere.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0, 0.5, 2);
                this.scene.scale(1, 1, -1);
                this.semiSphere.display();
            this.scene.popMatrix();


            // Tronco
            this.scene.pushMatrix();
                this.scene.scale(1, 1, 2);
                this.semiSphere.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.scale(1, 1, -2);
                this.semiSphere.display();
            this.scene.popMatrix();


            // Asa esquerda
            this.scene.pushMatrix();

                this.scene.translate(0.75, 0, 0);
                this.scene.rotate(-Math.PI/((1.5+this.ang)*3), 0, 0, 1);
                this.scene.rotate(Math.PI/3, 0, 0, 1);
                this.scene.translate(-0.75, 0, 0);
                
                this.scene.pushMatrix();
                    this.scene.translate(0.75, 0, 0);
                    this.scene.scale(1.5, 1, 1.5);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.quad.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(2.25, 0, 0);
                    this.scene.scale(1.3, 1, 1.05);
                    this.scene.rotate(-Math.PI/6, 0, 0, 1);
                    this.scene.translate(Math.sqrt(2)/2, 0, 0);
                    this.scene.rotate(Math.PI/4, 0, 1, 0);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.triangle.display();
                this.scene.popMatrix();

            this.scene.popMatrix();


            // Asa direita
            this.scene.pushMatrix();
            
                this.scene.translate(-0.75, 0, 0);
                this.scene.rotate(Math.PI/((1.5+this.ang)*3), 0, 0, 1);
                this.scene.rotate(-Math.PI/3, 0, 0, 1);
                this.scene.translate( 0.75, 0, 0);
                
                this.scene.pushMatrix();
                    this.scene.translate(-2.25, 0, 0);
                    this.scene.scale(1.5, 1, 1.5);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.quad.display();
                this.scene.popMatrix(); 
                
                this.scene.pushMatrix();
                    this.scene.translate(-2.25, 0, 0);
                    this.scene.scale(1.3, 1, 1.05);
                    this.scene.rotate(Math.PI/6, 0, 0, 1);
                    this.scene.translate(-Math.sqrt(2)/2, 0, 0);
                    this.scene.rotate(-Math.PI/4, 0, 1, 0);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.triangle.display();
                this.scene.popMatrix();
            this.scene.popMatrix();


            // Bico
            this.scene.pushMatrix();
                this.scene.translate(0, 0.3, 2.6);
                this.scene.scale(0.5, 0.5, 1.2);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.cone.display();
            this.scene.popMatrix();


            // Cauda
            this.scene.pushMatrix();
                this.scene.translate(-0.5, 0, -2.5);
                this.scene.rotate(Math.PI/1.6, 0, 1, 0);
                this.scene.rotate(Math.PI, 0, 0, 1);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.triangle.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
                this.scene.translate(0.5, 0, -2.5);
                this.scene.rotate(-Math.PI/1.6, 0, 1, 0);
                this.scene.rotate(Math.PI, 0, 0, 1);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.triangle.display();
            this.scene.popMatrix();

        this.scene.popMatrix();
        

        //--------------------------------

    }


    turn(v)
    {
        
    }


    accelarate(v)
    {
        this.x += this.speed * Math.sin(this.orientation);
        this.z += this.speed * Math.cos(this.orientation);
    }


    updateBuffers(){}
}