class NoteItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['title', 'body', 'created-at', 'data-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute("title");
        const body = this.getAttribute("body");
        const createdAt = this.getAttribute("created-at");
        const noteId = this.getAttribute("data-id");

        this.shadowRoot.innerHTML = `
            <style>
                .note-card {
                    background: #fff;
                    padding: 15px;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    font-family: Arial, sans-serif;
                    transition: transform 0.2s ease-in-out;
                }
                .note-card:hover {
                    transform: scale(1.02);
                }
                .note-title {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: #333;
                }
                .note-body {
                    font-size: 1rem;
                    color: #555;
                    margin: 10px 0;
                }
                .note-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.9rem;
                    color: #777;
                    border-top: 1px solid #ddd;
                    padding-top: 10px;
                    margin-top: 10px;
                }
                .note-buttons button {
                    background:rgb(255, 204, 103);
                    border: none;
                    padding: 8px 12px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-right: 5px;
                    transition: background 0.3s;
                }
                .note-buttons button:hover {
                    background: rgb(237, 172, 43);
                }
                .delete-button {
                    background: rgb(255, 91, 88) !important;
                    color: white;
                }
                .delete-button:hover {
                    background: rgb(230, 90, 87) !important;
                }
            </style>
            <div class="note-card">
                <div class="note-title">${title}</div>
                <div class="note-body">${body}</div>
                <div class="note-footer">
                    <small>${new Date(createdAt).toLocaleDateString()}</small>
                    <div class="note-buttons">
                        <button id="edit-btn">Edit</button>
                        <button id="delete-btn" class="delete-button">Hapus</button>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById("edit-btn").addEventListener("click", () => {
            editNote(noteId);
        });

        this.shadowRoot.getElementById("delete-btn").addEventListener("click", () => {
            deleteNote(noteId);
        });
    }
}

customElements.define("note-item", NoteItem);
