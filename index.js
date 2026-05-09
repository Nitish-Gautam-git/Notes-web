document.addEventListener("DOMContentLoaded", () => {
    console.log() ;
    const wrapper = document.querySelector(".wrapper");
    const plusIcon = document.getElementsByClassName("plus-icon")[0];
    function saveToDisk(){
        localStorage.setItem('allNotes' , JSON.stringify(allNotes)) ;
    }

    function renderUI(){
        
        wrapper.replaceChildren() ;
        wrapper.insertAdjacentElement('afterbegin' , plusIcon) ;
        
        if(allNotes.length === 0 ) return ;
        allNotes.forEach((element , i) => {
            const notesTitle = document.createElement("h4");
            notesTitle.innerText = element[0] ;

            const notesDesc = document.createElement("p");
            notesDesc.innerText =  element[1];
            
            const textWrap = document.createElement("div");
            textWrap.classList.add("text-wrap");
            textWrap.dataset.id = i ;
            
            textWrap.appendChild(notesTitle);
            textWrap.appendChild(notesDesc);
            
            wrapper.appendChild(textWrap);
        });
        
    }
    let data = localStorage.getItem('allNotes') ;
    let allNotes =(data)? JSON.parse(data) : [] ;

    renderUI();
    let flag = true;
    
    let openPopup = (e) => {
        const textWrap = e.target.closest(".text-wrap");

        if (!textWrap) return; // clicked on wrapper or first box , closest will return null

        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const popUp = document.createElement("div");
        popUp.classList.add("popup");
        popUp.innerHTML = textWrap.innerHTML;

        const deleteNote = document.createElement("button");
        deleteNote.innerText = "delete";

        const editNote = document.createElement("button");
        editNote.innerText = "edit";

        const closePopup = document.createElement("button");
        closePopup.innerText = "close";

        const end = document.createElement("div");
        end.appendChild(editNote);
        end.appendChild(deleteNote);
        end.appendChild(closePopup);

        deleteNote.addEventListener("click", (e2) => {
            allNotes.splice(textWrap.dataset.id , 1) ;
            
            textWrap.remove();
            overlay.remove();
            saveToDisk() ;
            renderUI() ;

        });
        closePopup.addEventListener("click", () => overlay.remove());

        editNote.addEventListener("click", () => {
            flag = false;
            addNotes();

            const inputWrapper = document.getElementsByClassName("input-wrapper")[0];
            
            let prevTitle = textWrap.firstElementChild.innerText   ;
            let prevNotes = textWrap.lastElementChild.innerText   ;
            
            let inputChild = inputWrapper.children;
            inputChild[1].value = prevTitle ;
            inputChild[3].value = prevNotes ;

            const saveButton = document.querySelector(".save");

            saveButton.addEventListener("click", () => {
                if(inputChild[1].value.trim() == '' ||  inputChild[3].value.trim() == '' ){
                    return window.alert('Title or Note can\'t be empty') ;
                }

                allNotes.splice( textWrap.dataset.id , 1 , [inputChild[1].value, inputChild[3].value] ) ; 
                

                inputWrapper.closest('.overlay').remove();
                flag = true;
                saveToDisk() ;
                renderUI() ;
            });
            
            overlay.remove();
        });

        overlay.appendChild(popUp);
        popUp.appendChild(end);
        document.body.appendChild(overlay);
    };

    wrapper.addEventListener("click", openPopup);


    let addNotes = (e) => {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const inputWrapper = document.createElement("div");
        const title = document.createElement("input");
        title.type = "text";
        title.id = "title";

        const titleLabel = document.createElement("label");
        titleLabel.innerText = "Title";
        titleLabel.htmlFor = "title";

        const notes = document.createElement("textarea");
        notes.cols = "30";
        notes.rows = "8";
        notes.id = "notes";

        const notesLabel = document.createElement("label");
        notesLabel.innerText = "Notes";
        notesLabel.htmlFor = "notes";

        const saveButton = document.createElement("button");
        saveButton.classList.add("save");
        saveButton.innerText = "Save";

        const closePopup = document.createElement("button");
        closePopup.innerText = "close";

        saveButton.addEventListener("click", (e) => {
            if(!flag) return  ;

            if(title.value.trim() == '' ||  notes.value.trim() == '' ){
                return window.alert('Title or Note can\'t be empty') ;
            }
            allNotes.push( [title.value , notes.value ]) ;
            overlay.remove();
            saveToDisk() ;
            renderUI() ;

        });

        closePopup.addEventListener("click", () => {flag = true; overlay.remove() ;});

        const end = document.createElement("div");
        end.appendChild(saveButton);
        end.appendChild(closePopup);

        inputWrapper.appendChild(titleLabel);
        inputWrapper.appendChild(title);
        inputWrapper.appendChild(notesLabel);
        inputWrapper.appendChild(notes);
        inputWrapper.appendChild(end);

        inputWrapper.classList.add("input-wrapper");

        overlay.appendChild(inputWrapper);
        document.body.appendChild(overlay);
    };

    plusIcon.addEventListener("click", addNotes);
});
