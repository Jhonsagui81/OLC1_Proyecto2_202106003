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
                } else if(izq.type == Type.INT && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) + der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.INT && der.type == Type.DATE){
                    this.value = der.value.setDate(der.value.getDate() + izq.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.INT && der.type == Type.VARCHAR){
                    this.value = izq.value + parseInt(der.value);
                    this.type = Type.INT;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.INT){
                    this.value = parseFloat(izq.value) + parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DOUBLE){
                    this.value = izq.value + der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DATE){
                    this.value = der.value.setDate(der.value.getDate() + izq.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.VARCHAR){
                    this.value = izq.value + parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DATE && der.type == Type.INT){
                    this.value = izq.value.setDate(izq.value.getDate() + der.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.DATE && der.type == Type.DOUBLE){
                    this.value = izq.value.setDate(izq.value.getDate() + der.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.VARCHAR){
                    this.value = izq.value.setDate(izq.value.getDate() + parseInt(der.value));
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.INT){
                    this.value = parseInt(izq.value) + der.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) + der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.DATE){
                    this.value = der.value.setDate(der.value.getDate() + parseInt(der.value));
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.VARCHAR){
                    this.value = izq.value + der.value
                    this.type = Type.VARCHAR;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '-':
                if(izq.type == Type.INT && der.type == Type.INT){
                    this.value = izq.value - der.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq.type == Type.INT && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) - der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.INT && der.type == Type.DATE){
                    this.value = der.value.setDate(der.value.getDate() - izq.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.INT && der.type == Type.VARCHAR){
                    this.value = izq.value - parseInt(der.value);
                    this.type = Type.INT;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.INT){
                    this.value = parseFloat(izq.value) - parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DOUBLE){
                    this.value = izq.value - der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DATE){
                    this.value = der.value.setDate(der.value.getDate() - izq.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.VARCHAR){
                    this.value = izq.value - parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DATE && der.type == Type.INT){
                    this.value = izq.value.setDate(izq.value.getDate() - der.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.DATE && der.type == Type.DOUBLE){
                    this.value = izq.value.setDate(izq.value.getDate() - der.value);
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.VARCHAR){
                    this.value = izq.value.setDate(izq.value.getDate() - parseInt(der.value));
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.INT){
                    this.value = parseInt(izq.value) - der.value;
                    this.type = Type.INT;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) - der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.DATE){
                    this.value = der.value.setDate(der.value.getDate() - parseInt(der.value));
                    this.type = Type.DATE;
                    return this;
                } else if(izq.type == Type.VARCHAR && der.type == Type.VARCHAR){
                    this.value = izq.value - der.value
                    this.type = Type.VARCHAR;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '*':
                if(izq.type == Type.INT && der.type == Type.INT ){
                    this.value = izq.value * der.value;
                    this.type = Type.INT
                    return this; 
                } else if(izq.type == Type.INT && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) * der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.INT){
                    this.value = izq.value * parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DOUBLE){
                    this.value = izq.value * der.value;
                    this.type = Type.DOUBLE;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '/':
                if(izq.type == Type.INT && der.type == Type.INT ){
                    this.value = izq.value / der.value;
                    this.type = Type.INT
                    return this; 
                } else if(izq.type == Type.INT && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) / der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.INT){
                    this.value = izq.value / parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DOUBLE){
                    this.value = izq.value / der.value;
                    this.type = Type.DOUBLE;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
                    return this;
                }
            case '%':
                if(izq.type == Type.INT && der.type == Type.INT ){
                    this.value = izq.value % der.value;
                    this.type = Type.INT
                    return this; 
                } else if(izq.type == Type.INT && der.type == Type.DOUBLE){
                    this.value = parseFloat(izq.value) % der.value;
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.INT){
                    this.value = izq.value % parseFloat(der.value);
                    this.type = Type.DOUBLE;
                    return this;
                } else if(izq.type == Type.DOUBLE && der.type == Type.DOUBLE){
                    this.value = izq.value % der.value;
                    this.type = Type.DOUBLE;
                    return this;
                }else{
                    this.value = null
                    this.type = Type.NULL;
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