/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene, xi, yi, zi) {
        super(scene);

        this.x = xi;
        this.y = yi;
        this.z = zi;

        this.ruleF = "FF";
        this.rulesX = [];
        this.rulesX.push("F[-X][X]F[-X]+X");
        this.rulesX.push("F[-X][x]+X");
        this.rulesX.push("F[+X]-X");
        this.rulesX.push("F[/X][X]F[\\\\X]+X");
        this.rulesX.push("F[\\X][X]/X");
        this.rulesX.push("F[/X]\\X");
        this.rulesX.push("F[^X][X]F[&X]^X");
        this.rulesX.push("F[^X]&X");
        this.rulesX.push("F[&X]^X");

        this.initValues();
        this.initGrammar();
    }

    // cria o lexico da gramática
    initGrammar() {
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
    }

    initValues()
    {
        this.axiom = "X";
        this.angle = 30.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
    }

    doGenerate()
    {
        this.initValues();
        super.generate(
            this.axiom,
            {
                "F": [ this.ruleF ],
                "X":  this.rulesX
            },
            this.angle,
            this.iterations,
            this.scaleFactor
        );
    }

    display()
    {
        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        super.display();
        this.scene.popMatrix();
    }
}