let total = 10;
let msg1 = passthru1`The total is ${total} (${total * 1.5} with tax)`;
let msg2 = passthru2`The total is ${total} (${total * 1.5} with tax)`;

/**
 * 参数模板--各个参数按照原来位置拼合回去--方法一
 * @param {Array} literals
 */
function passthru1(literals) {
  let result = "";
  let i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }

  return result;
}

/**
 * 参数模板--各个参数按照原来位置拼合回去--方法二--采用rest参数写法
 * @param {Array} literals
 * @param  {...any} values
 */
function passthru2(literals, ...values) {
  let output = "";
  let index;

  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index];
  }

  output += literals[index];
  return output;
}

console.log(msg1);
console.log(msg2);

/**
 * "标签模板"应用
 * 过滤HTML字符串，防止用户输入恶意内容
 */

let message = SaferHTML`<p>${sender} has sent you a message</p>`;

function SaferHTML(templateData) {
  
}