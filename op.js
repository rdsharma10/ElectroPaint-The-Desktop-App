function table(n)
{let ans=[];
  let value=0;
  for (let i = 0; i <10; i++) {
    value+=n;
    console.log(value)
    ans.push(value)
  }
  let res=ans.reduce((a,b)=>a+b)
  return res;
}
console.log( table(6))