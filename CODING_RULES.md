# <a name="top"></a> Coding Rules
For simplicity, we've divided our coding rules using the same categories as the ESLint documentation.

- [Possible Errors](#errors)
- [Best Practices](#best)
- [Strict Mode](#strict)
- [Variables](#variables)
- [Node.js](#node)
- [Stylistic Issues](#style)

## <a name="errros"></a> Possible Errors
The following rules point out areas where you might have made mistakes.

* [comma-dangle] - enforce trailing commas
* [no-control-regex] - disallow control characters in regular expressions
* [no-debugger] - disallow use of debugger
* [no-dupe-keys] - disallow duplicate keys when creating object literals
* [no-empty] - disallow empty statements
* [no-empty-class] - disallow the use of empty character classes in regular expressions
* [no-ex-assign] - disallow assigning to the exception in a `catch block
* [no-func-assign] - disallow overwriting functions written as function declarations
* [no-unreachable] - disallow unreachable statements after a return, throw, continue, or break statement
* [no-obj-calls] - disallow the use of object properties of the global object (`Math` and `JSON`) as functions
* [no-regex-spaces] - disallow multiple spaces in a regular expression literal
* [use-isnan] - disallow comparisons with the value `NaN`
* [valid-typeof] - Ensure that the results of `typeof` are compared against a valid string

[Back to Top](#top)

## <a name="best"></a> Best Practices
These are rules designed to prevent you from making mistakes.

* [no-caller] - disallow use of `arguments.caller` or `arguments.callee`
* [no-div-regex] - disallow division operators explicitly at beginning of regular expression
* [no-else-return] - disallow `else` after a `return` in an `if`
* [no-eq-null] - disallow comparisons to null without a type-checking operator
* [no-eval] - disallow use of `eval()`
* [no-floating-decimal] - disallow the use of leading or trailing decimal points in numeric literals
* [no-implied-eval] - disallow use of `eval()`-like methods
* [no-with] - disallow use of the `with` statement
* [no-fallthrough] - disallow fallthrough of case statements
* [no-unused-expressions] - disallow usage of expressions in statement position
* [no-octal] - disallow use of octal literals
* [no-octal-escape] - disallow use of octal escape sequences in string literals, such as `var foo = "Copyright \251";`
* [no-multi-str] - disallow use of multiline strings
* [no-new-wrappers] - disallows creating new instances of `String`, `Number`, and `Boolean`
* [no-new] - disallow use of new operator when not part of the assignment or comparison
* [no-new-func] - disallow use of new operator for `Function` object
* [no-native-reassign] - disallow reassignments of native objects
* [no-return-assign] - disallow use of assignment in return statement
* [no-self-compare] - disallow comparisons where both sides are exactly the same
* [no-loop-func] - disallow creation of functions within loops
* [no-empty-label] - disallow use of labels for anything other then loops and switches
* [no-script-url] - disallow use of javascript: urls.
* [no-proto] - disallow usage of `__proto__` property
* [no-iterator] - disallow usage of `__iterator__` property
* [no-redeclare] - disallow declaring the same variable more then once
* [curly] - specify curly brace conventions for all control statements
* [dot-notation] - encourages use of dot notation whenever possible
* [eqeqeq] - require the use of `===` and `!==`
* [wrap-iife] - require immediate function invocation to be wrapped in parentheses

[Back to Top](#top)

## <a name="strict"></a> Strict Mode
These rules relate to using strict mode.

- [strict] - ensures all code is in strict mode and that there are no extraneous Use Strict Directives


[Back to Top](#top)

## <a name="variables"></a> Variables
These rules have to do with variable declarations.

* [no-catch-shadow] - disallow the catch clause parameter name being the same as a variable in the outer scope
* [no-undef] - disallow use of undeclared variables unless mentioned in a `/*global */` block
* [no-undef-init] - disallow use of undefined when initializing variables
* [no-delete-var] - disallow deletion of variables
* [no-label-var] - disallow labels that share a name with a variable
* [no-unused-vars] - disallow declaration of variables that are not used in the code
* [no-shadow] - disallow declaration of variables already declared in the outer scope
* [no-use-before-define] - disallow use of variables before they are defined

[Back to Top](#top)

## <a name="node"></a> Node.js
These rules are specific to JavaScript running on Node.js.

* [no-sync] - disallow use of synchronous methods
* [no-mixed-requires] - allow mixing regular variable and require declarations

[Back to Top](#top)

## <a name="style"></a> Stylistic Issues

* [no-array-constructor] - disallow use of the `Array` `constructor
* [no-new-object] - disallow use of the `Object constructor`
* [no-wrap-func] - disallow wrapping of non-IIFE statements in parens
* [brace-style] - enforce one true brace style
* [camelcase] - require camel case names
* [consistent-this] - enforces consistent naming when capturing the current execution context
* [new-cap] - require a capital letter for constructors
* [new-parens] - disallow the omission of parentheses when invoking a constructor with no arguments
* [quotes] - specify whether double or single quotes should be used
* [semi] - require use of semicolons instead of ASI
* [no-mixed-spaces-and-tabs] - disallow mixed spaces and tabs for indentation
* [indent] - 4 spaces indentation with enabled switch cases validation
 
[Back to Top](#top)

[comma-dangle]: http://eslint.org/docs/rules/comma-dangle.html
[no-control-regex]: http://eslint.org/docs/rules/no-control-regex.html
[no-debugger]: http://eslint.org/docs/rules/no-debugger.html
[no-dupe-keys]: http://eslint.org/docs/rules/no-dupe-keys.html
[no-empty]: http://eslint.org/docs/rules/no-empty.html
[no-empty-class]: http://eslint.org/docs/rules/no-empty-class.html
[no-ex-assign]: http://eslint.org/docs/rules/no-ex-assign.html
[no-func-assign]: http://eslint.org/docs/rules/no-func-assign.html
[no-unreachable]: http://eslint.org/docs/rules/no-unreachable.html
[no-obj-calls]: http://eslint.org/docs/rules/no-obj-calls.html
[no-regex-spaces]: http://eslint.org/docs/rules/no-regex-spaces.html
[use-isnan]: http://eslint.org/docs/rules/use-isnan.html
[valid-typeof]: http://eslint.org/docs/rules/valid-typeof.html

[no-caller]: http://eslint.org/docs/rules/no-caller.html
[no-div-regex]: http://eslint.org/docs/rules/no-div-regex.html
[no-else-return]: http://eslint.org/docs/rules/no-else-return.html
[no-eq-null]: http://eslint.org/docs/rules/no-eq-null.html
[no-eval]: http://eslint.org/docs/rules/no-eval.html
[no-floating-decimal]: http://eslint.org/docs/rules/no-floating-decimal.html
[no-implied-eval]: http://eslint.org/docs/rules/no-implied-eval.html
[no-with]: http://eslint.org/docs/rules/no-with.html
[no-fallthrough]: http://eslint.org/docs/rules/no-fallthrough.html
[no-unused-expressions]: http://eslint.org/docs/rules/no-unused-expressions.html
[no-octal]: http://eslint.org/docs/rules/no-octal.html
[no-octal-escape]: http://eslint.org/docs/rules/no-octal-escape.html
[no-multi-str]: http://eslint.org/docs/rules/no-multi-str.html
[no-new-wrappers]: http://eslint.org/docs/rules/no-new-wrappers.html
[no-new]: http://eslint.org/docs/rules/no-new.html
[no-new-func]: http://eslint.org/docs/rules/no-new-func.html
[no-native-reassign]: http://eslint.org/docs/rules/no-native-reassign.html
[no-return-assign]: http://eslint.org/docs/rules/no-return-assign.html
[no-self-compare]: http://eslint.org/docs/rules/no-self-compare.html
[no-loop-func]: http://eslint.org/docs/rules/no-loop-func.html
[no-empty-label]: http://eslint.org/docs/rules/no-empty-label.html
[no-script-url]: http://eslint.org/docs/rules/no-script-url.html
[no-proto]: http://eslint.org/docs/rules/no-proto.html
[no-iterator]: http://eslint.org/docs/rules/no-iterator.html
[no-redeclare]: http://eslint.org/docs/rules/no-redeclare.html
[curly]: http://eslint.org/docs/rules/curly.html
[dot-notation]: http://eslint.org/docs/rules/dot-notation.html
[eqeqeq]: http://eslint.org/docs/rules/eqeqeq.html
[wrap-iife]: http://eslint.org/docs/rules/wrap-iife.html

[strict]: http://eslint.org/docs/rules/strict.html

[no-catch-shadow]: http://eslint.org/docs/rules/no-catch-shadow.html
[no-undef]: http://eslint.org/docs/rules/no-undef.html
[no-undef-init]: http://eslint.org/docs/rules/no-undef-init.html
[no-delete-var]: http://eslint.org/docs/rules/no-delete-var.html
[no-label-var]: http://eslint.org/docs/rules/no-label-var.html
[no-unused-vars]: http://eslint.org/docs/rules/no-unused-vars.html
[no-shadow]: http://eslint.org/docs/rules/no-shadow.html
[no-use-before-define]: http://eslint.org/docs/rules/no-use-before-define.html

[no-sync]: http://eslint.org/docs/rules/no-sync.html
[no-mixed-requires]: http://eslint.org/docs/rules/no-mixed-requires.html

[no-array-constructor]: http://eslint.org/docs/rules/no-array-constructor.html
[no-new-object]: http://eslint.org/docs/rules/no-new-object.html
[no-wrap-func]: http://eslint.org/docs/rules/no-wrap-func.html
[brace-style]: http://eslint.org/docs/rules/brace-style.html
[camelcase]: http://eslint.org/docs/rules/camelcase.html
[consistent-this]: http://eslint.org/docs/rules/consistent-this.html
[new-cap]: http://eslint.org/docs/rules/new-cap.html
[new-parens]: http://eslint.org/docs/rules/new-parens.html
[quotes]: http://eslint.org/docs/rules/quotes.html
[semi]: http://eslint.org/docs/rules/semi.html
[no-mixed-spaces-and-tabs]: http://eslint.org/docs/rules/no-mixed-spaces-and-tabs.html
[indent]: http://eslint.org/docs/rules/indent.html
[no-underscore-dangle]: http://eslint.org/docs/rules/no-underscore-dangle.html
