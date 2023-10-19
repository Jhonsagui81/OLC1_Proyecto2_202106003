import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Type } from "../../abstract/Return";
import { Symbol } from "../../bd/Symbol";
import { LiteralExpression } from "../../terminal/LiteralExpression";
import { aritmetica } from "../../terminal/aritmetica";
import { id } from "../../terminal/id";
import { FieldExpression } from "../../terminal/FieldExpression";

export class declaracion extends AbstractSQLExpression{

    public nombre: any;
    public tipo: any;
    public exp: LiteralExpression|id|aritmetica;
    
    constructor(line:number, column:number, private id: FieldExpression, private expresion: LiteralExpression | id | aritmetica){
        super(line, column);  
        this.nombre = null
        this.tipo = null;
        this.exp = this.expresion;
    }

    public interpret(context: Context) {
        let valor = this.id.interpret(context);
        this.nombre = valor.value;
        this.tipo = valor.type;

        let expres = this.exp.interpret(context);

        context.add_symbol(this.nombre, expres);
    }
}

//posiblemente aqui este el error en los signos de interrogacion 