import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";

export class bloque extends AbstractSQLExpression{

    constructor(line:number, column:number, private expresion: any[]){
        super(line, column);
    }
    
    public interpret(context: Context) { //contexto global
        let result = '';
        let NuevoContexto = new Context(context);
        
        for (const exp of this.expresion){
            try{
                result += exp.interpret(NuevoContexto);
            } catch (error:any){
                console.error(`Se produjo un error al interpretar el objeto: ${error.message}`)
            }
            
        }
        return result; 
    }

    public getAST(): Node {
        let node: Node = new Node("Entorno");
        node.addChild("BEGIN");
        let nodeInst: Node = new Node("INSTRUCIONES");
        this.expresion.forEach((ele) => {
            try{
                nodeInst.addChildsNode(ele.getAST());
            } catch {
                
            }
            
        });
        node.addChildsNode(nodeInst);
        node.addChild("END");
        return node; 
    }
}