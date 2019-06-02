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
        this.cube = new MyUnitCube(scene);
        this.cylinder = new MyCylinder(scene, 3, 1);

        this.height;
        this.ang;

        this.hasBranch = false;

        this.startAnimation;

        this.initMaterials(scene);
    }

    initMaterials(scene)
    {
        this.birdColor = new CGFappearance(this.scene);
        this.birdColor.setAmbient(1, 1, 1, 1.0);
        this.birdColor.setDiffuse(1, 1, 1, 1.0);
        this.birdColor.setSpecular(1, 1, 1, 1.0);
        this.birdColor.setShininess(1.0);
        this.texture = new CGFtexture(this.scene, "images/bird.jpg");
        this.birdColor.setTextureWrap('REPEAT', 'REPEAT');
        this.birdColor.setTexture(this.texture);

        this.beak = new CGFappearance(this.scene);
        this.beak.setAmbient(1, 1, 1, 1.0);
        this.beak.setDiffuse(1, 1, 1, 1.0);
        this.beak.setSpecular(1, 1, 1, 1.0);
        this.beak.setShininess(1.0);
        this.texture = new CGFtexture(this.scene, "images/orange.jpg");
        this.beak.setTextureWrap('REPEAT', 'REPEAT');
        this.beak.setTexture(this.texture);
        
        this.claw = new CGFappearance(this.scene);
        this.claw.setAmbient(1, 1, 1, 1.0);
        this.claw.setDiffuse(1, 1, 1, 1.0);
        this.claw.setSpecular(1, 1, 1, 1.0);
        this.claw.setShininess(1.0);
        this.texture = new CGFtexture(this.scene, "images/yellow.jpg");
        this.claw.setTextureWrap('REPEAT', 'REPEAT');
        this.claw.setTexture(this.texture);

        this.eye = new CGFappearance(this.scene);
        this.eye.setAmbient(1, 1, 1, 1.0);
        this.eye.setDiffuse(1, 1, 1, 1.0);
        this.eye.setSpecular(1, 1, 1, 1.0);
        this.eye.setShininess(1.0);
        this.texture = new CGFtexture(this.scene, "images/black.jpg");
        this.eye.setTextureWrap('REPEAT', 'REPEAT');
        this.eye.setTexture(this.texture);

        this.branch = new CGFappearance(this.scene);
        this.branch.setAmbient(0.5, 0.5, 0.5, 1,0);
        this.branch.setDiffuse(0.5, 0.5, 0.5, 1,0);
        this.branch.setSpecular(0.5, 0.5, 0.5, 1,0);
        this.branch.setShininess(1.0);
        this.texture = new CGFtexture(this.scene, "images/wood.jpg");
        this.branch.setTextureWrap('REPEAT', 'REPEAT');
        this.branch.setTexture(this.texture);
    }

    update(t)
    {
        this.distSegment =  0.015 * (this.y+this.height) / (this.scene.fps/100);

        this.timeFactor = t/500*Math.PI;
        this.delta = t - this.startAnimation;

        if(t > 0 && !this.animation)
        {
            this.height = Math.sin(this.timeFactor);
        }
        else if(this.animation)
        {
            if(this.isDescending)
                this.height -= this.distSegment;
            else
                this.height += this.distSegment;
        }

        if((this.y + this.height) <= 17)
            this.isDescending = false;

        if(this.delta >= 2000 || (this.y + this.height) >= 40)
            this.animation = false;

        this.z += this.speed * 10 * Math.cos(this.orientation)/this.scene.fps;
        this.x += this.speed * 10 * Math.sin(this.orientation)/this.scene.fps;
    }
    
    display() {
        
        //-----------------------------------------------------
        
        this.scene.pushMatrix();
            this.scene.translate(this.x, this.height + this.y, this.z);
            this.scene.rotate(this.orientation, 0, 1, 0);
            this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

            // Cabeca
            this.birdColor.apply();

            this.scene.pushMatrix();
                this.scene.translate(0, 0.5, 2);
                this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
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


            // Olho esquerdo
            this.eye.apply();

            this.scene.pushMatrix();
                this.scene.translate(-0.4, 0.9, 2.75);
                this.scene.rotate(-Math.PI/6, 0, 1, 0);
                this.scene.rotate(-Math.PI/10, 1, 0, 0);
                this.scene.scale(0.3, 0.3, 0.2);
                this.cube.display();
            this.scene.popMatrix();


            // Olho direito
            this.scene.pushMatrix();
                this.scene.translate(0.4, 0.9, 2.75);
                this.scene.rotate(Math.PI/6, 0, 1, 0);
                this.scene.rotate(-Math.PI/10, 1, 0, 0);
                this.scene.scale(0.3, 0.3, 0.2);
                this.cube.display();
            this.scene.popMatrix();


            // Bico
            this.beak.apply();

            this.scene.pushMatrix();
                this.scene.translate(0, 0.3, 2.6);
                this.scene.scale(0.5, 0.5, 1.2);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                this.cone.display();
            this.scene.popMatrix();


            // Patas
            this.claw.apply();

            this.scene.pushMatrix();

                this.scene.translate(0, 0.5, 0);
                this.scene.scale(1.5, 1.5, 1.5);

                // Pata esquerda
                this.scene.pushMatrix();
                    this.scene.translate(0.3, -1.3, 0.3);
                    this.scene.rotate(-Math.PI/5, 1, 0, 0);
                    this.scene.scale(0.05, 0.5, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0.3, -1.3, 0.58);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 0.3, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0.3, -1.3, 0.3);
                    this.scene.rotate(-Math.PI/1.3, 0, 1, 0);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 0.32, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(0.3, -1.3, 0.3);
                    this.scene.rotate(Math.PI/1.3, 0, 1, 0);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 0.32, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                // Pata direita
                this.scene.pushMatrix();
                    this.scene.translate(-0.3, -1.3, 0.3);
                    this.scene.rotate(-Math.PI/5, 1, 0, 0);
                    this.scene.scale(0.05, 0.5, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(-0.3, -1.3, 0.58);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 0.3, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(-0.3, -1.3, 0.3);
                    this.scene.rotate(-Math.PI/1.3, 0, 1, 0);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 0.32, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();

                this.scene.pushMatrix();
                    this.scene.translate(-0.3, -1.3, 0.3);
                    this.scene.rotate(Math.PI/1.3, 0, 1, 0);
                    this.scene.rotate(-Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 0.32, 0.05);
                    this.cylinder.display();
                this.scene.popMatrix();
            
            this.scene.popMatrix();

            if(this.hasBranch)
            {
                this.branch.apply();

                this.scene.pushMatrix();
                    this.scene.translate(-1.5, -1.5, 0.5);
                    this.scene.rotate(Math.PI/2, 0, 1, 0);
                    this.scene.rotate(Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.15, 3, 0.15);
                    this.cylinder.display();
                this.scene.popMatrix();
            }


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

    checkCollision(branch)
    {
        if((this.y+this.height)/3 - 0.75 < branch.y + 0.75 && (this.y+this.height)/3 > branch.y - 0.75 && 
            this.x/3 > branch.x - 0.75 && this.x/3 < branch.x + 0.75 && 
            this.z/3 > branch.z - 0.75 && this.z/3 < branch.z + 0.75)
        {
            this.hasBranch = true;
            return true;
        }
        else 
            return false;
    }

    canDrop(nest)
    {
        if((this.y+this.height)/3 - 1 < nest.y + 1 && (this.y+this.height)/3 > nest.y - 1 && 
            this.x/3 > nest.x - 1 && this.x/3 < nest.x + 1 && 
            this.z/3 > nest.z - 1 && this.z/3 < nest.z + 1)
        {
            this.hasBranch = false;
            return true;
        }
        else 
            return false;
    }

    updateBuffers(){}
}