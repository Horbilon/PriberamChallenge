/*require.config({
    paths: {
        'fs': 'https://requirejs.org/docs/release/2.3.5/minified/require'
    }
});

let fs = require(['fs'], function (fs) {});

require(['fs-js'], function (fs) {})

 */

let dataID = 0;

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

function loadPage() {
    for (let i = 0; i < json.length; i++) {
        document.getElementById("dropIDs").innerHTML+=`<option value="${i}">Work ID: ${i}</option>`
    }
}

//ArrayList to temporalray save the table entries
let workTagArrayList=[];

$(function() {
    $('textarea').on('mouseup', function() {
        //clean @placeholder to block repeated entries when clearing selected text from textarea
        let placeholder = null;
        let placeholderID = 0;

        //get text from textarea
        placeholder = $(this).html();

        //get starting and ending position of the selected area
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
                let workTagArray = createWorkTagArray(placeholderID, start, end, "");

                workTagArrayList.push(workTagArray);
            };
        };
        console.log(workTagArrayList)
    });
});

function build (text, id, tag) {
    //id is being passed to that, if needed, a entry can be deleted.
    let tagOption=""
    if(tag=="Person"){
        tagOption = `<option >Tags</option>
                   <option selected ="Person">Person</option>
                   <option value="Organization">Organization</option>
                   <option value="Place">Place</option>
                   <option value="Event">Event</option>`;
    } else if (tag=="Place") {
        tagOption = `<option >Tags</option>
                   <option value="Person">Person</option>
                   <option value="Organization">Organization</option>
                   <option selected value="Place">Place</option>
                   <option value="Event">Event</option>`;
    }else if (tag=="Organization") {
        tagOption = `<option >Tags</option>
                   <option value="Person">Person</option>
                   <option selected value="Organization">Organization</option>
                   <option value="Place">Place</option>
                   <option value="Event">Event</option>`;
    }else if (tag=="Event") {
        tagOption = `<option >Tags</option>
                   <option value="Person">Person</option>
                   <option value="Organization">Organization</option>
                   <option value="Place">Place</option>
                   <option selected value="Event">Event</option>`;
    } else {
        tagOption = `<option selected>Tags</option>
                   <option value="Person">Person</option>
                   <option value="Organization">Organization</option>
                   <option value="Place">Place</option>
                   <option value="Event">Event</option>`;
    }
    return `<tr id="${id}">                                                     
                <td>${text}</td>
                <td>
                    <select id="${id}inputState">
                        ${tagOption}
                    </select>
                </td>
                <td>
                    <a onclick="remove(${id})" class="btn btn-danger">Delete</a> 
                                      
                </td>
            </tr>
    `;
}

function saveProgess() {
    let dataText=document.getElementById("read").value;
    let dataTag= {
        Person:[],
        Organization:[],
        Place:[],
        Event:[]
    };

    for (let i = 0; i < workTagArrayList.length; i++) {
        if(workTagArrayList[i]!=null){
            let tagValue = document.getElementById(i+"inputState").value;
            if(tagValue=="Person") {
                let varPerson= {
                    startIndex: workTagArrayList[i].indexStart,
                    endIndex: workTagArrayList[i].indexEnd
                }
                dataTag.Person.push(varPerson)
            } else if (tagValue=="Organization") {
                let varOrganization= {
                    startIndex: workTagArrayList[i].indexStart,
                    endIndex: workTagArrayList[i].indexEnd
                }
                dataTag.Organization.push(varOrganization)
            }else if (tagValue=="Place"){
                let varPlace= {
                    startIndex: workTagArrayList[i].indexStart,
                    endIndex: workTagArrayList[i].indexEnd
                }
                dataTag.Place.push(varPlace)
            }else if (tagValue=="Event"){
                let varEvent= {
                    startIndex: workTagArrayList[i].indexStart,
                    endIndex: workTagArrayList[i].indexEnd
                }
                dataTag.Event.push(varEvent)
            }
        }
    }



    console.log(dataID)

    let data={
        id:dataID,
        text:dataText,
        tags:dataTag
    }

    if(dataID<json.length){
        json[dataID]=data
    }else{
        json.push(data)
    }

    downloadObjectAsJson(json,"entries")

    function downloadObjectAsJson(exportObj, exportName){
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}

function remove(id) {
    document.getElementById(id).remove();
    workTagArrayList[id]=null;
}

function goStartNew() {
    workTagArrayList=[];
    document.getElementById("table-body").innerHTML="";
    let readText = document.getElementById("getText").value;
    document.getElementById("read").innerHTML=`${readText}`
    document.getElementById("saveBTN").disabled = false;
    document.getElementById("workID").innerText=`${json.length}`
    dataID=json.length;


}

function goContinue() {
    workTagArrayList=[];
    document.getElementById("table-body").innerHTML="";
    let ID = 0;
    dataID= document.getElementById("dropIDs").value;
    let getWork = json[dataID];
    document.getElementById("workID").innerText=`${dataID}`
    //console.log("Isto é o json: "+getWork)
    let workText = getWork.text;
    document.getElementById("read").innerHTML=`${workText}`
    if(getWork.tags!=null){
        if(getWork.tags.Person!=null){
            for (let i = 0; i < getWork.tags.Person.length; i++) {
                let start = getWork.tags.Person[i].startIndex;
                let end = getWork.tags.Person[i].endIndex;
                let word = workText.substr(start, end - start);
                document.getElementById("table-body").innerHTML+= build(word, ID, "Person");
                let workTagArray = createWorkTagArray(ID, start, end, "Person");
                workTagArrayList.push(workTagArray);
                ID++;
            }
        }
        if(getWork.tags.Organization!=null){
            for (let i = 0; i < getWork.tags.Organization.length; i++) {
                let start = getWork.tags.Organization[i].startIndex;
                let end = getWork.tags.Organization[i].endIndex;
                let word = workText.substr(start, end - start);
                document.getElementById("table-body").innerHTML+= build(word, ID, "Organization");
                let workTagArray = createWorkTagArray(ID, start, end, "Organization");
                workTagArrayList.push(workTagArray);
                ID++;
            }
        }
        if(getWork.tags.Place!=null){
            for (let i = 0; i < getWork.tags.Place.length; i++) {
                let start = getWork.tags.Place[i].startIndex;
                let end = getWork.tags.Place[i].endIndex;
                let word = workText.substr(start, end - start);
                document.getElementById("table-body").innerHTML+= build(word, ID, "Place");
                let workTagArray = createWorkTagArray(ID, start, end, "Place");
                workTagArrayList.push(workTagArray);
                ID++;
            }
        }
        if(getWork.tags.Event!=null){
            for (let i = 0; i < getWork.tags.Event.length; i++) {
                let start = getWork.tags.Event[i].startIndex;
                let end = getWork.tags.Event[i].endIndex;
                let word = workText.substr(start, end - start);
                document.getElementById("table-body").innerHTML+= build(word, ID, "Event");
                let workTagArray = createWorkTagArray(ID, start, end, "Event");
                workTagArrayList.push(workTagArray);
                ID++;
            }
        }
    }
    document.getElementById("saveBTN").disabled = false;
}

function createWorkTagArray(ID, start, end, tag) {
    let workTagArray = {
        id:ID,
        indexStart:start,
        indexEnd:end,
        TRtag:tag
    };

    return workTagArray

}

