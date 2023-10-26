import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';

export class delete_table extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
       context.delete_table(this.name);
       result += '-> Se elimino la tabla: '+this.name+'\n\n';
       return result; 
    }
    public getAST(): Node {
        let node: Node = new Node("DROP TABLE");
        let nodeID: Node = new Node("ID");
        nodeID.addChild(this.name);
        node.addChildsNode(nodeID);
        return node;
    }
}