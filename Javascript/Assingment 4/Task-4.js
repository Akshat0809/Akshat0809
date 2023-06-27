let form=document.getElementById("form");
 let table=document.getElementById('data');
 let selectedRow = null
let count=0;
 form.addEventListener("submit",(e)=>{
 e.preventDefault();
 if (selectedRow == null)
 insertNewRecord();
 else
 updateRecord();
 resetForm();
 })

function check(box){
        var checkboxes = document.getElementsByName('select');
        let selectBox=document.getElementById('selectbox')
        if (box.checked) {
        for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
        checkboxes[i].checked = true;
        count++
        selectBox.innerText=count
        }}} 
        else {
           for (var i = 0; i < checkboxes.length; i++) {
               if (checkboxes[i].type == 'checkbox') {
                  checkboxes[i].checked = false;
                  count--
                  selectBox.innerText=count
            }}}
        }
 
             function insertNewRecord(){
 let f_name=document.getElementById('fname').value;
 let l_name=document.getElementById('lname').value;
 let newRow=table.insertRow('1');

 (newRow.insertCell(0)).innerHTML=`<input type="checkbox" name="select" id="option-all" onclick="del()">`;
 (newRow.insertCell(1)).innerHTML=f_name;
 (newRow.insertCell(2)).innerHTML=l_name;
 (newRow.insertCell(3)).innerHTML=`<button onClick="onEdit(this)" class="onEdit">Edit</button> <button class="onDelete" onClick="onDelete(this)">Delete</button>`;
 }

 function del(x){
    let fun=x.parentElement.parentElement.cell[3];
    x.firstChild.nextElementSibling.disabled=true;
 }

function onDelete(ref)
 {

 let row=ref.parentElement.parentElement;
 
 {
    document.getElementById('data').deleteRow(row.rowIndex);
 resetForm();
 }
 }

 function resetForm()
 {
 document.getElementById('fname').value='';
 document.getElementById('lname').value='';
 }

 function onEdit(ref)
 {
  selectedRow=ref.parentElement.parentElement;
  document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
  document.getElementById("lname").value = selectedRow.cells[1].innerHTML;
 }
 function updateRecord()
 {
 selectedRow.cells[0].innerHTML=document.getElementById('fname').value;
 selectedRow.cells[1].innerHTML=document.getElementById('lname').value;
//  alert('Row updated ');
}

function deleteBox()
{
    console.log(deleteBox);
    var clear=document.getElementById("option-all")
    console.log(clear)
    for(var i=0;i<checkbox.length;i++)
    {
        if(checkbox.options[i].selected)
        {
            checkbox.options[i].selected=false;
        }
    }
    let del = document.getElementById('main_select');
    del.checked = false;
}
function deleteBox(){
    let table=document.getElementById("data");
    for(let i in table.childNodes){
        let ele=document.getElementsByName('select');
        for(let j in ele)
        {
            if(ele[j].type='checkbox')
            {
                if(ele[j].checked==true)
                {
                    onDelete(ele[j]);
                }
            }
            
        }
    }
    
}