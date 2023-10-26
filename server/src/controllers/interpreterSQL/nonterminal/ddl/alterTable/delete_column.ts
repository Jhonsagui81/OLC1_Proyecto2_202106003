import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';

export class delete_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private name_column: string ){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
        context.delete_column(this.name, this.name_column);
        result += '-> Se elimino la columna '+this.name_column+' De la tabla: '+this.name+'\n\n';
        return result; 
    }
    public getAST(): Node {
        let node: Node = new Node("ALTER TABLE");
        let nodeId: Node = new Node("ID");
        nodeId.addChild(this.name);
        node.addChildsNode(nodeId);
        node.addChild("DROP");
        node.addChild("COLUMN");
        let nodo_co: Node = new Node("ID_COLUMN");
        nodo_co.addChild(this.name_column);
        node.addChildsNode(nodo_co);
        return node;
    }
}