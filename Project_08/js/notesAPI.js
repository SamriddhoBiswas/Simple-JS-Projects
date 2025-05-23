export default class NotesAPI{
    static getAllNote(){
        const notesData = localStorage.getItem("note-data") || "[]";
        const notes = JSON.parse(notesData);
        return notes.sort((a, b) =>{
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }
    static saveNotes(noteToSave){
        const allNotes = NotesAPI.getAllNote();
        const exiting = allNotes.find(note => note.id == noteToSave.id);

        if(exiting){
            exiting.title = noteToSave.title;
            exiting.body = noteToSave.body;
            exiting.updated = new Date().toISOString();
        }
        else{
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            allNotes.push(noteToSave);
        }

        localStorage.setItem("note-data", JSON.stringify(allNotes));
    }



    static deleteNote(id){
        const allNotes = NotesAPI.getAllNote();
        const updatedNotes = allNotes.filter(note => note.id != id);
        localStorage.setItem("note-data", JSON.stringify(updatedNotes));
    }
}