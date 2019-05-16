//将1200000000.11 更改为1,200,000,000.11
function replaceNum(num){
	return num && num.toString().replace(/\d(?=(\d{3})+\.)/g,function($1,$2){
		return $2+','
	})
}
// x(?=y) 会匹配到x，意思是如果x后面跟着是y就会匹配x
// \d{3}  3个数字
// \d{3}+  多次匹配，即3个数字，6个数字，9个数字.....
// \d{3}+\.  3个即3的倍数个数的数字后面跟着一个.
// \d(?=xxx)  一个数字后面跟着xxx匹配的时候，匹配这个数字

//一字符串中所有单词的首字母都转换为大写
function upperCase (str){
	return str && str.replace(/\b\w+\b/g,function(word){
		return word.substring(0,1).toUpperCase()+word.substring(1)
	})
}

//如何实现数组的随机排序
var arr = [1,2,3,4,5,6,7,8,9,10]
function randomSort(arr){
	for (var i=0,len =arr.length;i<len;i++){
		var tempIndex = parseInt(Math.random()*len); //[0,1)*10 == [0,10)
		var temp = arr[tempIndex];
		arr[tempIndex] = arr[i];
		arr[i] = temp;
	}
}
function randomArr1(arr){
	var mixedArr = []
	while(arr.length){
		var mixedIndex = parseInt(Math.random()*arr.length);
		mixedArr.push(arr[mixedIndex]);
		arr.splice(mixedIndex,1);
	}
	return mixedArr
}
function randomArr2(arr){
	arr.sort(function(){
		return Math.random()-0.5
	})
}

//找到两个数组中最大值
var arr1 =[1,3,55],
arr2= [3,44,5]

Math.max.apply(null,[...arr1,...arr2])

arr1.concat(arr2).sort(($1,$2)=>$2-$1)[0]








