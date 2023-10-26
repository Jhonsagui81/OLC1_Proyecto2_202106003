import {Type} from "../abstract/Return"; 

export default class ReturnType {

    public type: Type;
    public value: any;

    constructor(type: Type, value: any) {
        this.type = type;
        this.value = value;
    }

    public toString(): string {
        return this.value;
    }

}