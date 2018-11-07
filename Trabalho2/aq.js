let contatos = [
    { 
      usuario: "august0",
      mensagens: [
       {
         usuario: "august0",
         texto: "Eai man, blz?"
       },
       {
         usuario: "ricardo",
         texto: "blz e tu?"
       },
       {
          usuario: "august0",
          texto: "top"
        }
      ]
     },
     { 
       usuario: "roberta1",
       mensagens: [
         {
           usuario: "roberta1",
           texto: "olá, boa noite"
         },
         {
           usuario: "ricardo",
           texto: "opa"
         },
         {
           usuario: "roberta1",
           texto: "hehe"
         }
       ]
     },
     { 
       usuario: "mansa",
       mensagens: [
         {
           usuario: "ricardo",
           texto: "top?"
         },
         {
           usuario: "mansa",
           texto: "Yep"
         },
         {
           usuario: "ricardo",
           texto: "vrau"
         }
       ]
     }
   ];
   
   
   let contactsList = document.querySelector(".contacts-list");
   let messages = document.querySelector(".messages");
   let nameContact = document.querySelector(".name-contact");
   let contatosHtml = [];
   
   function mostrarMensagens(contato){
     let mensagens = contato.mensagens;
     let name = document.createTextNode(contato.usuario);
    
     nameContact.innerHTML = "";
     messages.innerHTML = "";
     
     nameContact.appendChild(name);
     
     for(let i = 0, size = mensagens.length; i < size; i++){
       let mensagem = mensagens[i];
       let message = document.createElement("div");
       let span = document.createElement("span");
       let text = document.createTextNode(mensagem.texto);
       
       span.appendChild(text);
       message.classList.add("message");
       
       message.appendChild(span);
       
       if(contato.usuario != mensagem.usuario){
         message.classList.add("me");
       }
       
       messages.appendChild(message);
     }
   }
   
   function mostrarContato(contato){
     let contact = document.createElement("div");
     let icone = document.createElement("div");
     let img = document.createElement("img");
     let nameContact = document.createElement("span");
     let textName = document.createTextNode(contato.usuario);
     
     nameContact.classList.add("name");
     nameContact.appendChild(textName);
     img.src = "data:image/png;base64,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";
     icone.classList.add("icon");
     icone.appendChild(img);
     contact.appendChild(nameContact);
     contact.appendChild(icone);
     contact.classList.add("contact");
     
     contactsList.appendChild(contact);
     contatosHtml.push(contact);
     
     contact.addEventListener("click", function(){
       mostrarMensagens(contato);
       
       for(let i = 0, size = contatosHtml.length; i<size; i++){
         contatosHtml[i].classList.remove("active");
       }
       
       this.classList.add("active");
     });
   }
   
   
   window.addEventListener("load", function(){
     for(let i=0, size = contatos.length; i<size; i++){
       mostrarContato(contatos[i]);
     }
   });