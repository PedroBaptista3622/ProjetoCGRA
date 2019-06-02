/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);

        this.ruleF = "FF";
        this.ruleX = [];
        this.ruleX.push("F[-X][X]F[-X]+FX");
        this.ruleX.push("F[-X][X]F[-X]+X");
        this.ruleX.push("F[-X][x]+FX");
        this.ruleX.push("F[+X]-X");

        this.initValues();
        this.initGrammar();

        this.material = new CGFappearance(scene);
        this.material.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.material.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.material.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.material.setShininess(2.0);
    }

    initValues()
    {
        this.axiom = "X";
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
    }

    // cria o lexico da gramática
    initGrammar() {

        this.grammar = {
            "F": new MyQuad(this.scene, 0.2, 1),
            "X": new MyQuad(this.scene, 0.2, 1)
        };

    }

    doGenerate()
    {
        this.initValues();
        super.generate(
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

    update(t)
    {
        this.delta = t - this.lastUpdateTime;
        
        if(this.delta != 0)
            this.depth = (this.delta*this.axiom.length)/1000;

        if(this.delta >= 1200)
            return true;
    }

    startAnimation(t)
    {
        this.doGenerate();
        //this.iterate();
        this.lastUpdateTime = t;
        this.depth = 0;
    }

    display()
    {
        this.scene.pushMatrix();

        this.material.apply();


        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;
                
                case "\\":
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;
                
                case "/":
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    if(i < this.depth)
                    {
                        var primitive=this.grammar[this.axiom[i]];
                            
                        if ( primitive )
                        {
                            primitive.display();
                            this.scene.translate(0, 1, 0);
                        }
                        break;
                    }
            }
        }
        this.scene.popMatrix();
    }
}