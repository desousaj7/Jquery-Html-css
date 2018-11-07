let idLogin = window.localStorage.getItem("idLogin");

let search = false;

window.addEventListener("load", function(){
    console.log(idLogin);
    if(idLogin == "null"){
        withoutLogin();
    }else{
        withLogin();
    }
})

let button = document.querySelector(".button-login");
let button_logout = document.querySelector(".button-logout");
let modal = document.querySelector(".modal");
let modal_overlay = document.querySelector(".modal-overlay");
let login = document.querySelector(".login");
let close = document.querySelector(".close");

let loading = document.querySelector(".loading");

let messages = document.querySelector(".messages");
let groupsList = document.querySelector(".groups-list");
let nameGroup = document.querySelector(".name-group");
let groupsHtml = [];

let addGroup = document.querySelector(".add-group");
let sendMessages = document.querySelector(".send-message");

let idInput = document.getElementById("id");
let form = document.getElementById("form-login");

function filled(text){
    if(text.trim().length > 0){
        return true
    }else{
        return false;
    }
};

function openModal(){
    button.addEventListener("click", function(){
        modal.style.display = "block";
        idInput.focus();
    });    
};

openModal();

function closeModal(){
    modal.style.display = "none";
};

window.addEventListener("click", function(event){
    if(event.target == modal_overlay){
        closeModal();
    }
});

close.addEventListener("click", closeModal);

function withLogin(){
    groupsList.style.display = "block";
    addGroup.style.display = "block";
    nameGroup.style.display = "block";
    messages.style.display = "block";
    // sendMessages.style.display = "block";
    button.style.display = "none";
    button_logout.style.display = "block";
}

function withoutLogin(){
    groupsList.style.display = "none";
    addGroup.style.display = "none";
    nameGroup.style.display = "none";
    messages.style.display = "none";
    sendMessages.style.display = "none";
    button.style.display = "block";
    button_logout.style.display = "none";

    for(let i = 0, size = groupsHtml.length; i<size; i++){
        groupsHtml[i].classList.remove("active");
    };

    messages.innerHTML = "";
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    if(filled(idInput.value) == false){
        return;
    }

    window.localStorage.setItem("idLogin", idInput.value);
    idLogin = window.localStorage.getItem("idLogin");
    console.log(idLogin)
    idInput.value = "";
    nameGroup.innerHTML = "";
    withLogin();
    closeModal();
})

button_logout.addEventListener("click", function(){
    window.localStorage.setItem("idLogin", null);
    idLogin = window.localStorage.getItem("idLogin");
    console.log(idLogin)
    withoutLogin();
});

function showMessages(group){
    let name = group.groupName;
    let id = group.groupID;

    let groupName = document.createTextNode(name);
    nameGroup.innerHTML = "";
    messages.innerHTML = "";

    nameGroup.appendChild(groupName);

    loading.style.display = "block";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4){
            loading.style.display = "none";
            let obj = JSON.parse(xhttp.responseText);
            // console.log(obj);
            for(let i = 0, size = obj.length; i < size; i++){
                // console.log(obj[i]);
                let msg = obj[i].message;
                let contact = obj[i].userName;
                // console.log(contact);
                showMessage(msg, contact);
            }

            messages.scrollTop = messages.scrollHeight;

            search = false;
        };
    };

    xhttp.open('GET','http://rest.learncode.academy/api/Jhonny/'+id, true);
    xhttp.send();
};

function showMessage(msg, contact){
    let message = document.createElement("div");
    let container = document.createElement("div")
    let nameContact = document.createElement("div");
    let messageContact = document.createElement("div");
    let name = document.createElement("span");
    let messageSpan = document.createElement("span");
    let textName = document.createTextNode(contact);
    let textMessage = document.createTextNode(msg);

    name.appendChild(textName);
    messageSpan.appendChild(textMessage);
    nameContact.appendChild(name);
    nameContact.classList.add("name-contact");
    messageContact.appendChild(messageSpan);
    messageContact.classList.add("message-contact");
    container.appendChild(nameContact);
    container.appendChild(messageContact);
    container.classList.add("message-container")
    message.appendChild(container);
    message.classList.add("message");

    messages.appendChild(message);

    if(contact==idLogin){
        message.classList.add("active");
    }
}

let buttonSend = document.querySelector(".button-send .button");
let messageInput = document.getElementById("message");

let clickGroup = undefined;
let sending = false;

let formMessage = document.getElementById("form-message");

messageInput.addEventListener("keypress", function(e){
    if(e.keyCode == 13 && !e.shiftKey){        
        e.preventDefault();
        
        buttonSendClick(e);
        return;
    }
});

function buttonSendClick(event){
    event.preventDefault();

    if(clickGroup == undefined){
        return;
    }

    if(sending == true){
        return;
    }
    sending = true;

    if(filled(messageInput.value)){
        sendMessage(clickGroup, messageInput.value);   
    }

    messages.scrollTop = messages.scrollHeight;
}

formMessage.addEventListener("submit", buttonSendClick);

function sendMessage(group, message){
    let id = group.groupID;

    let xhttp = new XMLHttpRequest();
    let msg = {"userName":idLogin, "message":message};
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState==4){
            showMessage(messageInput.value, idLogin);
            messageInput.value = "";

            messages.scrollTop = messages.scrollHeight;

            sending = false;
        };
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/Jhonny/'+id, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let post = JSON.stringify(msg);
    xhttp.send(post);
};

function showGroups(Group){
    let group = document.createElement("div");
    let name_group = document.createElement("span");
    let icon = document.createElement("div");
    let img = document.createElement("img");
    let text = document.createTextNode(Group.groupName);

    img.src = "data:image/jpeg;base64,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";

    name_group.classList.add("name");
    name_group.appendChild(text);
    group.appendChild(name_group);
    icon.classList.add("icon");
    icon.appendChild(img);
    group.appendChild(icon);
    group.classList.add("group");

    groupsList.appendChild(group);
    groupsHtml.push(group);

    group.addEventListener("click", function(){

        if(search == true){
            return;
        }
        search = true;

        sendMessages.style.display = "block";

        messageInput.focus();
        
        clickGroup = Group;

        messageInput.value="";
        showMessages(Group);

        for(let i = 0, size = groupsHtml.length; i<size; i++){
            groupsHtml[i].classList.remove("active");
        };

        this.classList.add("active");

    });
};

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(xhttp.readyState==4){
        let obj_parsed = JSON.parse(xhttp.responseText);
        for(let i=0; i<obj_parsed.length; i++){
            showGroups(obj_parsed[i]);
        };
    };
};
xhttp.open('GET','http://rest.learncode.academy/api/Jhonny/groups', true);
xhttp.send();

let buttonAdd = document.querySelector(".button-add .button");
let groupNameInput = document.querySelector("#group-name");
let groupIdInput = document.querySelector("#group-id");

function postGroup(name, id){
    let xhttp = new XMLHttpRequest();
    let group = {"groupName":name, "groupID":id};
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4){
            showGroups(group);
            groupNameInput.value="";
            groupIdInput.value="";
        };
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/Jhonny/groups', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let post = JSON.stringify(group);
    xhttp.send(post);
};

buttonAdd.addEventListener("click", function(event){
    event.preventDefault();

    if(filled(groupNameInput.value) == false || filled(groupIdInput.value) == false){
        return;
    }

    postGroup(groupNameInput.value, groupIdInput.value);
});