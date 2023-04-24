/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.classNames = {}));
})(this, (function (exports) { 'use strict';

var hasOwn = {}.hasOwnProperty;
var nativeCodeString = '[native code]';

function classNames() {
	var classes = [];

	for (var i = 0; i < arguments.length; i++) {
		var arg = arguments[i];
		if (!arg) continue;

		var argType = typeof arg;

		if (argType === 'string' || argType === 'number') {
			classes.push(arg);
		} else if (Array.isArray(arg)) {
			if (arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			}
		} else if (argType === 'object') {
			if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
				classes.push(arg.toString());
				continue;
			}

			for (var key in arg) {
				if (hasOwn.call(arg, key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}

	return classes.join(' ');
}

exports.classNames = classNames;
exports.default = classNames;

Object.defineProperty(exports, '__esModule', { value: true });

}));