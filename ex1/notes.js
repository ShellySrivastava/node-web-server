const fs = require('fs');

let fetchNotes = () => {
	try{
		let notes = fs.readFileSync("./notes-file.json");
		return JSON.parse(notes);
	}
	catch (e){
		return [];
	}
}

let saveNotes = (notes) => {
	let saveNote = JSON.stringify(notes);
	fs.writeFileSync("./notes-file.json", saveNote);
}

let addNote = (title, body) => {
	let notes = fetchNotes();
	let new_note = {
		title,
		body
	};
	let duplicateNote = notes.filter ( note => note.title === new_note.title );
	if ( duplicateNote.length === 0 ){
		notes.push(new_note);
		console.log( "New note saved");
	}
	else{
		console.log( "Duplicate note found");
	}
	saveNotes(notes);
}

let removeNote = (title) => {
	let notes = fetchNotes();
	let removedNotes = notes.filter (note => note.title !== title);
	if(removedNotes.length !== notes.length){
		console.log("Note removed");
	}
	else{
		console.log("note not found");
	}
	saveNotes(removedNotes);
}

let readNote = (title) => {
	let notes = fetchNotes();
	let req_note = notes.filter (note => note.title === title);
	if (req_note.length > 0){
		let req_title = req_note[0].title;
		let req_body = req_note[0].body;
		console.log("\n\nTitle: ", req_title, "\nBody: ", req_body);
	}
	else{
		console.log("Note not found");
	}
}

let listNotes = () => {
	let notes = fetchNotes();
	let req_title, req_body;
	if( notes.length !== 0){
		notes.forEach(function(note){
			req_title = note.title;
			req_body = note.body;
			console.log("\n\nTitle: ", req_title, "\nBody: ", req_body);
		});
	}
	else{
		console.log("File is empty");
	}

}

module.exports = {
	addNote,
	removeNote,
	readNote,
	listNotes
};