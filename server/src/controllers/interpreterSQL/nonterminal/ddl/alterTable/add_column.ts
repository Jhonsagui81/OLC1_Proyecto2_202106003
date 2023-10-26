import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { FieldExpression } from '../../../terminal/FieldExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';

export class add_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private field: FieldExpression){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
        const field_ = this.field.interpret(context);
        context.add_column(this.name, field_);
        result += '-> Se agrego la columna '+field_.value+' en la tabla: '+this.name+'\n\n';
        return result; 
    }
    public getAST(): Node {
        let node: Node = new Node("ALTER TABLE");
        let nodeId: Node = new Node("ID");
        node.addChildsNode(nodeId);
        nodeId.addChild(this.name);
        node.addChild("ADD");
        let nodo_co: Node = new Node("ID_COLUMN");
        nodo_co.addChildsNode(this.field.getAST());
        node.addChildsNode(nodo_co);
        return node;
    }
}