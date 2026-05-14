const API = "/api/notes";

let editingId = null;

async function loadNotes() {

    const response = await fetch(API);

    const notes = await response.json();

    displayNotes(notes);
}

async function addNote() {

    const title = document.getElementById("title").value;

    const body = document.getElementById("body").value;

    if(title.trim() === "" || body.trim() === "") {
        alert("Please fill all fields");
        return;
    }

    if(editingId === null) {

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, body })
        });

    } else {

        await fetch(`${API}/${editingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, body })
        });

        editingId = null;
    }

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";

    document.querySelector("button").innerText = "Add Note";

    loadNotes();
}

function displayNotes(notes) {

    const notesDiv = document.getElementById("notes");

    notesDiv.innerHTML = "";

    notes.forEach(note => {

        notesDiv.innerHTML += `
            <div class="note">

                <h3>${note.title}</h3>

                <p>${note.body}</p>

                <div class="buttons">

                    <button onclick="editNote(${note.id}, '${note.title}', '${note.body}')">
                        Edit
                    </button>

                    <button onclick="deleteNote(${note.id})">
                        Delete
                    </button>

                </div>

            </div>
        `;
    });
}

function editNote(id, title, body) {

    document.getElementById("title").value = title;

    document.getElementById("body").value = body;

    editingId = id;

    document.querySelector("button").innerText = "Update Note";
}

async function deleteNote(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    loadNotes();
}

async function searchNotes() {

    const keyword = document.getElementById("search").value;

    if(keyword.trim() === "") {
        loadNotes();
        return;
    }

    const response = await fetch(
        `${API}/search?keyword=${keyword}`
    );

    const notes = await response.json();

    displayNotes(notes);
}

loadNotes();