var asyncAdd= (a,b)=>{
  return new Promise((resolve,reject) =>{
    setTimeout(()=>{
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else {
        reject('Arguments must be numbers');
      }
    },1500);
  });
};
asyncAdd(5,'6').then((res)=>{
  console.log('Result:',res);
  return asyncAdd(res,'23');
}).then((res)=>{
  console.log('Should be 34',res);
}).catch((errorMessage)=>{
  console.log(errorMessage);
});
// var somePromise=new Promise((resolve,reject) => {
// setTimeout(()=>{
//   // resolve('Hey. I am done with my promise');
//   reject('I cannot fulfil promise');
// },2500);
// });
//
// somePromise.then((message)=>{
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ',errorMessage);
// });
