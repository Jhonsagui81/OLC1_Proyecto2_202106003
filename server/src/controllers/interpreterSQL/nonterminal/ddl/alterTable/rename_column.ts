import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';

export class rename_column extends AbstractSQLExpression {

    constructor(line: number, column: number, private name_table: string, private name_column: string, private new_name: string){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
        context.rename_column(this.name_table, this.name_column, this.new_name);
        result += '-> Se renombro la columna '+this.name_column+' a '+this.new_name+' de la tabla: '+this.name_table+'\n\n';
        return result; 
    }

    public getAST(): Node {
        let node: Node = new Node("ALTER TABLE");
        let nodeId: Node = new Node("ID");
        nodeId.addChild(this.name_table);
        node.addChildsNode(nodeId);
        node.addChild("RENAME");
        node.addChild("COLUMN");
        let nodo_a:Node = new Node("ID");
        nodo_a.addChild(this.name_column);
        node.addChildsNode(nodo_a);
        node.addChild("TO");
        let nodo_b:Node = new Node("ID");
        nodo_b.addChild(this.new_name);
        node.addChildsNode(nodo_b);
        return node; 
    }
}