/* Definición Léxica */
%lex

%options case-insensitive
%x string

%%

[ \r\t]+            {}                      // espacio en blanco
\n                  {}                      // salto de linea
(\-\-).*                             {}     // comentario linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]  {}     // comentario multilinea


// simbolos reservados
";"                 return 'TK_PTCOMA';
"("                 return 'TK_PARIZQ';
")"                 return 'TK_PARDER';
"."                 return 'TK_PUNTO';
":"                 return 'TK_DOSPUNTOS';
","                 return 'TK_COMA';
"["                 return 'TK_CORIZR';
"]"                 return 'TK_CORDER';
"{"                 return 'TK_LLAVEIZQ';
"}"                 return "TK_LLAVEDER";

// ------> Relacionales 
"="                 return 'TK_IGUALACION';
"!="                return 'TK_DIFERENCIACION';
"<"                 return 'TK_MENORQUE';
"<="                return 'TK_MENORIGUAL';
">"                 return 'TK_MAYORQUE';
">="                return 'TK_MAYORIGUAL';
"@"                 return 'TK_ARROBA';

// -------> Operadores aritmeticos
"+"                 return "TK_MAS";
"-"                 return "TK_MENOS";
"*"                 return "TK_POR";
"/"                 return "TK_DIV";
"%"                 return "TK_MODULO";

// --------> Operadores logicos
"AND"               return "TK_AND";
"OR"                return "TK_OR";
"NOT"               return "TK_NOT"; 

// tipos de variables
"int"               return 'TK_TENTERO';
"double"            return 'TK_TDOUBLE';
"date"              return 'TK_TDATE';
"varchar"           return 'TK_TVARCHAR';
"boolean"           return 'TK_TBOOLEAN';

"true"              return 'TK_TRUE';
"false"             return 'TK_FALSE';
"null"              return 'TK_NULL';

// ------------>   ddl
"create"          return 'TK_CREATE';
"alter"           return 'TK_ALTER';
"add"             return 'TK_ADD';
"drop"            return 'TK_DROP';
"rename"          return 'TK_RENAME';
"to"              return 'TK_TO';
"column"          return 'TK_COLUMN';
"table"           return 'TK_TABLE';

// -------------> dml
"insert"      return 'TK_INSERT';
"into"        return 'TK_INTO';
"values"      return 'TK_VALUES';

// -------------> bloques
"begin"       return 'TK_BEGIN';
"end"         return 'TK_END';

// -----------> Declaracion variables
"declare"         return 'TK_DECLARE';
"default"         return 'TK_DEFAULT';

[a-zA-Z][a-zA-Z0-9_]*   return 'TK_IDENTIFICADOR';

