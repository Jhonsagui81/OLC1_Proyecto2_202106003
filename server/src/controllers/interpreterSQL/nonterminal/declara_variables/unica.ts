import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";
import { FieldExpression } from "../../terminal/FieldExpression";

export class una_variable extends AbstractSQLExpression{

    public nombre: any;
    public tipo: any;

    
    constructor(line:number, column:number, private id: FieldExpression){
        super(line, column);  
        this.nombre = null
        this.tipo = null;

    }

    public interpret(context: Context) {
        let result = '\n';
        let valor = this.id.interpret(context);  //return Literal
        this.nombre = valor.value;
        this.tipo = valor.type;

        context.add_variable(this.nombre, this.tipo);
        return result;
    }

    public getAST(): Node {
        let node: Node = new Node("DECLARACION");
        node.addChild("DECLARE");
        let nodeID: Node = new Node("ID");
        nodeID.addChildsNode(this.id.getAST());
        node.addChildsNode(nodeID);
        return node; 
    }
}