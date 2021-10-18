export function createInputError(msg,element,max){
    if(element.children.length === max){
      let div = document.createElement("div");
      div.className = "err_txt";
      div.textContent = msg;
      element.childNodes[0].style.borderColor ="red";
      element.appendChild(div);
    }

  }



export function removeChildbyIndex(parent,index){
    if(parent.children.length > 1){
      parent.removeChild(parent.childNodes[index])
      parent.childNodes[0].style.borderColor ="";
    } 
  }
