export class Node{
    public childs: Array<Node>; //Lista de hijos nodos 
    public value: string; 

    constructor(value: string){
        this.value = value;
        this.childs = [];  
    }

    addChild(value: string) {  //agrega un hijo a childs 
        this.childs.push(new Node(value));
    }

    addChilds(childs: Array<Node>) {  //agrega tpdps los hijos al padre
        for (let item of childs) {
            this.childs.push(item);
        }
    }

    addChildsNode(child: Node) {  //termina el ensamble 
        this.childs.push(child);
    }
}