/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
        super(scene);
       
    }

    // cria o lexico da gramática
    initGrammar() {

        this.grammar = {
            "F": new MyQuad(this.scene, 0.2, 1.5),
            "X": new MyQuad(this.scene, 0.2, 0.5)
        };

    }

    update(t)
    {
        if(t > 0)
        {
            startAnimation(t);
        this.delta = t - this.lastUpdateTime;
        this.depth = this.axiom.length-(this.delta*this.axiom.length)/1000;
        }
    }

    startAnimation(t)
    {
        this.iterate();
        this.lastUpdateTime = t;
        this.depth = 0;
    }

    display()
    {
        this.update();

        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

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
                    var primitive=this.grammar[this.axiom[i]];
                    if ( primitive )
                    {
                        if(i < this.depth)
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}