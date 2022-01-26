/**
 * Author: bl0cknumber <bl0cknumber@protonmail.com>
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// sharpPattern issue:
// not using REGEX /{pattern}/flags directly because there is problem with .test() result
// when calling multiple render()
var sharpPattern = "{#([^}]*)([^{]*)#}",
  emptySpacesFilter = /\s*[\r\n]+\s*/g;

/**
 * Execute sharp code data
 * @param {string} stringData
 * @returns {object}
 * @example
 * execute(sharp);
 */
function execute(stringData) {
  try {
    var strFn = `return ( function () { return ${stringData} } )`;
    const fn = new Function(strFn)();
    return fn() || stringData;
  } catch (e) {
    return stringData;
  }
}

/**
 * Convert sharp code to function
 * @param {string} str
 * @returns {object}
 * @example
 * const { fn, code } = convToFn("{# return "Hello" #}");
 */
function compileToString(str) {
  const regex = new RegExp(sharpPattern, "gm");

  if (!regex.test(str)) {
    throw new Error(`${str.toString()} -> this is not valid sharp syntax!`);
  }

  const oneLineString = emptySpacesFilter.exec(str)?.input || str;

  let sharps = oneLineString.split(regex);

  sharps = sharps.map((sharp) => {
    return execute(sharp);
  });

  return sharps.join("");
}

/**
 * Render sharp code
 * @typedef {Object} CompileReturn
 * @property {any} value - return any values from compile time
 * @property {string} code - return code typeof string
 *
 * @param {string} str
 * @returns {CompileReturn}
 * @example
 * const value = render(`{# 1 + 1 #}`);
 */
function render(str) {
  // DO NOT EXECUTE. if string is empty || falsy values.
  const compiledString = !str || compileToString(str);
  return compiledString;
}

export default { render };
export { render };
