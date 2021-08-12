let e = "";

const coverage = require("./Coverage.json");

const jsTokens = require("js-tokens");

let b = coverage.filter((i) => i.url.includes("mapshaper.simplify.mjs"))[0];

b.ranges.forEach(({ start, end }, index, array) => {
  e += b.text.substring(start, end); // + `\n`;
  // if(index === array.length - 1) return;

  // wu效区间
  const t = `${b.text.substring(end, array[index + 1]?.start || Infinity)}`;

// console.log(t)

// per block coverage

// if (t.startsWith(':')) {
  // e += ": 0 "
// } else if (t.startsWith('?')) {
//   e += "? 0 "
// } else if (t.startsWith('&&')) {
//   e += "&& 0 "
// } else if (t.startsWith('||')) {
//   e += "|| 0 "
// } else 
// if (t.startsWith('else')) {
//   e += "else {} "
// } else if (t.startsWith('{') && t.endsWith('}')) {
//   e += "{} "
// } else 
if (t.startsWith('get') && t.endsWith('}')) {
  // console.log(t)
  e += "get a(){} "

  
} else
 {
    // per function coverage
    let param = 0;
    let paramEnd = 0;
    let block = 0;
    let blockEnd = 0;
    let inFunction = false;
    let inFunctionBody = false;
    let inFunctionParam = false;
    // let inString = false

    // _t.forEach((char, index) => {

    // })

    for (const token of jsTokens(t)) {
      // console.log(token);

      if (token.closed === false) {
        console.warn("token.closed === false");
      }

      if (token.type === "IdentifierName" && token.value === "function") {
        inFunction = true;
      }

      if (
        inFunction &&
        !inFunctionBody &&
        token.type === "Punctuator" &&
        token.value === "("
      ) {
        param++;
      }

      if (
        inFunction &&
        !inFunctionBody &&
        token.type === "Punctuator" &&
        token.value === ")"
      ) {
        paramEnd++;
      }

      if (inFunction && token.type === "Punctuator" && token.value === "{") {
        block++;
      }

      if (inFunction && token.type === "Punctuator" && token.value === "}") {
        blockEnd++;

        // if (blockEnd === block) {
        //   end = pointer;
        //   inFunction = false;
        // }
      }

      if (block > blockEnd && token.value !== "{") {
        inFunctionBody = true;
      }

      if (block === blockEnd && block > 0 && token.value === "}") {
        inFunctionBody = false;
        inFunction = false;
      }

      if (
        inFunction &&
        !inFunctionBody &&
        param > paramEnd &&
        token.value !== "("
      ) {
        inFunctionParam = true;
      }

      if (
        inFunction &&
        !inFunctionBody &&
        param === paramEnd &&
        param > 0 &&
        token.value === ")"
      ) {
        inFunctionParam = false;
      }

      if (inFunctionBody) {
        // console.log('ignore', token.value)
        e += " ";
      } else if (inFunctionParam) {
        e += " ";
      } else {
        e += token.value;
        
      }
    }
  }
});

{
  /**
   * String.prototype.replaceAll() polyfill
   * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
   * @author Chris Ferdinandi
   * @license MIT
   */
  if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (str, newStr) {
      // If a regex pattern
      if (
        Object.prototype.toString.call(str).toLowerCase() === "[object regexp]"
      ) {
        return this.replace(str, newStr);
      }

      // If a string
      return this.replace(new RegExp(str, "g"), newStr);
    };
  }
}

let _e = e;

_e = _e.replaceAll("function", "function ");

const file = require("path").resolve("./mapshaper.simplify.mjs")

require("fs").writeFileSync(
  file,
  _e
);


const exec = require('child_process').exec;

exec(`npx terser ${file} -o ${file} -c -m`);
exec(`npx terser ${file} -o ${file} -c -m`);
exec(`npx terser ${file} -o ${file} -c -m`);!

console.log('done!')


// exec(`npx browserify -s -e ./mapshaper.simplify.mjs -p esmify -r buffer -o ./mapshaper.simplify.browser.mjs`);

// exec(`npx terser ./mapshaper.simplify.browser.mjs -o ${file} -c -m`);