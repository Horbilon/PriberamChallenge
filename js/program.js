//let jsonFile = fetch('../js/entries.json');
//let jsonFile = JSON.parse(fs.readFileSync('../js/entries.json').toString());
var json = (function() {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../js/entries.json",
        'dataType': "json",
        'success': function(data) {
            json = data;
        }
    });
    return json;
})();

//ArrayList para guardar temporariamente as posições que estão na tabela
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
            console.log('Start:'+start+'End:'+ end);
            console.log(placeholder);
            if (placeholder!=null) {
                if(workTagArrayList.length==null){
                     placeholderID = 0;
                } else {
                    placeholderID=workTagArrayList.length;
                };
                document.getElementById("table-body").innerHTML+= build(placeholder, placeholderID);
                let workTagArray = {
                    id:placeholderID,
                    indexStart:start,
                    indexEnd:end,
                    TRtag:""
                };
                workTagArrayList.push(workTagArray);
            };
        };
        console.log(workTagArrayList)
    });
});

function build (text, id) {
    //id is being passed to that, if needed, a entry can be deleted.
    return `<tr id="${id}">                                                     
                <td>${text}</td>
                <td>
                    <select id="inputState">
                        <option selected>Tags</option>
                        <option value="Person">Person</option>
                        <option value="Organization">Organization</option>
                        <option value="Place">Place</option>
                        <option value="Event">Event</option>
                    </select>
                </td>
                <td>
                    <a onclick="remove(${id})" class="btn btn-danger">Delete</a> 
                                      
                </td>
            </tr>
    `;
}

function saveProgess() {
    let IDEntry = json.length;
    console.log(IDEntry)
}

function remove(id) {
    document.getElementById(id).remove();
    delete workTagArrayList[id];
}

function goStartNew() {
    let readText = document.getElementById("getText").value;
    document.getElementById("read").innerText+=`${readText}`

}

function goContinue() {
let id = document.getElementById("id").value;
}

