//浅拷贝
function extendCopy(p){
    let result = {}
    for(let i in p){
        result[i] == p[i]
    }
    return result
}
/**注意
 * 如果P父对象包含数组、对象类型数据
 * 浅拷贝，只是拷贝了引用地址，不是真正的拷贝，存在父元素被修改的可能
 */

function deepCopy(p,c){
    let result = c || {};
    for (let i in p){
        if(typeof p[i] === 'object'){
            result[i] = (p[i].constructor === Array)?[]:{}
            deepCopy(p[i],result[i])
        }else{
            result[i] = p[i]
        }
    }
    return result
}