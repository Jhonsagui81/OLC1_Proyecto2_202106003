import { AbstractSQLExpression } from "../../abstract/AbstractSQLExpression";
import { Context } from "../../abstract/Context";
import { Node } from "../../abstract/Node";

export class Case extends AbstractSQLExpression {

    constructor(line:number, column: number,
        private id: string,
        private lista: any[],
        private as: string){
            super(line,column);
        }

        public interpret(context: Context) {
            let resuldt = '';
            resuldt += "->CASE\n";
            return resuldt; 
        }

        public getAST(): Node {
            console.log("ENTRAA??")
            let node: Node = new Node("CASE");     

            
            if(this.id == null && this.as == null){
                console.log("aqui deberia estar")
                node.addChild("CASE");
                let node_ins: Node = new Node("INSTRUCCIONES");
                try{
                    this.lista.forEach((ele)=>{
                        node_ins.addChildsNode(ele.getAST());
                    })
                }catch{}
                node.addChildsNode(node_ins);
                node.addChild("END")   
            }else if(this.id == null && this.as != null){
                node.addChild("CASE");
                let node_ins: Node = new Node("INSTRUCCIONES");
                try{
                    this.lista.forEach((ele)=>{
                        node_ins.addChildsNode(ele.getAST());
                    })
                }catch{}
                node.addChildsNode(node_ins);
                node.addChild("END");
                node.addChild("AS");
                let no: Node = new Node("ID");
                no.addChild(this.as);
                node.addChildsNode(no);
            }else if(this.id != null && this.as != null){
                node.addChild("CASE");
                let valor: Node = new Node("VALOR");
                valor.addChild(this.id);
                node.addChildsNode(valor);

                let node_ins: Node = new Node("INSTRUCCIONES");
                try{
                    this.lista.forEach((ele)=>{
                        node_ins.addChildsNode(ele.getAST());
                    })
                }catch{}
                node.addChildsNode(node_ins);
                node.addChild("END");
                node.addChild("AS");
                let no: Node = new Node("ID");
                no.addChild(this.as);
                node.addChildsNode(no);
            }else{
                node.addChild("CASE");

                let valor: Node = new Node("VALOR");
                valor.addChild(this.id);
                node.addChildsNode(valor);

                let node_ins: Node = new Node("INSTRUCCIONES");
                try{
                    this.lista.forEach((ele)=>{
                        node_ins.addChildsNode(ele.getAST());
                    })
                }catch{}
                node.addChildsNode(node_ins);
                node.addChild("END")
            }
            return node;
        }
}