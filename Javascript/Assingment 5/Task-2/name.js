function Search(){

        // First we will declare all the variables
          let txtValue;
          let input = document.getElementById('myInput');
          let filter = input.value.toUpperCase();
          let ul = document.getElementById("myUL");
          let li = ul.getElementsByTagName('li');
        
        // Iterate Loop through all the items to match and hide all other
          for (let i = 0; i < li.length; i++) {
            let a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              li[i].style.display = "";
        } else {
              li[i].style.display = "none";
            }
        }
        
}