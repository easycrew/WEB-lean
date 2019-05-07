# <center>Promise</center>
## 手写Promise
```javascript
function Promise(){
  let that = this;
  that.status = 'pending';
  that.val = undefined;
  that.reason = undefined;
  function resolve(value){
    if(that.value === 'pending'){
      that.value = value;
      that.status = 'resolved';
    }
  }
  function reject(value){
    if(that.status === 'pending'){
      that.value = value;
      that.status = 'rejected';
    }
  }
  try{
    constructor(resolve,reject);
  }catch(e){
    reject(e)
  }
}
Promise.prototype.then(onFulfilled,onRejected){
  var that = this;
  switch(this.status){
    case 'resolved':
      onFulfilled(this.value);
      break;
    case 'rejected':
      onRejected(this.value);
      break;
    default;
  }
}
```

> 解决回调地狱问题

## 完整Promise
```javascript
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
function MyPromise = (fn){
   // promise 接收一个函数参数，该函数会立即执行
  let that = this;
  that.state = PENDING;
  that.value = undefined;
  // 用于保存 then 中的回调，只有当 promise状态
  // 为 pending 时才会缓存，并且每个实例至多缓存一个
  that.resolvedCallbacks = [];
  that.rejectedCallbacks = [];

  that.resolve = function (value){
    if(value instanceof MyPromise){
      // 如果 value 是个 Promise，递归执行
      return value.then(that.resolve,that,reject)
    }
    setTimeout(()=>{ // 异步执行，保证执行顺序
      if(that.state === PENDING){
        that.state = RESOLVED;
        that.value = value;
        that.resolvedCallbacks.forEach(cb=>cb());
      }
    })
  }

  that.reject = function (value){
    setTimeout(()=>{
      if(that.state === PENDING){
        that.state = REJECTED;
        that.value = value;
        that.rejectedCallbacks.forEach(cb=>cb());
      }
    })
  }

  // 用于解决以下问题
  // new Promise(() => throw Error('error))
  try{
    fn(that.resolve,that.reject)
  }catch(e){
    that.reject(e)
  }
}

MyPromise.prototype.then = function (onResolved,onRejected){
  let that = this;
  // 规范then是链式操作，需要返回一个promise
  var promise2
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，后续直接赋值同时也实现了透传
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => throw r;

  if(that.state === RESOLVED){
    return (
      promise2 = new MyPromise((resolve,reject)=>{
        // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
        // 所以用了 setTimeout 包裹下
        setTimeout(()=>{
          try{
            let x = onResolved(that.value);
            resolvePromise(promise2,x,resolve,reject)
          }catch(reason){
            reject(reason)
          }
        })
      })
    )
  }
  if(that.state === REJECTED){
    return (
      promise2 = new Mypromise((resolve,reject)=>{
        setTimeout(()=>{
          // 异步执行onRejected
          try{
            let x = onReject(that.value);
            resolvePromise(promise2,x,resolve,reject);
          }catch(reason){
            reject(reason)
          }
        })
      })
    )

  }
  if(that.state === PENDING){
    return (
      promise2 = new MyPromise((resolve,reject)=>{
        that.resolvedCallbacks.push(()=>{
          // 考虑到可能会有报错，所以使用 try/catch 包裹
          try{
            let x= onResolved(that.value);
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        })
      })
    )
    that.rejectedCallbacks.push(()=>{
      try{
        let x= onRejected(that.value);
        resolvePromise(promise2,x,resolve,reject)
      }catch(e){
        reject(e)
      }
    })
  }
}

function resolvePromise(promise2,x,resolve,reject){
  if(promise2 === x){
    return reject(new TypeError('Error'));
  }
  if(x instanceof MyPromise){
    //如果 x 为 Promise，状态为 pending 需要继续等待否则执行
    if(x.state = PENDING){
      x.then((value)=>{
        resolvePromise(promise2,value.resolve,reject)
      },reject)
    }else{
      x.then(resolve,reject)
    }
    return
  }
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  //判断 x 是否为对象或者函数
  if(x !== null && (typeof x === 'object' || typeof x === 'function')){
    //如果不能取出 then，就 reject
    try{
      let then = x.then;
      // 如果 then是函数，调用x.then
      if(typeof then === 'function'){
        then.call(x,y=>{
          if(called) return
          called = true;
          resolvePromise(params2,y,resolve,reject)
        },e=>{
          if(called) true;
          called = true;
          reject(e)
        })
      }else{
        resolve(x)
      }


    }catch(e){
      if (called) return;
      called = true;
      reject(e)
    }
  }else{
    //x为基础类型
    resolve(x)
  }
}
```