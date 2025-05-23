export default class NotesView {
  constructor(
    root,
    { onNoteSelect, onNoteEdit, onNoteAdd, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteEdit = onNoteEdit;
    this.onNoteAdd = onNoteAdd;
    this.onNoteDelete = onNoteDelete;
    this.root.innerHTML = `
        <div class="left-container">
        <button class = "addNote">Add Note <i class="fa-solid fa-plus"></i></button>

        <div class="cards-container">
          
          
        </div>
      </div>

      <div class="right-container">
        <input type="text" class="note-title" placeholder="Enter note title 📝">
        <hr />
        <textarea name="" class="note-body">Start writing note here...</textarea>
        <button class="close-mobile-btn"><i class="fa-solid fa-xmark"></i></button>
      </div>
        `;
    const addNote = this.root.querySelector(".addNote");
    const noteTitle = this.root.querySelector(".note-title");
    const noteBody = this.root.querySelector(".note-body");
    const closeMBtn = this.root.querySelector(".close-mobile-btn");

    closeMBtn.addEventListener("click", ()=>{
      this.root.querySelector(".left-container").style.display = "flex";
      this.root.querySelector(".right-container").style.display = "none";
    })

    addNote.addEventListener("click", () => {
      this.noteMobbilePreview();
      this.onNoteAdd();
    });
    [noteTitle, noteBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTitle = noteTitle.value.trim();
        const updatedBody = noteBody.value.trim();
        this.onNoteEdit(updatedTitle, updatedBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  _createNoteCardHTML(id, title, body = "", updated) {
    const maxBodyLength = 60;
    return `
     <div class="card" data-note-id="${id}">
              <h4>${title}</h4>
              <p>
              ${body.substring(0, maxBodyLength)}
              ${body.length > maxBodyLength ? "..." : ""}
              </p>
              <span>${updated.toLocaleString(undefined, {
                dataStle: "full",
              })}</span>
              <i class="fa-solid fa-trash delete-card"></i>
            </div>
     `;
  }

  updateNoteCrads(notes) {
    const noteCardContainer = this.root.querySelector(".cards-container");
    // empty list
    noteCardContainer.innerHTML = "";
    for (const note of notes) {
      const html = this._createNoteCardHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );
      noteCardContainer.insertAdjacentHTML("beforeend", html);
    }

    // add select and delete for each notes
    noteCardContainer.querySelectorAll(".card").forEach((noteCard) => {
      noteCard.addEventListener("click", () => {
        this.noteMobbilePreview();
        this.onNoteSelect(noteCard.dataset.noteId);
      });
      noteCard.addEventListener("dblclick", () => {
        const dbDelete = confirm("Are you realy want to delete this note?");
        if (dbDelete) {
          this.onNoteDelete(noteCard.dataset.noteId);
        }
      });

      noteCard.querySelector(".delete-card").addEventListener("click", ()=>{
        const dbDelete = confirm("Are you realy want to delete this note?");
        if (dbDelete) {
          this.onNoteDelete(noteCard.dataset.noteId);
        }
      })
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".note-title").value = note.title;
    this.root.querySelector(".note-body").value = note.body;
    this.root.querySelectorAll(".card").forEach((noteCard) => {
      noteCard.classList.remove("card-selected");
    });
    this.root
      .querySelector(`.card[data-note-id = "${note.id}"]`)
      .classList.add("card-selected");
  }

  noteMobbilePreview(){
    if (window.screen.width <= 550 ){
      this.root.querySelector(".left-container").style.display = "none";
      this.root.querySelector(".right-container").style.display = "flex";
    }
  }

  updateNotePreviewVisibility(visiable){
    this.root.querySelector(".right-container").style.visibility = visiable ? "visible" : "hidden";
  }
}
