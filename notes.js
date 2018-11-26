console.log('Starting notes.js');

const fs = require('fs');

// to use functions from this file in any other file, we need to export the functions

var fetchNotes = () => {
    notes = [];
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (err) {
        // if file does not exist or it contains corrupted data
        return [];
    }
}

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var note = {title, body};
    var notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAllNotes = () => {
    var notes = fetchNotes();
    for (var i = 0; i < notes.length; i++) {
        console.log(`${notes[i].title} ${notes[i].body}`);
    }
}

var getNote = (title) => {
  console.log(`Getting note ${title}`);
}

var removeNote = (title) => {
  console.log(`Removing note ${title}`);
}

module.exports = {
  addNote: addNote,
  getAllNotes: getAllNotes,
  getNote: getNote,
  removeNote: removeNote
}
