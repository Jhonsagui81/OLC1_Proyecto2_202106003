//No son una clase 

export enum Type{   
    INT = 0,
    DOUBLE = 1,
    DATE = 2,
    VARCHAR = 3,
    BOOLEAN = 4,
    NULL = 5,
    NEGATIVE = 6
  }
  
  
  export type Literal= {
    value: any, 
    type: Type
  }