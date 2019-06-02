class MyNest extends CGFobject{
    constructor(scene, xi, yi, zi)
    {        
        super(scene);

        this.x = xi;
        this.y = yi;
        this.z = zi;

        this.rotations = [];
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);
        this.rotations.push(Math.random() * 2 * Math.PI);

        this.positions = [];
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);
        this.positions.push(Math.random() - 0.5);

        this.semiSphere = new MySemiSphere(this.scene, 20, 1);
        this.branch = new MyCylinder(this.scene, 3, 1);

        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(1, 1, 1, 1.0);
        this.material.setDiffuse(1, 1, 1, 1.0);
        this.material.setSpecular(1, 1, 1, 1.0);
        this.material.setShininess(120);
        this.texture = new CGFtexture(this.scene, "images/nest.jpg");
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setTexture(this.texture);

        this.material2 = new CGFappearance(this.scene);
        this.material2.setAmbient(1, 1, 1, 1.0);
        this.material2.setDiffuse(1, 1, 1, 1.0);
        this.material2.setSpecular(1, 1, 1, 1.0);
        this.material2.setShininess(120);
        this.texture = new CGFtexture(this.scene, "images/wood.jpg");
        this.material2.setTextureWrap('REPEAT', 'REPEAT');
        this.material2.setTexture(this.texture);

        this.nBranches = 0;
    }

    display() 
    {
        this.scene.pushMatrix();
            this.scene.translate(this.x, this.y, this.z);

            this.scene.pushMatrix();
                this.material.apply();
                this.scene.translate(0, 1, 0);
                this.scene.scale(1.8, 0.5, 1.8);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
                this.semiSphere.display();
            this.scene.popMatrix();
            
            this.scene.pushMatrix();
                this.material.apply();
                this.scene.translate(0, 1, 0);
                this.scene.scale(1.8, 1, 1.8);
                this.scene.rotate(Math.PI/2, 1, 0, 0);
                //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
                this.semiSphere.display();
            this.scene.popMatrix();

            this.material2.apply();
            
            for(var i = 0; i < this.nBranches; i++)
            {
                this.scene.pushMatrix();
                    this.scene.translate(this.positions[i], 1, this.positions[i]);
                    this.scene.rotate(this.rotations[i], 0, 1, 0);
                    this.scene.rotate(Math.PI/2, 1, 0, 0);
                    this.scene.scale(0.05, 1, 0.05);
                    this.branch.display();
                this.scene.popMatrix();
            }

        this.scene.popMatrix();
    }

    

    updateBuffers(){}
}