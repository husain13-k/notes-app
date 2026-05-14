const API = "/api/notes";

async function loadNotes() {

    const response = await fetch(API);

    const notes = await response.json();

    displayNotes(notes);
}

async function addNote() {

    const title = document.getElementById("title").value;

    const body = document.getElementById("body").value;

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body })
    });

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";

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
            </div>
        `;
    });
}

async function searchNotes() {

    const keyword = document.getElementById("search").value;

    if (keyword.trim() === "") {
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
