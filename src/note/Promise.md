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