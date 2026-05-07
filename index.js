document.addEventListener("DOMContentLoaded", () => {
  let flag = true;
  function saveNotes(e, title, notes, overlay) {
    if (!flag) return;
    console.log("1st worked !");
    const notesTitle = document.createElement("h4");
    notesTitle.innerText = title.value;

    const notesDesc = document.createElement("p");
    notesDesc.innerText = notes.value;

    const textWrap = document.createElement("div");
    textWrap.classList.add("text-wrap");

    textWrap.appendChild(notesTitle);
    textWrap.appendChild(notesDesc);

    wrapper.appendChild(textWrap);
    overlay.remove();
  }

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
      textWrap.remove();
      overlay.remove();
    });
    closePopup.addEventListener("click", () => overlay.remove());
    editNote.addEventListener("click", () => {
      flag = false;
      addNotes();

      const inputWrapper = document.getElementsByClassName("input-wrapper")[0];
      let inputChild = inputWrapper.children;

      inputChild[1].value = textWrap.firstElementChild.innerText;
      inputChild[3].value = textWrap.lastElementChild.innerText;
      const submit = document.querySelector(".save");   

      submit.addEventListener("click", () => {
        textWrap.firstElementChild.innerText = inputChild[1].value;
        textWrap.lastElementChild.innerText = inputChild[3].value;

        console.log("2nd worked\!");
        flag = true;
      });

      overlay.remove();
    });

    overlay.appendChild(popUp);
    popUp.appendChild(end);
    document.body.appendChild(overlay);
  };

  const wrapper = document.querySelector(".wrapper");
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

    const submit = document.createElement("button");
    submit.classList.add("save");
    submit.innerText = "Save";

    const closePopup = document.createElement("button");
    closePopup.innerText = "close";

    submit.addEventListener("click", (e) => {
      saveNotes(e, title, notes, overlay);
      overlay.remove();
    });
    closePopup.addEventListener("click", () => overlay.remove());

    const end = document.createElement("div");
    end.appendChild(submit);
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

  const plusIcon = document.getElementsByClassName("plus-icon")[0];
  plusIcon.addEventListener("click", addNotes);
});
