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
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,13],$V2=[1,12],$V3=[1,11],$V4=[1,14],$V5=[2,5,13,16,22,29],$V6=[1,27],$V7=[8,21,25,26],$V8=[25,26],$V9=[1,63],$Va=[1,64],$Vb=[1,65],$Vc=[1,66],$Vd=[1,67],$Ve=[1,68],$Vf=[1,69];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"instrucciones":4,"EOF":5,"instruccion":6,"ddl":7,"TK_PTCOMA":8,"dml":9,"crearTabla":10,"alterTable":11,"dropTable":12,"TK_DROP":13,"TK_TABLE":14,"atributoTabla":15,"TK_ALTER":16,"TK_IDENTIFICADOR":17,"TK_ADD":18,"TK_COLUMN":19,"TK_RENAME":20,"TK_TO":21,"TK_CREATE":22,"TK_PARIZQ":23,"listaAtributosTabla":24,"TK_PARDER":25,"TK_COMA":26,"tipos":27,"insertar":28,"TK_INSERT":29,"TK_INTO":30,"listaIDS":31,"TK_VALUES":32,"listaValores":33,"valor":34,"TK_ENTERO":35,"TK_DOUBLE":36,"TK_DATE":37,"TK_VARCHAR":38,"TK_TRUE":39,"TK_FALSE":40,"TK_NULL":41,"TK_TENTERO":42,"TK_TDOUBLE":43,"TK_TDATE":44,"TK_TVARCHAR":45,"TK_TBOOLEAN":46,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",8:"TK_PTCOMA",13:"TK_DROP",14:"TK_TABLE",16:"TK_ALTER",17:"TK_IDENTIFICADOR",18:"TK_ADD",19:"TK_COLUMN",20:"TK_RENAME",21:"TK_TO",22:"TK_CREATE",23:"TK_PARIZQ",25:"TK_PARDER",26:"TK_COMA",29:"TK_INSERT",30:"TK_INTO",32:"TK_VALUES",35:"TK_ENTERO",36:"TK_DOUBLE",37:"TK_DATE",38:"TK_VARCHAR",39:"TK_TRUE",40:"TK_FALSE",41:"TK_NULL",42:"TK_TENTERO",43:"TK_TDOUBLE",44:"TK_TDATE",45:"TK_TVARCHAR",46:"TK_TBOOLEAN"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[7,1],[7,1],[7,1],[12,3],[11,5],[11,6],[11,6],[11,8],[10,6],[24,3],[24,1],[15,2],[15,1],[9,1],[28,10],[31,3],[31,1],[33,3],[33,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[34,1],[27,1],[27,1],[27,1],[27,1],[27,1]],
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
case 3: case 17: case 23: case 25:
 this.$ = [$$[$0]]; 
break;
case 4: case 5:
 this.$ = $$[$0-1]; 
break;
case 6:
   console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column);
break;
case 7: case 8: case 9: case 20:
 this.$ = $$[$0]; 
break;
case 10:
this.$ = new delete_table(_$[$0-2].first_line, _$[$0-2].first_column, $$[$0]); 
break;
case 11:
this.$ = new add_column(_$[$0-4].first_line, _$[$0-4].first_column, $$[$0-2], $$[$0]); 
break;
case 12:
this.$ = new delete_column(_$[$0-5].first_line, _$[$0-5].first_column, $$[$0-3], $$[$0]); 
break;
case 13:
this.$ = new rename_to(_$[$0-5].first_line, _$[$0-5].first_column, $$[$0-3], $$[$0]); 
break;
case 14:
this.$ = new rename_column(_$[$0-7].first_line, _$[$0-7].first_column, $$[$0-5], $$[$0-2], $$[$0]); 
break;
case 15:
 this.$ = new CreateTableExpression(_$[$0-5].first_line, _$[$0-5].first_column,$$[$0-3], $$[$0-1]); 
break;
case 16: case 22: case 24:
 $$[$0-2].push($$[$0]); this.$ = $$[$0-2];  
