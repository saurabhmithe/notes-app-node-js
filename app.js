// modules are units of functionality
// modules are loaded using require keyword
// modules can be third party or user's own files

// fs is the file system module used to access the file system and manipulate files
const fs = require('fs');

// lodash is a third party npm module
// third party module needs to be installed before requiring
// node first searches for a core module with this name and when not found, it checks the package.json to see if it is installed
const _ = require('lodash');

// import functionality from notes.js file
// notes.js will run automatically once this file runs
const notes = require('./notes.js');

// a module to parse command line input easily
const yargs = require('yargs');

const titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    }).command('remove', 'Remove a note', {
        title: titleOptions
    }).command('read', 'Read a note', {
        title: titleOptions
    }).command('list', 'List all notes')
    .help()
    .argv;

// get the command line argument
var command = process.argv[2];

if(command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Created');
        notes.logNote(note);
    } else console.log('Failed to add node');
}
else if (command === 'list') {
    var allNotes = notes.getAllNotes();
    console.log(`Printing ${allNotes.length} notes`);
    allNotes.forEach((note) => notes.logNote(note));
}
else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        notes.logNote(note);
    } else console.log('Note not found');
}
else if (command === 'remove') {
    if(notes.removeNote(argv.title)) {
        console.log('Note Removed');
        console.log('---');
        console.log(`Title: ${argv.title}`);
    } else console.log('Failed to remove note. Note not found.');

}
else console.log('command not recognized');
