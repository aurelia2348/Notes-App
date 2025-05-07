class NoteForm extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <form id="note-form">
                <label for="title">Judul Catatan:</label>
                <input type="text" id="title" name="title" required>
                <span id="title-error" class="error"></span>

                <label for="body">Isi Catatan:</label>
                <textarea id="body" name="body" required></textarea>
                <span id="char-count">0 karakter</span>
                <span id="body-error" class="error"></span>

                <button type="submit">Tambah Catatan</button>
            </form>
        `;

        const form = this.querySelector("#note-form");
        const titleInput = this.querySelector("#title");
        const bodyInput = this.querySelector("#body");
        
        titleInput.addEventListener("input", validateTitle);
        bodyInput.addEventListener("input", validateBody);
        form.addEventListener("submit", handleFormSubmit);
    }
}

function validateTitle(event) {
    const titleInput = event.target;
    const errorSpan = document.getElementById("title-error");
    const regex = /^[A-Za-z]/; 

    if (!regex.test(titleInput.value)) {
        errorSpan.textContent = "Judul harus diawali dengan huruf.";
        titleInput.dataset.valid = "false";
    } else {
        errorSpan.textContent = "";
        titleInput.dataset.valid = "true";
    }
}

function validateBody(event) {
    const bodyInput = event.target;
    const charCountSpan = document.getElementById("char-count");
    const errorSpan = document.getElementById("body-error");

    charCountSpan.textContent = `${bodyInput.value.length} karakter`;

    if (bodyInput.value.trim().length < 5) {
        errorSpan.textContent = "Isi catatan minimal 5 karakter.";
        bodyInput.dataset.valid = "false";
    } else {
        errorSpan.textContent = "";
        bodyInput.dataset.valid = "true";
    }
}


function handleFormSubmit(event) {
    event.preventDefault(); 

    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");

    const isTitleValid = titleInput.dataset.valid === "true";
    const isBodyValid = bodyInput.dataset.valid === "true";

    if (isTitleValid && isBodyValid) {
        // Kirim custom event
        const noteData = {
            title: titleInput.value,
            body: bodyInput.value
        };

        const addNoteEvent = new CustomEvent("add-note", { detail: noteData });
        document.dispatchEvent(addNoteEvent); // dikirim ke luar komponen

        // Reset form
        titleInput.value = "";
        bodyInput.value = "";
        document.getElementById("char-count").textContent = "0 karakter";
        titleInput.dataset.valid = "false";
        bodyInput.dataset.valid = "false";
    }
}




function addNote(title, body) {
    if (title && body) {
        notesData.push({
            id: `notes-${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            archived: false,
        });

        renderNotes();
        saveNotesToStorage(); 

        document.getElementById("title").value = "";
        document.getElementById("body").value = "";
        document.getElementById("char-count").textContent = "0 karakter";
        document.getElementById("title").dataset.valid = "false";
        document.getElementById("body").dataset.valid = "false";
    }
}

customElements.define("note-form", NoteForm);
