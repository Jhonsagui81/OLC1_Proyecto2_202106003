import { AbstractSQLExpression } from "../abstract/AbstractSQLExpression";
import { Context } from "../abstract/Context";
import { Symbol } from "../bd/Symbol";
import { Literal } from "../abstract/Return";

export class id extends AbstractSQLExpression{

    public nombre: string;
    public valor: any;
    public tipo: any;

    constructor(line:number, column: number, private id: string){
        super(line, column);
        this.nombre = id;
        this.valor = null;
        this.tipo = null
    }

    public interpret(context: Context){
        let simbolo: Symbol | undefined = context.get_symbol(this.id);
        this.valor = simbolo.valor;
        this.tipo = simbolo.type;
        return this; 
    }
}