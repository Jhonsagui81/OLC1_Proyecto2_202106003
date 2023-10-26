import { AbstractSQLExpression } from '../../../abstract/AbstractSQLExpression';
import { Context } from '../../../abstract/Context';
import { Node } from '../../../abstract/Node';

export class rename_to extends AbstractSQLExpression {

    constructor(line: number, column: number, private name: string, private new_name: string){
        super(line, column);
    }

    public interpret(context: Context){
        let result = '';
        context.rename_to(this.name.toString(), this.new_name.toString());
        result += '-> Se actualizo el nombre de la tabla '+this.name+' a : '+this.new_name+'\n\n';
        return result;
    }

    public getAST(): Node {
        let node: Node = new Node("ALTER TABLE");
        let nodeId: Node = new Node("ID");
        nodeId.addChild(this.name);
        node.addChildsNode(nodeId);
        node.addChild("RENAME");
        node.addChild("TO");
        let nodo_co: Node = new Node("NEW_NAME");
        nodo_co.addChild(this.new_name);
        node.addChildsNode(nodo_co);
        return node; 
    }
}