import { AbstractSQLExpression } from "../abstract/AbstractSQLExpression";
import { Context } from "../abstract/Context";
import { Symbol } from "../bd/Symbol";
import ReturnType from '../tools/ReturnType';
import Tree from "../tools/Tree";
import { Node } from "../abstract/Node";
import { Literal } from "../abstract/Return";
import Exception from "../tools/Exception";

export class id extends AbstractSQLExpression{

    public value: any;
    public type: any;

    constructor(line:number, column: number, private id: string){
        super(line, column);
        this.value = null;
        this.type = null
    }

    public interpret(context: Context){
        let simbolo: Symbol | undefined = context.get_symbol(this.id);
        this.value = simbolo.valor;
        this.type = simbolo.type;
        return this; 
    }

    public getAST(): Node {
        return new Node(this.id);
    }
  
}