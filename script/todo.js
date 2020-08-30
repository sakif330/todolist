

let todo = document.getElementById("task");
let description = document.getElementById("description");
let todostatus = document.getElementById("status");

//hi
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
       // text += "<td>" + taskObj[i].task+ "</td>";
       text += `<td> ${taskObj[i].task}</td>`;
        text += "<td>" + taskObj[i].des+ "</td>";
        //text += `<td rowspan="3"></td>`;
        text += "<td>" + taskObj[i].status+ "</td>";
       text+= `<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button onclick="onEditList(${i})" class="btn btn-primary btn-xs" data-title="Edit" data-toggle="modal" data-target="#edit" ><span class="glyphicon glyphicon-pencil"></span></button></p></td>`;
       text+=`<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button onclick="onDeleteList(${i})" class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td>`;
     

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
    todo.value= taskObj[index].task;
    description.value= taskObj[index].des;
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
    if(isEmpty(todo.value) && isEmpty(description.value)){ 
    taskObj[saveindex].task=todo.value;
    taskObj[saveindex].des=description.value;
    taskObj[saveindex].status=todostatus.value;
    localStorage.setItem("todotask", JSON.stringify(taskObj));
    document.getElementById("addbtn").style.display="inline";
    document.getElementById("editbtn").style.display="none";
    showToDoList();
    }
    else{
        errorMsg();
    }
    todo.value="";
    description.value="";
    todostatus.value="";

 }
 
 function onAdd() {
    
    addtask1val = todo.value;
    addtask2val = description.value;
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
    todo.value="";
    description.value="";
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
  let  a, i, txtValue;
  let input = document.getElementById("searchtext");
  let filter = input.value.toUpperCase();
  let searchby = document.getElementById("searchby").value;
  let ul = document.getElementById("taskbody");
  let li = ul.getElementsByTagName("tr");

  if(searchby == "By task"){
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
else if(searchby=="By Status"){
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("td")[3];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
    } else {
        li[i].style.display = "none";
    }
}

}


}
