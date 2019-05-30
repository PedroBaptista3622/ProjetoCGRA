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
        this.setUpdatePeriod(50); // <=> T; T = 1(sec) / f (frames per second)  <------- Aproximação; N deve ser usado para controlar taxa de atualização da cena.

        this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = [];
        this.ruleX.push("F[-X][X]F[-X]+FX");
        this.ruleX.push("F[-X][X]F[-X]+X");
        this.ruleX.push("F[-X][x]+FX");
        this.ruleX.push("F[+X]-X");

        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
        this.lSystem = new MyLightning(this);

        this.doGenerate = function () {
            this.lSystem.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X":  this.ruleX 
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }

        this.doGenerate();

        //My scene frames per second; Used in interface;
        this.fps = 20;

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.plane = new Plane(this, 32);

        this.map = new MyCubeMap(this, 'images/CubeMapDay.png', 60);
        this.bird = new MyBird(this, 0, 3, 0);
        this.terrain = new MyTerrain(this);
        this.nest = new MyNest(this);
        this.treeBranches = [];
        this.treeBranches.push(new MyTreeBranch(this));
        this.treeBranches.push(new MyTreeBranch(this));
        this.treeBranches.push(new MyTreeBranch(this));
        this.treeBranches.push(new MyTreeBranch(this));
        this.treeBranches.push(new MyTreeBranch(this));


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
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(100, 100, 100), vec3.fromValues(0, 0, 0));
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
            if(this.bird.speed > 0)
                this.bird.accelerate(-0.1);
        }

        if(this.gui.isKeyPressed("KeyA")) {
            text+=" A ";
            keysPressed=true;
            this.bird.turn(Math.PI/10+this.bird.speed*0.1);
        }

        if(this.gui.isKeyPressed("KeyD")) {
            text+=" D";
            keysPressed=true;
            this.bird.turn(-Math.PI/10-this.bird.speed*0.1);
        }

        if(this.gui.isKeyPressed("KeyR")) {
            text+=" R ";
            keysPressed=true;
            this.bird.reset();
        }

        if(this.gui.isKeyPressed("KeyP")) {
            text+=" P ";
            keysPressed=true;
            this.bird.tryCatchNest();
        }

        if(this.gui.isKeyPressed("KeyL")) {
            text+=" L ";
            keysPressed=true;
            this.doGenerate();
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

        // Draw axis
        this.axis.display();

        //Apply default appearance
        this.setDefaultAppearance();


        // ---- BEGIN Primitive drawing section

        

        this.pushMatrix();
        this.scale(1/3, 1/3, 1/3);
        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.bird.display();
        this.popMatrix();

        this.nest.display();

        this.pushMatrix();
        this.scale(1, 1, 1);
        this.lSystem.display();
        this.popMatrix();

        /*for(var i = 0; i < this.treeBranches.length; i++)
        {
            this.treeBranches[i].display();
        }*/

        this.terrain.display();


        // ---- END Primitive drawing section
    }
}