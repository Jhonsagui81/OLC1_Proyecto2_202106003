import { Node } from "../abstract/Node";
import { Context } from "../abstract/Context";
import Exception from "./Exception";

export default class Tree { //maneja tpdp 

    public instructions: Array<any | undefined>; // change late lista de errores
    public errors: Array<Exception>; // lista de errores
    public console: string; //
    public globalTable: Context | undefined; //entorno global 
    public dot: string;  //genera arbol
    private count: number;  //masuqueherramienta 

    constructor(instructions: Array<any>) {  //recibe lista de isntrucciones
        this.instructions = instructions;  //
        this.console = '';
        this.errors = [];
        this.dot = '';
        this.count = 0;
    }

    public updateConsole(input: string) {
        this.console += `${input}\n`;
    }

    public getDot(root: Node, flag: boolean = true) { //change late  obtiene todo el codigo de graphviz .
        this.dot = "";
        this.dot += `digraph {\nranksep="${flag ? 2 : 1}";\nbgcolor = "#090B10";\nedge[color="#56cdff"];\nnode [style="filled" fillcolor = "#0F111A" fontcolor = "white" color = "#007acc"];\n`;
        this.dot += `n0[label="${root.value.replace("\"", "\\\"")}"];\n`;       //Nodo raiz - > quemado 
        this.count = 1; //Para tener el conteo de los nodos 
        this.travelCst("n0", root);  //Cuerpor del dot 
        this.dot += "}";
        return this.dot;
    }

    public travelCst(idRoot: any, nodeRoot: Node) {     //Recorre todos los hijos del nodo raiz que se le pase
        for(let item of nodeRoot.childs){
            let name_child = `n${this.count}`;      //Se generar el nombre del nodo n1,n2,n3
            this.dot += `${name_child} [label = "${item.value}"];\n`; //culmina el nodo 
            this.dot += `${idRoot} -> ${name_child};\n`;    //Se enlaza el nodo 
            this.count++;   //aumenta el contador 
            this.travelCst(name_child, item);  //Se llama de nuevo el metodo con raiz el nodo trabajado para que siga bajando 
        }
    }

}

