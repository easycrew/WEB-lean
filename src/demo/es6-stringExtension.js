import i18n from 'i18next';

// 标签模板
// 函数后面紧接着一个模板字符串  比如 passthru1`The total is ${total} (${total * 1.5} with tax)`
// 本质上他不是模板，是函数调用的一种特殊方式，【标签】指的是函数,紧跟后面的模板字符串是参数
// 如果模板字符串中有参数，先处理成多个参数，在调用函数

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

/**
 * 标签模板应用二
 * 国际化处理
 */
let siteName = 'xxx';
let visitorNumber = 'xxxx'
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// "欢迎访问xxx，您是第xxxx位访问者！"

/**
 * 模板处理函数接受的参数实际上是一个数组
 * 数值有一个属性raw，保存转义后的原字符串
 */
tag`First line\nSecond line`

function tag(strings) {//["First line \nSecond line",raw:["First line\\nSecond line"]]
  console.log(strings) //[ 'First line\nSecond line' ]
  console.log(strings.raw) //[ 'First line\\nSecond line' ]
  // strings.raw数组会将\n视为\\和n两个字符，而不是换行符。
  // 是为了获取转义之前的原始模板
}

/**
 * 判断一个字符由两个字节还是由四个字节组成
 */

function is32Bit(c) {
  return c.codePointAt(0)>0xFFFF
}

is32Bit("𠮷") // true
is32Bit("a") // false

