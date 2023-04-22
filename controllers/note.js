const Note = require('../models/note')
const Course = require('../models/course')

module.exports.createNote = async (req,res) => {

    try {
        const {id} = req.params;
    
        const course = await Course.findById(id)
        const note = new Note(req.body.note)
        note.user = req.user._id

        course.notes.push(note)
        await course.save()
        await note.save()

        //flash
        req.flash("success", "Review successfully saved")
        res.redirect(`/courses/${id}`)
        
    } catch (error) {
        res.send("error", error)
    }
}


module.exports.updateNote = async (req,res) =>{
    //updating note details
    //more to come
}

module.exports.deleteNote = async (req,res) => {
    //delete the note
    const {id, noteId} = req.params;
    await Course.findByIdAndUpdate(id, {$pull: {notes: noteId}})
    await Note.findByIdAndDelete(noteId);
    req.flash("success", "Note successfully deleted")
    res.redirect(`/courses/${id}`);
}