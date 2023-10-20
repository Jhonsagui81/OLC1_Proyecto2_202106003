/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var grammar = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,12],$V1=[1,15],$V2=[1,14],$V3=[1,13],$V4=[1,17],$V5=[1,16],$V6=[5,11,28,31,36,43,51],$V7=[1,28],$V8=[1,29],$V9=[11,13,16,20,43,51],$Va=[1,48],$Vb=[40,45],$Vc=[8,35,39,40],$Vd=[1,61],$Ve=[1,62],$Vf=[1,63],$Vg=[1,64],$Vh=[1,65],$Vi=[1,81],$Vj=[1,73],$Vk=[1,71],$Vl=[1,74],$Vm=[1,75],$Vn=[1,76],$Vo=[1,77],$Vp=[1,78],$Vq=[1,79],$Vr=[1,80],$Vs=[8,18,35,39,40],$Vt=[1,96],$Vu=[1,94],$Vv=[1,95],$Vw=[1,97],$Vx=[1,98],$Vy=[8,39,46,57,58,59,60],$Vz=[8,39,40,46,57,58,59,60],$VA=[39,40],$VB=[1,122],$VC=[1,123],$VD=[1,124],$VE=[1,125],$VF=[1,126],$VG=[1,127],$VH=[1,128],$VI=[1,129],$VJ=[1,130],$VK=[8,39,57,58],$VL=[22,37,58,61,62,63,64,65,66,67];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"instrucciones":4,"EOF":5,"instruccion_global":6,"ddl":7,"TK_PTCOMA":8,"dml":9,"bloques":10,"TK_BEGIN":11,"instrucciones_locales":12,"TK_END":13,"instrucci_local":14,"declaracion":15,"TK_DECLARE":16,"atriutos_variables":17,"TK_DEFAULT":18,"exp":19,"TK_SET":20,"TK_ARROBA":21,"TK_IDENTIFICADOR":22,"TK_IGUALACION":23,"tipos":24,"crearTabla":25,"alterTable":26,"dropTable":27,"TK_DROP":28,"TK_TABLE":29,"atributoTabla":30,"TK_ALTER":31,"TK_ADD":32,"TK_COLUMN":33,"TK_RENAME":34,"TK_TO":35,"TK_CREATE":36,"TK_PARIZQ":37,"listaAtributosTabla":38,"TK_PARDER":39,"TK_COMA":40,"insertar":41,"select":42,"TK_SELECT":43,"lista_columnas":44,"TK_FROM":45,"TK_POR":46,"TK_WHERE":47,"relacionales":48,"nativas":49,"TK_AS":50,"TK_INSERT":51,"TK_INTO":52,"listaIDS":53,"TK_VALUES":54,"listaValores":55,"valor":56,"TK_MAS":57,"TK_MENOS":58,"TK_DIV":59,"TK_MODULO":60,"TK_ENTERO":61,"TK_DOUBLE":62,"TK_DATE":63,"TK_VARCHAR":64,"TK_TRUE":65,"TK_FALSE":66,"TK_NULL":67,"TK_TENTERO":68,"TK_TDOUBLE":69,"TK_TDATE":70,"TK_TVARCHAR":71,"TK_TBOOLEAN":72,"TK_DIFERENCIACION":73,"TK_MENORQUE":74,"TK_MENORIGUAL":75,"TK_MAYORQUE":76,"TK_MAYORIGUAL":77,"TK_OR":78,"TK_AND":79,"TK_NOT":80,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"TK_PTCOMA",11:"TK_BEGIN",13:"TK_END",16:"TK_DECLARE",18:"TK_DEFAULT",20:"TK_SET",21:"TK_ARROBA",22:"TK_IDENTIFICADOR",23:"TK_IGUALACION",28:"TK_DROP",29:"TK_TABLE",31:"TK_ALTER",32:"TK_ADD",33:"TK_COLUMN",34:"TK_RENAME",35:"TK_TO",36:"TK_CREATE",37:"TK_PARIZQ",39:"TK_PARDER",40:"TK_COMA",43:"TK_SELECT",45:"TK_FROM",46:"TK_POR",47:"TK_WHERE",50:"TK_AS",51:"TK_INSERT",52:"TK_INTO",54:"TK_VALUES",57:"TK_MAS",58:"TK_MENOS",59:"TK_DIV",60:"TK_MODULO",61:"TK_ENTERO",62:"TK_DOUBLE",63:"TK_DATE",64:"TK_VARCHAR",65:"TK_TRUE",66:"TK_FALSE",67:"TK_NULL",68:"TK_TENTERO",69:"TK_TDOUBLE",70:"TK_TDATE",71:"TK_TVARCHAR",72:"TK_TBOOLEAN",73:"TK_DIFERENCIACION",74:"TK_MENORQUE",75:"TK_MENORIGUAL",76:"TK_MAYORQUE",77:"TK_MAYORIGUAL",78:"TK_OR",79:"TK_AND",80:"TK_NOT"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[10,3],[12,2],[12,1],[14,2],[14,2],[14,2],[15,4],[15,2],[15,5],[17,3],[7,1],[7,1],[7,1],[27,3],[26,5],[26,6],[26,6],[26,8],[25,6],[38,3],[38,1],[30,2],[30,1],[9,1],[9,1],[42,4],[42,4],[42,8],[42,8],[44,3],[44,1],[49,5],[41,10],[53,3],[53,1],[55,3],[55,1],[19,3],[19,3],[19,3],[19,3],[19,3],[19,2],[19,1],[56,3],[56,1],[56,1],[56,1],[56,1],[56,1],[56,1],[56,1],[56,1],[24,1],[24,1],[24,1],[24,1],[24,1],[48,1],[48,1],[48,1],[48,1],[48,1],[48,1],[48,1],[48,1],[48,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
 $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
break;
case 3: case 27: case 41: case 43:
 this.$ = [$$[$0]]; 
break;
case 4: case 5: case 6: case 10: case 11: case 12:
 this.$ = $$[$0-1]; 
break;
case 7:
 this.$ = new bloque(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-1]); 
