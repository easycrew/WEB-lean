# <center>常用方法优雅实现</center >

## sleep() 实现

---

1. **普通写法**

```
function sleep(delay){
  for(var start = +new Date; +new Date - start <= delay;){}
};
var t1 = +new Date();
sleep(3000);
var t2 = +new Date();
console.log(t2 - t1);
```

优点：通俗易懂
缺点：for 循环的位置不合理，直接卡死

2.**Promise 版本**

```
function sleep(delay){
  return new Promise(resolve => setTimeout(resolve,delay))
};
const t1 = +new Date();
sleep(3000).then(()=>{
  const t2 = +new Date();
  console.log(t2 - t1);
});
```

优点：使用 setTimeout,不会造成进程阻塞，不会有性能和负载问题
缺点：仍需要写 then，如果需要过程中停止，或者是中途返回错误值，需要层层判断跳出，异步编写不彻底

3.**Generator 方式** ---- [Generator 函数讲解](./generator.md)

```
function sleep(delay){
    return function(callback){
        setTimeout(callback,delay)
    };
};
function * genSleep(){
    const t1 = +=new Date();
    yield sleep(3000);
    const t2 = +=new Date();
    console.log(t2-t1);
}
//公用的执行Generator函数，并且逐步执行next，直到执行完毕整个Generator函数
function async(gen){
    const iter = gen(); //实例Generator函数
    function nextStep(it){
        if(it.done) return
        if(typeof it.value === 'function'){
        // 异步函数返回的是函数情况，执行这个函数，（一般是一个异步程序）
        // 并且把这个异步程序的callback处理为执行Generator的下一次的next
        // 通过递归的方式，依次执行完next，
        // 直到done为true，整个Generator函数执行完毕
            it.value(function(ret){
                nextStep(iter.next(ret));
            })
        }else{
            nextStep(iter.next(it.value))
        }
    }
    nextStep(iter.next()); //第一次调取next
}
```

4.**Async/Await 方式**

```
function sleep(delay){
  return new Promise(resolve=>{
    setTimeout(resolve,delay)
  });
};
!async function test(){
  const t1 = +=new Date();
  await sleep(3000);
  const t2 = +=new Date();
  console.log(t2-t1);
}();
```

有点：Async/await 可以看做是 Generator 的语法糖，写反上更加简洁，趋于同步的写法，更直观，便于阅读
缺点：属于 es7 语法，存在兼容问题，需要 babel 编译

5.**引用插件 sleep**
最直接的方法，引用开源插件 sleep

```
const sleep = require('sleep');

const t1 = +=new Date();
sleep.msleep(3000);
const t2 = +=new Date();
console.log(t2-t1);
```

有点：能够实现更加精细的时间精确度，插件专业的处理了各种异常、细致的情况，清晰直白。
缺点：需要安装 sleep 模块

## 获取时间戳

## 数组操作

**数组去重**
**多个数组取最大值**

## 数字格式化

**输入名字首字母大写**

## 交换两个整数

## 将 argument 对象（类数组）转化为数组

## 数字取整

## 数组求和
