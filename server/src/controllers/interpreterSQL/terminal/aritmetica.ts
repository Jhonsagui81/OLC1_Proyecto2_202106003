import { AbstractSQLExpression } from "../abstract/AbstractSQLExpression";
import { LiteralExpression } from "./LiteralExpression";
import { Context } from "../abstract/Context";
import { id } from "./id";
import { Type, Literal } from "../abstract/Return";

export class aritmetica extends AbstractSQLExpression{


    public valor: any;
    public tipo: any;

    constructor(line:number, column:number, private exp1: LiteralExpression | id, private operador: string, private exp2: LiteralExpression | id ){
        super(line, column);
        this.valor = null;    
        this.tipo = null; 

    }

    public interpret(context: Context) {
        let izq = this.exp1.interpret(context);
        let der = this.exp2.interpret(context);
        console.log("Esto es lo que trae la variable tipo: "+izq.tipo);
        
        switch(this.operador){
            case '+':
                if(izq.tipo == Type.INT && der.tipo == Type.INT){
                    this.valor = izq.valor + der.valor;
                    this.tipo = Type.INT;
                    return this;
                }
            case '*':
                if(izq.tipo == Type.INT && der.tipo == Type.INT ){
                    this.valor = izq.valor * der.valor;
                    this.tipo = Type.INT
                    return this; 
                }
        }

        // if(this.operador == '+'){
        //     this.valor = izq.valor + der.valor;
        //     this.tipo = Type.INT;
        //     return this;
        // }
    }
}