break;
case 8:
  this.$ = $$[$0-1]; this.$.push($$[$0]); 
break;
case 9: case 37:
 this.$ = []; this.$.push($$[$0]); 
break;
case 13:
 this.$ = new declaracion(_$[$0-3].first_line, _$[$0-3].first_column, $$[$0-2],$$[$0]); 
break;
case 14:
 this.$ = new una_variable(_$[$0-1].first_line, _$[$0-1].first_column, $$[$0] ); 
break;
case 15:
 this.$ = new set(_$[$0-4].first_line, _$[$0-4].first_column, $$[$0-2], $$[$0]); 
break;
case 16:
 this.$ = new FieldExpression(_$[$0-2].first_line, _$[$0-2].first_column,$$[$0-1], $$[$0]); 
break;
case 17: case 18: case 19: case 30: case 31: case 50: case 65: case 66: case 67: case 68: case 69: case 70: case 71: case 72: case 73:
 this.$ = $$[$0]; 
break;
case 20:
this.$ = new delete_table(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0]); 
break;
case 21:
this.$ = new add_column(_$[$0-4].first_line, _$[$0-4].first_column, $$[$0-2], $$[$0]); 
break;
case 22:
this.$ = new delete_column(_$[$0-5].first_line, _$[$0-5].first_column, $$[$0-3], $$[$0]); 
break;
case 23:
this.$ = new rename_to(_$[$0-5].first_line, _$[$0-5].first_column, $$[$0-3], $$[$0]); 
break;
case 24:
this.$ = new rename_column(_$[$0-7].first_line, _$[$0-7].first_column, $$[$0-5], $$[$0-2], $$[$0]); 
break;
case 25:
 this.$ = new CreateTableExpression(_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-3], $$[$0-1]); 
break;
case 26: case 40: case 42:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];  
break;
case 28:
 this.$ = new FieldExpression(_$[$0-1].first_line, _$[$0-1].first_column,$$[$0-1], $$[$0]); 
break;
case 29:
this.$ = $$[$0]; 
break;
case 32:
 this.$ = new simple_select(_$[$0-3].first_line, _$[$0-3].first_column, $$[$0-2], $$[$0] ); 
