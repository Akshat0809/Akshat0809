// alert("Start it by Clicking");

let box1=document.getElementById("box-1");
let box2=document.getElementById("box-2");
let box3=document.getElementById("box-3");
let box4=document.getElementById("box-4");

box1.innerHTML+= " <br><i>click me first</i>";

let colourbox2=["red",'green','yellow'];
let colourbox4=['green','pink','yellow','blue'];
// let index=0;

function colourchange(colourbox,box,colourtime,index){
    setInterval(()=>{
        if(index<colourbox.length){
            box.style.backgroundColor=colourbox[index];
            index++;
        }
        else{
            index=0;
            box.style.backgroundColor=colourbox[index];
            index++;
        }
    },colourtime);
}


colourchange(colourbox2,box2,3000,0);

box1.addEventListener('click',()=>{
    box3.innerHTML+=' <br><i>OOPS Something went wrong!!!</i>';
    colourchange(colourbox4,box4,5000,0);

})

document.addEventListener('keydown',(e)=>{
    let color=box4.style.backgroundColor;
    let colorcurrentIndex=colourbox4.indexOf(color);
    // console.log(colorcurrentIndex);

    if(e.key=='ArrowLeft' || e.key=="ArrowDown"){
           if(colorcurrentIndex==0 || colorcurrentIndex==-1){
            colorcurrentIndex=colourbox4.length-1;
           }
           else{
            colorcurrentIndex--;
           }
           box4.style.backgroundColor=colourbox4[colorcurrentIndex];
    }
    else{
        if(colorcurrentIndex==colourbox4.length-1){
            colorcurrentIndex=0;
           }
           else{
            colorcurrentIndex++;
           }
           box4.style.backgroundColor=colourbox4[colorcurrentIndex];
    }
})
