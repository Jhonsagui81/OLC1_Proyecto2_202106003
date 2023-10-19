import { AbstractSQLExpression } from "../abstract/AbstractSQLExpression";
import { LiteralExpression } from "./LiteralExpression";
import { Context } from "../abstract/Context";
import { id } from "./id";
import { Type, Literal } from "../abstract/Return";

export class aritmetica extends AbstractSQLExpression{


    public value: any;
    public type: any;

    constructor(line:number, column:number, private exp1: LiteralExpression | id, private operador: string, private exp2: LiteralExpression | id ){
        super(line, column);
        this.value = null;    
        this.type = null; 

    }

    public interpret(context: Context) {
        let izq = this.exp1.interpret(context);
        let der = this.exp2.interpret(context);
        
        
        switch(this.operador){
            case '+':
                if(izq.type == Type.INT && der.type == Type.INT){
                    this.value = izq.value + der.value;
                    this.type = Type.INT;
                    return this;
                }
            case '*':
                if(izq.type == Type.INT && der.type == Type.INT ){
                    this.value = izq.value * der.value;
                    this.type = Type.INT
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