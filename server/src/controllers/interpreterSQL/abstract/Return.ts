//No son una clase 

export enum Type{   
    INT = "INT",
    DOUBLE = "DOUBLE",
    DATE = "DATE",
    VARCHAR = "VARCHAR",
    BOOLEAN = "BOOLEAN",
    NULL = "NULL",
    NEGATIVE = "NEGATIVE"
  }
  
  
  export type Literal= {
    value: any, 
    type: Type
  }

  export type column_update = {
    id: string,
    valor: any
  }