break;
case 33:
 this.$ = new short_select();  
break;
case 34:
 this.$ = new where_select();  
break;
case 35:
 this.$ = new where_select_column();
break;
case 36:
 this.$ = $$[$0-2]; this.$.push($$[$0]); 
break;
case 38:
 this.$ = new imprimir_Valor_var(); 
break;
case 39:
 this.$ = new InsertExpression(_$[$0-9].first_line, _$[$0-9].first_column,$$[$0-7], $$[$0-5],$$[$0-1]); 
break;
case 44:
 this.$ = new aritmetica(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], '+', $$[$0] ); 
break;
case 45:
 this.$ = new aritmetica(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], "-", $$[$0] ); 
break;
case 46:
 this.$ = new aritmetica(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], "*", $$[$0] ); 
break;
case 47:
 this.$ = new aritmetica(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], "/", $$[$0] ); 
break;
case 48:
 this.$ = new aritmetica(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0-2], "%", $$[$0] ); 
break;
case 49:
 this.$ = new LiteralExpression(_$[$0-1].first_line, _$[$0-1].first_column, $$[$0], Type.NEGATIVE); 
break;
case 51:
this.$ = $$[$0-1];
break;
case 52:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.INT); 
break;
case 53:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.DOUBLE); 
break;
case 54:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.DATE); 
break;
case 55:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.VARCHAR); 
break;
case 56:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.BOOLEAN);
break;
case 57:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.BOOLEAN); 
break;
case 58:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.NULL); 
break;
case 59:
 this.$ = new id(_$[$0].first_line, _$[$0].first_column,$$[$0]); 
break;
case 60:
 this.$ = Type.INT; 
break;
case 61:
 this.$ = Type.DOUBLE; 
break;
case 62:
 this.$ = Type.DATE; 
break;
case 63:
 this.$ = Type.VARCHAR; 
