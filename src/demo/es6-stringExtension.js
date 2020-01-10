import i18n from 'i18next';

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
let sender = "<script>alert(112)</script>";
let sender2 = "输入内容";
let message = SaferHTML`<p>${sender} has sent you ${sender2} a message</p>`;

function SaferHTML(templateData) {
  let s = templateData[0];
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i]);

    s += arg
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    s += templateData[i];
  }
  return s;
}

console.log(message);

i18n`Welcome to hhh`
