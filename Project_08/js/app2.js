import NotesView from "./viewNotes.js";
import NotesAPI from "./notesAPI.js"

export default class App {
    constructor (root){
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handelers());
        this._refereshNote();

        const searhContainer = root.parentElement.querySelector(".search-input");
        const searchBtn =  root.parentElement.querySelector(".search");
        searchBtn.addEventListener("click", ()=>{
            if (searhContainer.value.trim() == ""){
                alert("Please enter what you want to find");
            }
            else{
                this._searhNotes(searhContainer.value)
            }
            searhContainer.value="";
        })

    }

    _searhNotes(text){
        text = text.toLowerCase();
        const notes = NotesAPI.getAllNote();
        const desiredNote = notes.filter(note => note.title.toLowerCase().includes(text) || note.body.toLowerCase().includes(text));
        if (desiredNote.length >= 1){
            this.view.updateNoteCrads(desiredNote);
        }
        else {
            alert("No Note foud");
        }
    }

    _refereshNote (){
        const notes = NotesAPI.getAllNote();
        this._setNotes(notes);
        if (notes.length > 0){
            this._setActiveNote(notes[0])
        }
    }
    _setNotes(notes){
        this.notes = notes;
        this.view.updateNoteCrads(notes);
        this.view.updateNotePreviewVisibility(notes.length > 0);
    }
    _setActiveNote(note){
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }


    _handelers(){
        return {
            onNoteSelect : noteId =>{
                const  selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteEdit : (title, body) =>{
                NotesAPI.saveNotes({
                    id: this.activeNote.id,
                    title : title,
                    body : body
                });
                this._refereshNote();
            },
            onNoteAdd : () => {
                const newNote = {
                    title :  "Note title",
                    body : "Take note..."
                }
                NotesAPI.saveNotes(newNote);
                this._refereshNote();
            },
            onNoteDelete : noteId =>{
                NotesAPI.deleteNote(noteId);
                this._refereshNote();
            },
        }
    }
}