let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function removeBookById(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  showBooks();
}

function showBooks() {
  const container = document.querySelector("#library");
  container.innerHTML = "";

  myLibrary.forEach((item) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add('book-card')
    bookDiv.textContent = `${item.title} - ${item.author} - ${
      item.pages
    } páginas - ${item.isRead ? "Leído" : "No leído"}`;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container')

    const deleteButton = document.createElement("Button");
    deleteButton.textContent = "Eliminar";
    deleteButton.setAttribute("data-id", item.id);
    deleteButton.addEventListener("click", () => {
      removeBookById(item.id);
    });

    const toggleReadButton = document.createElement("button");
    toggleReadButton.textContent = item.isRead
      ? "Marcar como No Leído"
      : "Marcar como Leído";
    toggleReadButton.addEventListener("click", () => {
      item.toggleReadStatus();
      showBooks();
    });



    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(toggleReadButton);
    bookDiv.appendChild(buttonContainer)
    container.appendChild(bookDiv);
  });
}

showBooks();

const dialog = document.querySelector("#bookDialog");
const openBtn = document.querySelector(".createBookButton");
const closeBtn = document.querySelector("#closeDialog");
const form = document.querySelector("#bookForm");

openBtn.addEventListener("click", () => dialog.showModal());
closeBtn.addEventListener("click", () => dialog.close());
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = parseInt(document.querySelector("#pages").value, 10);
  const isRead = document.querySelector("#isRead").checked;
  addBookToLibrary(title, author, pages, isRead);
  showBooks();
  form.reset();
  dialog.close();
});
