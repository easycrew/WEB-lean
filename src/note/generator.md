# <center>Generator函数</center>
> Generator 是一种实现异步的解决方案，可以直观的理解为是一个状态器，返回一个遍历器，也可以说是一个内部指针（只针对象），通过调用next()方法，移动内部指针，执行异步任务的每一段。

1. **es6解决异步的方式**
* callback方式
* 时间监听
* 发布/订阅
* promise对象

2. **Generator函数**
整个的Generator函数是一个封装的异步任务，可以理解为是一个异步任务的容器，yelid注明的地方就是异步操作需要暂停的位置
```javascript
function * gen(x){
    var y = yield x + 2;
    return y
}
var g = gen (3);
g.next();//{ value:5, done:false }
g.next();//{ value:undefined, done:true }
```
Generator函数返回一个遍历器，不会直接返回执行的结果，返回的是一个指针对象，然后在通过调用next方法，移动内部指针，直到遇到第一个yield语句，上例子中是执行到x + 2。
换言之，next方法的作用是分阶段的去执行Generator函数，next方法会返回一个对象，{value,done}，表示当前阶段的信息。value接受的是yield语句后的表达式的值，表示当前阶段的值，done为boolearn值，表示Generator函数是否执行完毕，是否还有下一个阶段。

3. **Generator函数的数据交换、异常处理**
解决异步的根本原因：可以暂停和恢复执行
特性：可以同函数外的数据交换、错误处理机制
*next返回的value是Generator向外输出的数据，next还可以接受参数，向Generator函数内部传值*
```javascript
function * gen(x){
    var y = yield x + 2;
    return y
}
var g = gen(3);
g.next();//{ value:5,done:false }
g.next(2);//{ value:2,done:true }
```
第一个next方法返回的value的值应该是表达x+2的值5；第二个next方法接受参数2，传入到Generator中，作为上一个阶段的异步函数返回的结果，被函数体内的y接受，return y 为返回的值为2。
Generator函数体内部可以部署错误处理代码，捕获函数体外跑出的错误。
```javascript
function * gen(x){
    try{
        var y = yield x + 2;
    }catch (e) {
        console.log(e);
    }
    return y
}
var g = gen(3);
g.next();//{value:5.done:false}
g.throw('error'); // error
```
上面代码的最后一行，Generator函数体外，指针通过throw()方法抛出异常，就可以被try...catch捕获错误异常，执行catch。这就意味着**出错的代码**和**处理异常的代码**实现了时间和空间上的分离，对于异步编程是很重要的。

4. **Generator函数对异步任务的封装**
```javascript
var fetch = require('node-fetch');
fun * gen (){
    var url = 'http://xxx/xxx'；
    var result = yield fetch(url);
    console.log(result.bio)
}
```
上面的代码，引用了node-fetch来读取后台接口,然后从返回的额json格式数据中解析数据的异步任务，Generator对异步任务进行了封装，编写方式特别像同步的写法，只是多加了yield命令
执行代码
```javascript
var g = gen()
var result = g.next();//fetch返回的是promise对象

//result接受的next返回来的对象，包括value和done属性
//result.value是fetch返回的promise对象
//用then方法调用下一个next

result.value.then(function(data){
    return data.json();
}).then(function(data){
    g.next(data)
})
```

5. **Generator函数应用--实现sleep函数**
```javascript
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
6. **于for...of配合使用，实现对象的遍历**

```javascript
function * objectMap(obj){
    let propKeys = Reflect.ownKeys(obj);
    
    for( let propKey of propKeys ){
        yield [propKey, obj[propKey]];
    }
};

let jane = {first:'Jane',last:'Doe'};
for (let [key,value] of objectMap(jane)){
    console.log(`${key}:$[value]);
}
// first:Jane
// last:Doe
```
[Reflect.ownKeys(obj)和obj.keys()的不同之处](./Symbol.md)
或者可以直接加在对象的Symbol.iterator上面
```javascript
function * objectMap(){
    let propKeys = Object.keys(this);
    for(let propKey of propKeys){
        yield [propKey,this[propKey]]
    }
}
let Jane = {first:'Jane',last:'Doe'}
Jane[Symbol.iterator] = objectMap;
for(let [key,value] of Jane){
    console.log(`${key}:${value}`)
}
// first:Jane
// last:Doe
```
## Generator 函数简单实现
```javascript
function Generator(cb){
	return (
		function(){
			var object = {
				next:0;
				stop:function(){}
			}
			return {
				next:function (){
					var ret = cb(object);
					if(ret === undefined) return {value:undefined,done:true}
					return {
						value:ret,
						done:false
					}
				}
			}
		}
	)()
}
```