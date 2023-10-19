import { AbstractSQLExpression } from "../abstract/AbstractSQLExpression";
import { Context } from "../abstract/Context";
import { Symbol } from "../bd/Symbol";
import { Literal } from "../abstract/Return";

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
}