let ober =[
    {xxx:'100',yyy:'222',zzz:'333'},
    {xxx:'200',yyy:'222',zzz:'333'},
    {xxx:'300',yyy:'222',zzz:'333'}
]
Array.prototype.sum = function(cb){
    let result =0;
    this.map((item)=>result+=cb(item)*1)
    return result
}
console.log(ober.sum(ober=>ober.xxx))
console.log(ober.sum(ober=>ober.xxx*ober.zzz))