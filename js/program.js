//let jsonFile = require('../js/entries.json');

let workTag={
    text:"",
    tags:[]
};

let workTagArrayList=[];

$(function() {
    $('textarea').on('mouseup', function() {
        //clean @placeholder to block repeated entries when clearing selected text from textarea
        let placeholder = null;
        let placeholderID = 0;

        placeholder = $(this).html();
        let start = $(this)[0].selectionStart;
        let end = $(this)[0].selectionEnd;
        if(end-start!=0){
            placeholder = placeholder.substr(start, end - start);

            console.log('Start:'+start+'End:'+ end)
            console.log(placeholder)
            if (placeholder!=null) {
                if(workTagArrayList.length==null){
                     placeholderID = 0;
                } else {  placeholderID=workTagArrayList.length}
                document.getElementById("table-body").innerHTML+= build(placeholder, placeholderID);
                let workTagArray = {
                    id:placeholderID,
                    indexStart:start,
                    indexEnd:end,
                    tag:""
                }
                workTagArrayList.push(workTagArray);
            };
        };
        console.log(workTagArrayList)

    });
});

function build (base, id) {
    return `<tr>
                <th scope="row" id="${id}">${id}</th>                                        
                    <td>${base}</td>
                    <td>
                        <select id="inputState">
                            <option selected>Tags</option>
                            <option>Place</option>
                            <option>Organization</option>
                            <option>Place</option>
                            <option>Event</option>
                        </select>
                    </td>
                    <td>
                    <a  class="btn btn-danger">Delete</a> 
                    <button type="submit" class="btn btn-success">Save</button>                   
                </td>
            </tr>
    `;
}


function goStartNew() {
    let readText = document.getElementById("getText").value;
    console.log(readText);

    //document.getElementById("program").innerHTML=insertElement();
    document.getElementById("read").innerText+=`${readText}`
    document.getElementById("forTable").innerHTML=createTable();
}

function goContinue() {
let id = document.getElementById("id").value;
}

function insertElement(){
    return `<div class="col input-group">
                <textarea class="form-control" id="read"></textarea>
            </div>
            <div id="forTable">
            </div>`;
}

function createTable() {
    return `<table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Text</th>                
                <th scope="col">Tag</th>
                <th scope="col">Other</th>
              </tr>
            </thead>
            <tbody id="table-body">
            </tbody>
          </table>`
}