[0-9]+               return 'TK_ENTERO';
[0-9]+("."[0-9]+)\b     return 'TK_DOUBLE';
(\d{4})-(\d{1,2})-(\d{1,2}) return 'TK_DATE';
["]                             {cadena="";this.begin("string");}
<string>[^"\\]+                 {cadena+=yytext;}
<string>"\\\""                  {cadena+="\"";}
<string>"\\n"                   {cadena+="\n";}
<string>"\\t"                   {cadena+="\t";}
<string>"\\\\"                  {cadena+="\\";}
<string>"\\\'"                  {cadena+="\'";}
<string>["]                     {yytext=cadena; this.popState(); return 'TK_VARCHAR';}


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}
/lex

%{
  // importar tipos
	const {Type} = require('./abstract/Return');
	const {FieldExpression} = require('./terminal/FieldExpression');
	const {LiteralExpression} = require('./terminal/LiteralExpression');

  //DDL
	const {CreateTableExpression} = require('./nonterminal/ddl/createTable/CreateTableExpression');
  const {add_column} = require('./nonterminal/ddl/alterTable/add_column');
  const {delete_column} =  require('./nonterminal/ddl/alterTable/delete_column');
  const {rename_to} = require("./nonterminal/ddl/alterTable/renameto");
  const {rename_column} = require("./nonterminal/ddl/alterTable/rename_column");
  const {delete_table} = require("./nonterminal/ddl/dropTable/deleteTable");

  //DML
  const {InsertExpression} = require('./nonterminal/dml/insert/InsertExpressions');

  //bloques
  const {bloque} = require('./nonterminal/Bloques/bloque');

  //Declaracion variables
  const {id} = require('./terminal/id');
  const {aritmetica} = require('./terminal/aritmetica');
  const {declaracion} = require('./nonterminal/declara_variables/Asignacion');

%}

// ------> Precedencia
%left 'TK_OR'
%left 'TK_ADD'
%right 'TK_NOT'
%left 'TK_IGUALACION' 'TK_DIFERENCIACION' 'TK_MENORQUE' 'TK_MENORIGUAL' 'TK_MAYORQUE' 'TK_MAYORIGUAL'
%left 'TK_MAS' 'TK_MENOS'
%left 'TK_POR' 'TK_DIV' 'TK_MODULO'
%right UMENOS

%start ini
%% /* Definición de la gramática */
/* CREATE TABLE Clientes ( 
	ID_Cliente INT,
	Nombre VARCHAR,
	CorreoElectronico VARCHAR
);
*/
ini
	: instrucciones EOF {return $1;}

;

instrucciones
	: instrucciones instruccion_global 	{ $1.push($2); $$ = $1; }
	| instruccion_global					{ $$ = [$1]; }
;

instruccion_global
	: ddl   TK_PTCOMA                     { $$ = $1; }
	| dml   TK_PTCOMA                     { $$ = $1; }
  | funciones TK_PTCOMA                 { $$ = $1; }
  | metodos TK_PTCOMA                   { $$ = $1; }
  | bloques TK_PTCOMA     { $$ = $1; }
//	| error TK_PTCOMA
  //	{   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);}
;

bloques
  : TK_BEGIN instrucciones_locales TK_END  { $$ = new bloque(@1.first_line, @1.first_column, $2); }
;

instrucciones_locales
  :instrucciones_locales instrucci_local   {  $$ = $1; $$.push($2); }
  |instrucci_local  { $$ = []; $$.push($1); }
;

instrucci_local
  :bloques TK_PTCOMA                  { $$ = $1; }
  |declaracion TK_PTCOMA              { $$ = $1; }
  |dml TK_PTCOMA                      { $$ = $1; }
  //|casteo
  //|llamadas
  //|nativas
  //|sentencias_control
  //|sebtencias_ciclicas
;

declaracion
  :TK_DECLARE atriutos_variables TK_DEFAULT exp   { $$ = new declaracion(@1.first_line, @1.first_column,$2,$4); }
;

atriutos_variables
  :TK_ARROBA TK_IDENTIFICADOR tipos { $$ = new FieldExpression(@1.first_line, @1.first_column,$2, $3); }
;

ddl
  :crearTabla { $$ = $1; }
  |alterTable { $$ = $1; }
  |dropTable  { $$ = $1; }
;

dropTable
  :TK_DROP TK_TABLE atributoTabla   {$$ = new delete_table(@1.first_line, @1.first_column, $3); }
;

alterTable
  :TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_ADD atributoTabla    {$$ = new add_column(@1.first_line, @1.first_column, $3, $5); }
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_DROP TK_COLUMN atributoTabla   {$$ = new delete_column(@1.first_line, @1.first_column, $3, $6); } 
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_RENAME TK_TO atributoTabla     {$$ = new rename_to(@1.first_line, @1.first_column, $3, $6); }
  |TK_ALTER TK_TABLE TK_IDENTIFICADOR TK_RENAME TK_COLUMN atributoTabla TK_TO atributoTabla    {$$ = new rename_column(@1.first_line, @1.first_column, $3, $6, $8); }
;

crearTabla
  : TK_CREATE TK_TABLE TK_IDENTIFICADOR TK_PARIZQ listaAtributosTabla TK_PARDER 
  { $$ = new CreateTableExpression(@1.first_line, @1.first_column,$3, $5); }
;

listaAtributosTabla
	: listaAtributosTabla TK_COMA atributoTabla { $1.push($3); $$ = $1;  }
  	| atributoTabla { $$ = [$1]; }
;

atributoTabla
  : TK_IDENTIFICADOR tipos { $$ = new FieldExpression(@1.first_line, @1.first_column,$1, $2); }
  | TK_IDENTIFICADOR {$$ = $1; }
;

// DML
dml
  : insertar { $$ = $1; }
;

insertar
	: TK_INSERT TK_INTO TK_IDENTIFICADOR TK_PARIZQ listaIDS TK_PARDER TK_VALUES TK_PARIZQ listaValores TK_PARDER
  	{ $$ = new InsertExpression(@1.first_line, @1.first_column,$3, $5,$9); }
;

listaIDS
  : listaIDS TK_COMA TK_IDENTIFICADOR { $1.push($3); $$ = $1;  }
  | TK_IDENTIFICADOR { $$ = [$1]; }
;

listaValores
  : listaValores TK_COMA valor { $1.push($3); $$ = $1;  }
  | valor { $$ = [$1]; }
;

exp 
  :exp TK_MAS exp     { $$ = new aritmetica(@1.first_line, @1.first_column, $1, '+', $3 ); }
  |exp TK_MENOS exp   { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "-", $3 ); }
  |exp TK_POR exp     { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "*", $3 ); }
  |exp TK_DIV exp     { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "/", $3 ); }
  |exp TK_MODULO exp  { $$ = new aritmetica(@1.first_line, @1.first_column, $1, "%", $3 ); }
  |TK_MENOS valor     { $$ = new LiteralExpression(@1.first_line, @1.first_column, $2, Type.NEGATIVE); }
  |valor              { $$ = $1; }
;

valor
  : TK_PARIZQ exp TK_PARDER {$$ = $2;}
  | TK_ENTERO { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.INT); }
  | TK_DOUBLE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.DOUBLE); }
  | TK_DATE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.DATE); }
  | TK_VARCHAR { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.VARCHAR); }
  | TK_TRUE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.BOOLEAN);}
  | TK_FALSE { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.BOOLEAN); }
  | TK_NULL { $$ = new LiteralExpression(@1.first_line, @1.first_column,$1, Type.NULL); }
  | TK_IDENTIFICADOR  { $$ = new id(@1.first_line, @1.first_column,$1); }
;

tipos
  : TK_TENTERO      { $$ = Type.INT; }
  | TK_TDOUBLE      { $$ = Type.DOUBLE; }
  | TK_TDATE        { $$ = Type.DATE; }
  | TK_TVARCHAR     { $$ = Type.VARCHAR; }
  | TK_TBOOLEAN     { $$ = Type.BOOLEAN; }
;

