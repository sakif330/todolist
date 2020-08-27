
let todo3 = "hola";
let todo1 = document.getElementById("task1");
let todo2 = document.getElementById("task2");
let todostatus = document.getElementById("status");
showToDoList();
function isEmpty(x){
    if(x !=""){
      return true;
     }
     else{
      return false;
      }
    
  }

  function errorMsg(){
    return(alert("Invalid Input"));
}

  function showToDoList(){
    let webtask = localStorage.getItem("todotask");
    if(webtask == null){
        taskObj = [];
        //taskObj2 = [];
    }
    else{
        taskObj=JSON.parse(webtask);
    }
    let text = "";
    let addtasklist = document.getElementById("todotable");

    for (i = 0; i < taskObj.length; i++) { //displays multiple announcements
        n=i+1;
        text += "<tr>";
        text += "<td>" + n + "</td>";
        text += "<td>" + taskObj[i].task+ "</td>";
        text += "<td>" + taskObj[i].des+ "</td>";
        text += "<td>" + taskObj[i].status+ "</td>";
     //   text += `<td><button type="button"
      //  class="btn btn-danger btn-rounded btn-sm my-0">Remove</button></td>`;
        text += `<td><button onclick="onEditList(${i})" class="btn btn-danger btn-rounded btn-sm my-0" >Edit</button></td>`;
        text += `<td><button onclick="onDeleteList(${i})" class="btn btn-danger btn-rounded btn-sm my-0" >Delete</button></td></tr>`;
      /*  text += `<tr>
                     "<td>" + n + "</td>";
                    "<td>" + taskObj[i].name+ "</td>";
                      "<td>" + taskObj[i].age+ "</td>";
                     <button type="button"
                     class="btn btn-danger btn-rounded btn-sm my-0">Remove</button>;
                     <td><button>Edit</button></td>";
                     "<td><button>Delete</button></td>
                     </tr>`;
                     */

    }
    document.getElementById("taskbody").innerHTML = text;


  }
 function onClear(){
    localStorage.clear();
    showToDoList();
 }

function onEditList(index){
    let webtask = localStorage.getItem("todotask");
    let taskObj=JSON.parse(webtask);
    todo1.value= taskObj[index].task;
    todo2.value= taskObj[index].des;
    todostatus.value=taskObj[index].status;
    document.getElementById("addbtn").style.display="none";
    document.getElementById("editbtn").style.display="inline";
    document.getElementById("saveindex").value= index;
  // document.getElementById("addbtn").innerHTML="Save Task";
 }
 

 function onEdit(){
    let webtask = localStorage.getItem("todotask");
    let taskObj=JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    if(isEmpty(todo1.value) && isEmpty(todo2.value)){ 
    taskObj[saveindex].task=todo1.value;
    taskObj[saveindex].des=todo2.value;
    taskObj[saveindex].status=todostatus.value;
    localStorage.setItem("todotask", JSON.stringify(taskObj));
    document.getElementById("addbtn").style.display="inline";
    document.getElementById("editbtn").style.display="none";
    showToDoList();
    }
    else{
        errorMsg();
    }
    todo1.value="";
    todo2.value="";
    todostatus.value="";

 }
 
 function onAdd() {
    
    addtask1val = todo1.value;
    addtask2val = todo2.value;
    addstatus = todostatus.value;

    if(isEmpty(addtask1val) && isEmpty(addtask2val) && isEmpty(addstatus)){
    let webtask = localStorage.getItem("todotask");
    if(webtask == null){
        taskObj = [];
        //taskObj2 = [];
    }
    else{
        taskObj=JSON.parse(webtask);
    }
     
    myObj = {task: addtask1val , des: addtask2val, status: addstatus};
    taskObj.push(myObj);
    myJSON = JSON.stringify(taskObj);
    localStorage.setItem("todotask", myJSON);
    
    showToDoList();
    }
    else{
        errorMsg();
    }   
    todo1.value="";
    todo2.value="";
    todostatus.value="";

   
  }

  function onDeleteList(index){
    let webtask = localStorage.getItem("todotask");
    let taskObj=JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem("todotask", JSON.stringify(taskObj));
    showToDoList();
  }

function onSearch() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchtext");
    filter = input.value.toUpperCase();
    ul = document.getElementById("taskbody");
    li = ul.getElementsByTagName("tr");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("td")[1];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