break;
case 64:
 this.$ = Type.BOOLEAN; 
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,10:6,11:$V0,25:7,26:8,27:9,28:$V1,31:$V2,36:$V3,41:10,42:11,43:$V4,51:$V5},{1:[3]},{5:[1,18],6:19,7:4,9:5,10:6,11:$V0,25:7,26:8,27:9,28:$V1,31:$V2,36:$V3,41:10,42:11,43:$V4,51:$V5},o($V6,[2,3]),{8:[1,20]},{8:[1,21]},{8:[1,22]},{8:[2,17]},{8:[2,18]},{8:[2,19]},{8:[2,30]},{8:[2,31]},{9:27,10:25,11:$V0,12:23,14:24,15:26,16:$V7,20:$V8,41:10,42:11,43:$V4,51:$V5},{29:[1,30]},{29:[1,31]},{29:[1,32]},{52:[1,33]},{22:[1,36],44:34,46:[1,35]},{1:[2,1]},o($V6,[2,2]),o($V6,[2,4]),o($V6,[2,5]),o($V6,[2,6]),{9:27,10:25,11:$V0,13:[1,37],14:38,15:26,16:$V7,20:$V8,41:10,42:11,43:$V4,51:$V5},o($V9,[2,9]),{8:[1,39]},{8:[1,40]},{8:[1,41]},{17:42,21:[1,43]},{21:[1,44]},{22:[1,45]},{22:[1,46]},{22:$Va,30:47},{22:[1,49]},{40:[1,51],45:[1,50]},{45:[1,52]},o($Vb,[2,37]),{8:[2,7]},o($V9,[2,8]),o($V9,[2,10]),o($V9,[2,11]),o($V9,[2,12]),{8:[2,14],18:[1,53]},{22:[1,54]},{22:[1,55]},{37:[1,56]},{28:[1,58],32:[1,57],34:[1,59]},{8:[2,20]},o($Vc,[2,29],{24:60,68:$Vd,69:$Ve,70:$Vf,71:$Vg,72:$Vh}),{37:[1,66]},{22:[1,67]},{22:[1,68]},{22:[1,69]},{19:70,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{24:82,68:$Vd,69:$Ve,70:$Vf,71:$Vg,72:$Vh},{23:[1,83]},{22:$Va,30:85,38:84},{22:$Va,30:86},{33:[1,87]},{33:[1,89],35:[1,88]},o($Vc,[2,28]),o($Vs,[2,60]),o($Vs,[2,61]),o($Vs,[2,62]),o($Vs,[2,63]),o($Vs,[2,64]),{22:[1,91],53:90},{8:[2,32],47:[1,92]},o($Vb,[2,36]),{8:[2,33],47:[1,93]},{8:[2,13],46:$Vt,57:$Vu,58:$Vv,59:$Vw,60:$Vx},{22:$Vi,37:$Vj,56:99,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},o($Vy,[2,50]),{19:100,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},o($Vz,[2,52]),o($Vz,[2,53]),o($Vz,[2,54]),o($Vz,[2,55]),o($Vz,[2,56]),o($Vz,[2,57]),o($Vz,[2,58]),o($Vz,[2,59]),o([8,18],[2,16]),{19:101,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{39:[1,102],40:[1,103]},o($VA,[2,27]),{8:[2,21]},{22:$Va,30:104},{22:$Va,30:105},{22:$Va,30:106},{39:[1,107],40:[1,108]},o($VA,[2,41]),{22:[1,109]},{22:[1,110]},{19:111,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{19:112,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{19:113,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{19:114,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{19:115,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},o($Vy,[2,49]),{39:[1,116],46:$Vt,57:$Vu,58:$Vv,59:$Vw,60:$Vx},{8:[2,15],46:$Vt,57:$Vu,58:$Vv,59:$Vw,60:$Vx},{8:[2,25]},{22:$Va,30:117},{8:[2,22]},{8:[2,23]},{35:[1,118]},{54:[1,119]},{22:[1,120]},{23:$VB,48:121,73:$VC,74:$VD,75:$VE,76:$VF,77:$VG,78:$VH,79:$VI,80:$VJ},{23:$VB,48:131,73:$VC,74:$VD,75:$VE,76:$VF,77:$VG,78:$VH,79:$VI,80:$VJ},o($VK,[2,44],{46:$Vt,59:$Vw,60:$Vx}),o($VK,[2,45],{46:$Vt,59:$Vw,60:$Vx}),o($Vy,[2,46]),o($Vy,[2,47]),o($Vy,[2,48]),o($Vz,[2,51]),o($VA,[2,26]),{22:$Va,30:132},{37:[1,133]},o($VA,[2,40]),{19:134,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},o($VL,[2,65]),o($VL,[2,66]),o($VL,[2,67]),o($VL,[2,68]),o($VL,[2,69]),o($VL,[2,70]),o($VL,[2,71]),o($VL,[2,72]),o($VL,[2,73]),{19:135,22:$Vi,37:$Vj,56:72,58:$Vk,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{8:[2,24]},{22:$Vi,37:$Vj,55:136,56:137,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},{8:[2,35],46:$Vt,57:$Vu,58:$Vv,59:$Vw,60:$Vx},{8:[2,34],46:$Vt,57:$Vu,58:$Vv,59:$Vw,60:$Vx},{39:[1,138],40:[1,139]},o($VA,[2,43]),{8:[2,39]},{22:$Vi,37:$Vj,56:140,61:$Vl,62:$Vm,63:$Vn,64:$Vo,65:$Vp,66:$Vq,67:$Vr},o($VA,[2,42])],
defaultActions: {7:[2,17],8:[2,18],9:[2,19],10:[2,30],11:[2,31],18:[2,1],37:[2,7],47:[2,20],86:[2,21],102:[2,25],104:[2,22],105:[2,23],132:[2,24],138:[2,39]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

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
  const {simple_select} = require('./nonterminal/dml/select/simple_select');

  //bloques
  const {bloque} = require('./nonterminal/Bloques/bloque');

  //Declaracion variables
  const {id} = require('./terminal/id');
  const {aritmetica} = require('./terminal/aritmetica');
  const {declaracion} = require('./nonterminal/declara_variables/default');
  const {una_variable} = require('./nonterminal/declara_variables/unica');
  const {set} = require('./nonterminal/declara_variables/set');
  const {varias_var} = require('./nonterminal/declara_variables/varias');

/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:
break;
case 1:
break;
case 2:
break;
case 3:
break;
case 4:return 8;
break;
case 5:return 37;
break;
case 6:return 39;
break;
case 7:return 'TK_PUNTO';
break;
case 8:return 'TK_DOSPUNTOS';
break;
case 9:return 40;
break;
case 10:return 'TK_CORIZR';
break;
case 11:return 'TK_CORDER';
break;
case 12:return 'TK_LLAVEIZQ';
break;
case 13:return "TK_LLAVEDER";
break;
case 14:return 23;
break;
case 15:return 73;
break;
case 16:return 74;
break;
case 17:return 75;
break;
case 18:return 76;
break;
case 19:return 77;
break;
case 20:return 21;
break;
case 21:return "TK_MAS";
break;
case 22:return "TK_MENOS";
break;
case 23:return "TK_POR";
break;
case 24:return "TK_DIV";
break;
case 25:return "TK_MODULO";
break;
case 26:return "TK_AND";
break;
case 27:return "TK_OR";
break;
case 28:return "TK_NOT"; 
break;
case 29:return 68;
break;
case 30:return 69;
break;
case 31:return 70;
break;
case 32:return 71;
break;
case 33:return 72;
break;
case 34:return 65;
break;
case 35:return 66;
break;
case 36:return 67;
break;
case 37:return 36;
break;
case 38:return 31;
break;
case 39:return 32;
break;
case 40:return 28;
break;
case 41:return 34;
break;
case 42:return 35;
break;
case 43:return 33;
break;
case 44:return 29;
break;
case 45:return 51;
break;
case 46:return 52;
break;
case 47:return 54;
break;
case 48:return 43;
break;
case 49:return 50;
break;
case 50:return 45;
break;
case 51:return 47;
break;
case 52:return 11;
break;
case 53:return 13;
break;
case 54:return 16;
break;
case 55:return 18;
break;
case 56:return 20;
break;
case 57:return 22;
break;
case 58:return 61;
break;
case 59:return 62;
break;
case 60:return 63;
break;
case 61:cadena="";this.begin("string");
break;
case 62:cadena+=yy_.yytext;
break;
case 63:cadena+="\"";
break;
case 64:cadena+="\n";
break;
case 65:cadena+="\t";
break;
case 66:cadena+="\\";
break;
case 67:cadena+="\'";
break;
case 68:yy_.yytext=cadena; this.popState(); return 64;
break;
case 69:return 5;
break;
case 70: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
break;
}
},
rules: [/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:(--).*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\.)/i,/^(?::)/i,/^(?:,)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:@)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:AND\b)/i,/^(?:OR\b)/i,/^(?:NOT\b)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:date\b)/i,/^(?:varchar\b)/i,/^(?:boolean\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:null\b)/i,/^(?:create\b)/i,/^(?:alter\b)/i,/^(?:add\b)/i,/^(?:drop\b)/i,/^(?:rename\b)/i,/^(?:to\b)/i,/^(?:column\b)/i,/^(?:table\b)/i,/^(?:insert\b)/i,/^(?:into\b)/i,/^(?:values\b)/i,/^(?:select\b)/i,/^(?:as\b)/i,/^(?:from\b)/i,/^(?:where\b)/i,/^(?:begin\b)/i,/^(?:end\b)/i,/^(?:declare\b)/i,/^(?:default\b)/i,/^(?:set\b)/i,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/i,/^(?:[0-9]+)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:(\d{4})(\d{1,2})(\d{1,2}))/i,/^(?:["])/i,/^(?:[^"\\]+)/i,/^(?:\\")/i,/^(?:\\n)/i,/^(?:\\t)/i,/^(?:\\\\)/i,/^(?:\\\\')/i,/^(?:["])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"string":{"rules":[62,63,64,65,66,67,68],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,69,70],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = grammar;
exports.Parser = grammar.Parser;
exports.parse = function () { return grammar.parse.apply(grammar, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}