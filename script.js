const addButton = document.querySelector("#add");
const notesContainer = document.querySelector("#notesContainer");

const updateLSData = () => {
  const textAreaData = document.querySelectorAll("textarea");
  const notes = [];
  textAreaData.forEach((note) => {
    return notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmlData = `
 
  <div class="operation">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>
      <div class="main ${text ? "" : "hidden"}" ></div>
      <textarea placeholder="Write your text here" autofocus class="${
        text ? "hidden" : ""
      } "></textarea>
  

  `;
  note.innerHTML = htmlData;

  const deletebtn = note.querySelector(".delete");
  const editbtn = note.querySelector(".edit");
  const maindiv = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  deletebtn.addEventListener("click", () => {
    note.remove();
    updateLSData();
  });

  textarea.value = text;
  maindiv.innerHTML = text;

  editbtn.addEventListener("click", () => {
    maindiv.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
  });
  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    maindiv.innerHTML = value;

    updateLSData();
  });

  notesContainer.appendChild(note);
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener("click", () => addNewNote());
