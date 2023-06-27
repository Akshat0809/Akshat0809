let blocks=+prompt("Enter the number of rows and Columns: ");

let spiralMatrix=new Array(blocks);
for(let i=0;i<spiralMatrix.length;i++){
    spiralMatrix[i]=new Array(blocks);
}

let mincol=0;
let minrow=0;
let maxrow=blocks-1;
let maxcol=blocks-1;
let countervalue=1;

while(countervalue<=blocks*blocks){
    for(let i=mincol;i<=maxcol;i++){
        spiralMatrix[minrow][i]=countervalue;
        countervalue++;
    }

    for(let i=minrow+1;i<=maxrow;i++){
        spiralMatrix[i][maxcol]=countervalue;
        countervalue++;
    }

    for(let i=maxcol-1;i>=mincol;i--){
        spiralMatrix[maxrow][i]=countervalue;
        countervalue++;
    }

    for(let i=maxrow-1;i>=minrow+1;i--){
        spiralMatrix[i][mincol]=countervalue;
        countervalue++;
    }

    mincol++;
    minrow++;
    maxcol--;
    maxrow--;
}

for(let i=0;i<spiralMatrix.length;i++){
    for(let j=0;j<spiralMatrix.length;j++){
        document.write(spiralMatrix[i][j]+"\t");
    }
     document.write("<br>");
}