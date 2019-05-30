class MyTerrain extends CGFobject{
    constructor(scene)
    {        
        super(scene);

        this.plane = new Plane(this.scene, 75);

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1.0);
        this.appearance.setDiffuse(1, 1, 1, 1.0);
        this.appearance.setSpecular(1, 1, 1, 1.0);
        this.appearance.setShininess(120);

        this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        
        this.texture2 = new CGFtexture(this.scene, "images/heightMap.jpg");
        this.texture3 = new CGFtexture(this.scene, "images/altimetry.png");

        this.scene.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.scene.shader.setUniformsValues({ uSampler: 1 });
        this.scene.shader.setUniformsValues({ uSampler2: 2 });
        this.scene.shader.setUniformsValues({ uSampler3: 3 });
    }

    display() 
    {
        this.scene.setActiveShader(this.scene.shader);
        
        this.appearance.apply();
        this.appearance.setTexture(this.texture);
        this.texture.bind(1);
        this.texture2.bind(2);
        this.texture3.bind(3);
        this.scene.pushMatrix();
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.scale(60, 60, 1);
        this.plane.display();
        this.scene.popMatrix();    
    
        this.scene.setActiveShader(this.scene.defaultShader);
    }

    

    updateBuffers(){}
}