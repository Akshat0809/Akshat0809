function a() {
  console.log('hello');
  new Promise((resolve, reject) => {
    resolve();
  }).then(() => {
    b();
  });
 console.log('world');
}
function b() {
  for(let i=1; i<=10; i++) {
    console.log(i);
  }
}
a();

  