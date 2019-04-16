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
缺点：for循环的位置不合理，直接卡死
2.**Promise版本**
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
优点：使用setTimeout,不会造成进程阻塞，不会有性能和负载问题
缺点：仍需要写then，如果需要过程中停止，或者是中途返回错误值，需要层层判断跳出，异步编写不彻底
3.**Generator方式**
```

```
4.**Async/Await方式**
5.**引用插件sleep**