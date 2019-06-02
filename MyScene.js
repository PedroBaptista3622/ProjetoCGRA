/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();

    this.lastUpdateTime = 0;
    this.deltaTime;
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //My scene frames per second; Used in interface;
        this.fps = 1000/50;

        this.setUpdatePeriod(this.fps); // <=> T; T = 1(sec) / f (frames per second)  <------- Aproximação; N deve ser usado para controlar taxa de atualização da cena.


        // Camera zoom
        this.zoom = 2;


        //Initialize scene objects
        this.axis = new CGFaxis(this);

        this.house = new MyHouse(this, 0, -15, 'images/pillar.jpg', 'images/wall.jpg', 'images/roof.jpg', 'images/door.jpg', 'images/window.jpg');
        this.map = new MyCubeMap(this, 'images/CubeMapDay.png', 60);
        this.bird = new MyBird(this, 0, 40, 0);
        this.terrain = new MyTerrain(this);
        this.nest = new MyNest(this, 10, 5.3, 5);
        this.lSystem = new MyLightning(this);
        this.trees = [];
        for(var j = 0; j < 15; j++)
        {
            this.trees.push(new MyLSPlant(this, 3*Math.sin(j), 5/3, 3*Math.cos(j)));
            this.trees[j].doGenerate();
        }

        this.branches = Math.random()*3 + 5;
        this.treeBranches = [];
        for(var i = 0; i < this.branches; i++)
        {
            this.treeBranches.push(new MyTreeBranch(this));
        }


        // Bird
        this.startBirdAnimation = false;


        // Lightning
        this.startAnimation = false;
        this.animation = false;

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1.0;
    }
        

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }


    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(80, 100, 80), vec3.fromValues(0, 10, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }


    checkKeys() {
        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            text+=" W ";
            keysPressed=true;
            if(this.bird.speed < 3)
                this.bird.accelerate(0.1);
        }

        if (this.gui.isKeyPressed("KeyS")) {
            text+=" S ";
            keysPressed=true;
            if(this.bird.speed > 0.1)
                this.bird.accelerate(-0.1);
        }

        if(this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            keysPressed=true;
            this.bird.turn(Math.PI/15+this.bird.speed*0.1);
        }

        if(this.gui.isKeyPressed("KeyD")) {
            text+=" D";
            keysPressed=true;
            this.bird.turn(-Math.PI/15-this.bird.speed*0.1);
        }

        if(this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            keysPressed=true;
            this.bird.reset();
        }

        if(this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            keysPressed=true;
            this.startBirdAnimation = true;
            this.bird.isDescending = true;
        }

        if(this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            keysPressed=true;
            this.startAnimation = true;
        }

        if (keysPressed)
            console.log(text);
    }


    update(t){
        this.lastUpdateTime = this.lastUpdateTime || 0;
        this.deltaTime = t - this.lastUpdateTime;

       
        if(this.deltaTime >= 1000/this.fps)
        {
            this.bird.update(t); 
            this.lastUpdateTime = t;
        }

        if(this.startBirdAnimation)
        {
            this.bird.animation = true;
            this.bird.startAnimation = t;
            this.startBirdAnimation = false;
        }

        if(this.bird.canDrop(this.nest))
        {
            this.nest.nBranches = this.branches - this.treeBranches.length;
        }

        if(this.startAnimation)
        {
            this.lSystem.startAnimation(t);
            this.animation = true;
            this.startAnimation = false;
        }

        if(this.animation)
        {
            if(this.lSystem.update(t))
                this.animation = false;
        }

        this.timeFactor = t * 2* Math.PI/ 1000;
        
        this.checkKeys();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();

        this.scale(this.zoom, this.zoom, this.zoom);

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();


        // ---- BEGIN Primitive drawing section

        this.map.display();

        this.house.display();        

        this.pushMatrix();
        this.scale(1/3, 1/3, 1/3);
        this.bird.display();
        this.popMatrix();

        this.nest.display();

        if(this.animation)
        {
            this.pushMatrix();
                this.translate(0, 30, 0);
                this.scale(1.5, -1.5, 1);
                this.lSystem.display();
            this.popMatrix();
        }

        this.pushMatrix();
            this.scale(3, 3, 3);
            for(var i = 0; i < 15; i++)
            {
                this.trees[i].display();
            }
        this.popMatrix();

        for(var i = 0; i < this.treeBranches.length; i++)
        {
            if(!this.bird.checkCollision(this.treeBranches[i]))
            {
                this.treeBranches[i].display();
            }
            else
                this.treeBranches.splice(i, 1);
        }

        this.terrain.display();

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}