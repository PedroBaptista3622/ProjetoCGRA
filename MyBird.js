class MyBird extends CGFobject {
    constructor(scene, xCoord, yCoord, zCoord)
    {        
        super(scene);       

        this.xi = xCoord;
        this.yi = yCoord;
        this.zi = zCoord;

        this.x = xCoord;
        this.y = yCoord;
        this.z = zCoord;

        this.speed = 0.1;
        this.orientation = 0;

        this.semiSphere = new MySemiSphere(scene, 20, 1);
        this.quad = new MyQuad(scene, 1, 1);
        this.triangle = new MyTriangleSmall(scene);
        this.cone = new MyCone(scene, 20, 1);

        this.height;
        this.ang;
    }

    update(t)
    {
        this.timeFactor = t/500*Math.PI;
        if(t > 0)
        {
            this.height = Math.sin(this.timeFactor);
            //if(this.speed == 0)
                //this.ang = Math.sin(t/500*Math.PI);
            //else
                //this.ang = Math.sin(t/(500*(1/this.speed*65)));
        }

        this.z += this.speed * Math.cos(this.orientation);
        this.x += this.speed * Math.sin(this.orientation);
    }
    
    display() {
        
        //-----------------------------------------------------
        
        //this.update();
        //this.accelarate(this.speed);


        this.scene.pushMatrix();
            this.scene.translate(this.x, this.height + this.y, this.z);
            //this.turn(this.speed);
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
                this.scene.rotate(-Math.PI / 3 * Math.sin(this.timeFactor * (0.5 + this.speed)), 0, 0, 1);
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
                this.scene.rotate(Math.PI / 3 * Math.sin(this.timeFactor * (0.5 + this.speed)), 0, 0, 1);
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
        this.orientation += v;
    }

    accelerate(v)
    {
        this.speed += v;
    }

    reset()
    {
        this.x = this.xi;
        this.y = this.yi;
        this.z = this.zi;
        this.speed = 0;
        this.orientation = 0;
    }

    tryCatchNest()
    {
        
    }

    updateBuffers(){}
}