break;
case 18:
 this.$ = new FieldExpression(_$[$0-1].first_line, _$[$0-1].first_column,$$[$0-1], $$[$0]); 
break;
case 19:
this.$ = $$[$0]
break;
case 21:
 this.$ = new InsertExpression(_$[$0-9].first_line, _$[$0-9].first_column,$$[$0-7], $$[$0-5],$$[$0-1]); 
break;
case 26:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.INT); 
break;
case 27:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.DOUBLE); 
break;
case 28:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.DATE); 
break;
case 29:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.VARCHAR); 
break;
case 30:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.BOOLEAN);
break;
case 31:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.BOOLEAN); 
break;
case 32:
 this.$ = new LiteralExpression(_$[$0].first_line, _$[$0].first_column,$$[$0], Type.NULL); 
break;
case 33:
 this.$ = Type.INT; 
break;
case 34:
 this.$ = Type.DOUBLE; 
break;
case 35:
 this.$ = Type.DATE; 
break;
case 36:
 this.$ = Type.VARCHAR; 
break;
case 37:
 this.$ = Type.BOOLEAN; 
break;
}
},
table: [{2:$V0,3:1,4:2,6:3,7:4,9:5,10:7,11:8,12:9,13:$V1,16:$V2,22:$V3,28:10,29:$V4},{1:[3]},{2:$V0,5:[1,15],6:16,7:4,9:5,10:7,11:8,12:9,13:$V1,16:$V2,22:$V3,28:10,29:$V4},o($V5,[2,3]),{8:[1,17]},{8:[1,18]},{8:[1,19]},{8:[2,7]},{8:[2,8]},{8:[2,9]},{8:[2,20]},{14:[1,20]},{14:[1,21]},{14:[1,22]},{30:[1,23]},{1:[2,1]},o($V5,[2,2]),o($V5,[2,4]),o($V5,[2,5]),o($V5,[2,6]),{17:[1,24]},{17:[1,25]},{15:26,17:$V6},{17:[1,28]},{23:[1,29]},{13:[1,31],18:[1,30],20:[1,32]},{8:[2,10]},o($V7,[2,19],{27:33,42:[1,34],43:[1,35],44:[1,36],45:[1,37],46:[1,38]}),{23:[1,39]},{15:41,17:$V6,24:40},{15:42,17:$V6},{19:[1,43]},{19:[1,45],21:[1,44]},o($V7,[2,18]),o($V7,[2,33]),o($V7,[2,34]),o($V7,[2,35]),o($V7,[2,36]),o($V7,[2,37]),{17:[1,47],31:46},{25:[1,48],26:[1,49]},o($V8,[2,17]),{8:[2,11]},{15:50,17:$V6},{15:51,17:$V6},{15:52,17:$V6},{25:[1,53],26:[1,54]},o($V8,[2,23]),{8:[2,15]},{15:55,17:$V6},{8:[2,12]},{8:[2,13]},{21:[1,56]},{32:[1,57]},{17:[1,58]},o($V8,[2,16]),{15:59,17:$V6},{23:[1,60]},o($V8,[2,22]),{8:[2,14]},{33:61,34:62,35:$V9,36:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf},{25:[1,70],26:[1,71]},o($V8,[2,25]),o($V8,[2,26]),o($V8,[2,27]),o($V8,[2,28]),o($V8,[2,29]),o($V8,[2,30]),o($V8,[2,31]),o($V8,[2,32]),{8:[2,21]},{34:72,35:$V9,36:$Va,37:$Vb,38:$Vc,39:$Vd,40:$Ve,41:$Vf},o($V8,[2,24])],
defaultActions: {7:[2,7],8:[2,8],9:[2,9],10:[2,20],15:[2,1],26:[2,10],42:[2,11],48:[2,15],50:[2,12],51:[2,13],59:[2,14],70:[2,21]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
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

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};

  // importar tipos
	const {Type} = require('./abstract/Return');
	const {FieldExpression} = require('./terminal/FieldExpression');
	const {CreateTableExpression} = require('./nonterminal/ddl/createTable/CreateTableExpression');
  const {add_column} = require('./nonterminal/ddl/alterTable/add_column');
  const {delete_column} =  require('./nonterminal/ddl/alterTable/delete_column');
  const {rename_to} = require("./nonterminal/ddl/alterTable/renameto");
  const {rename_column} = require("./nonterminal/ddl/alterTable/rename_column");
  const {delete_table} = require("./nonterminal/ddl/dropTable/deleteTable");
	const {LiteralExpression} = require('./terminal/LiteralExpression');
  const {InsertExpression} = require('./nonterminal/dml/insert/InsertExpressions');

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
case 5:return 23;
break;
case 6:return 25;
break;
case 7:return 'TK_PUNTO';
break;
case 8:return 'TK_DOSPUNTOS';
break;
case 9:return 26;
break;
case 10:return 'TK_CORIZR';
break;
case 11:return 'TK_CORDER';
break;
case 12:return 'TK_LLAVEIZQ';
break;
case 13:return "TK_LLAVEDER";
break;
case 14:return 'TK_IGUALACION';
break;
case 15:return 'TK_DIFERENCIACION';
break;
case 16:return 'TK_MENORQUE';
break;
case 17:return 'TK_MENORIGUAL';
break;
case 18:return 'TK_MAYORQUE';
break;
case 19:return 'TK_MAYORIGUAL';
break;
case 20:return 42;
break;
case 21:return 43;
break;
case 22:return 44;
break;
case 23:return 45;
break;
case 24:return 46;
break;
case 25:return 39;
break;
case 26:return 40;
break;
case 27:return 41;
break;
case 28:return 22;
break;
case 29:return 16;
break;
case 30:return 18;
break;
case 31:return 13;
break;
case 32:return 20;
break;
case 33:return 21;
break;
case 34:return 19;
break;
case 35:return 14;
break;
case 36:return 29;
break;
case 37:return 30;
break;
case 38:return 32;
break;
case 39:return 17;
break;
case 40:return 35;
break;
case 41:return 36;
break;
case 42:return 37;
break;
case 43:cadena="";this.begin("string");
break;
case 44:cadena+=yy_.yytext;
break;
case 45:cadena+="\"";
break;
case 46:cadena+="\n";
break;
case 47:cadena+="\t";
break;
case 48:cadena+="\\";
break;
case 49:cadena+="\'";
break;
case 50:yy_.yytext=cadena; this.popState(); return 38;
break;
case 51:return 5;
break;
case 52: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
break;
}
},
rules: [/^(?:[ \r\t]+)/i,/^(?:\n)/i,/^(?:(--).*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:;)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\.)/i,/^(?::)/i,/^(?:,)/i,/^(?:\[)/i,/^(?:\])/i,/^(?:\{)/i,/^(?:\})/i,/^(?:=)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:date\b)/i,/^(?:varchar\b)/i,/^(?:boolean\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:null\b)/i,/^(?:create\b)/i,/^(?:alter\b)/i,/^(?:add\b)/i,/^(?:drop\b)/i,/^(?:rename\b)/i,/^(?:to\b)/i,/^(?:column\b)/i,/^(?:table\b)/i,/^(?:insert\b)/i,/^(?:into\b)/i,/^(?:values\b)/i,/^(?:[a-zA-Z][a-zA-Z0-9_]*)/i,/^(?:[0-9]+\b)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:(\d{4})(\d{1,2})(\d{1,2}))/i,/^(?:["])/i,/^(?:[^"\\]+)/i,/^(?:\\")/i,/^(?:\\n)/i,/^(?:\\t)/i,/^(?:\\\\)/i,/^(?:\\\\')/i,/^(?:["])/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"string":{"rules":[44,45,46,47,48,49,50],"inclusive":false},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,51,52],"inclusive":true}}
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