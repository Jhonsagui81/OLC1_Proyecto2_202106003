import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";
import { FieldExpression } from "../../terminal/FieldExpression";

export class declaracion extends AbstractSQLExpression{

    public nombre: any;
    public tipo: any;

    
    constructor(line:number, column:number, private id: FieldExpression, private expresion: LiteralExpression | id | aritmetica){
        super(line, column);  
        this.nombre = null
        this.tipo = null;
    }

    public interpret(context: Context) {
        let valor = this.id.interpret(context);
        this.nombre = valor.value;
        this.tipo = valor.type;

        let expres = this.expresion.interpret(context);

        context.add_variable_dato(this.nombre, expres);
    }
}
