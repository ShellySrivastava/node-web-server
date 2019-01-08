const note = require('./notes.js');
const argv = require('yargs').argv;
var command = argv._[0];
var title = argv.title;
var body = argv.body;
switch(command){
	case "add" : {
		note.addNote(title, body);
	}
	break;
	case "remove" : {
		note.removeNote(title);
	}
	break;
	case "read" : {
		note.readNote(title);
	}
	break;
	case "list" : {
		note.listNotes();
	}
	break;
	default: console.log("COMMAND NOT FOUND !!!");
}