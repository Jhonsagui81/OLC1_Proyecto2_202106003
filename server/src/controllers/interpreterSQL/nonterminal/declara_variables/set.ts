import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";
import { FieldExpression } from "../../terminal/FieldExpression";
import { Node } from "../../abstract/Node";

export class set extends AbstractSQLExpression{

    
    constructor(line:number, column:number, public id: string, private expresion: LiteralExpression | id | aritmetica){
        super(line, column);  
    }

    public interpret(context: Context) {
        let result = ' \n';
        let expres = this.expresion.interpret(context);
        
        context.set_variable(this.id, expres?.value);
        return result; 
    }

    public getAST(): Node {
        let node: Node = new Node("ASIGNACION");
        node.addChild("SET");
        let nodeID: Node = new Node("ID");
        nodeID.addChild(this.id);
        node.addChildsNode(nodeID);
        node.addChild("=");
        let nodeValue: Node = new Node("VALUE");
        nodeValue.addChildsNode(this.expresion.getAST());
        node.addChildsNode(nodeValue);
        return node; 
    }
}