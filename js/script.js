class LocStorage {
	static setBooks(book) {
		let bookList = LocStorage.getBooks();
		bookList.push(book);
		localStorage.setItem("books", JSON.stringify(booksList));
	}

	static removeBooks(isbnNumber) {
		let booksList = LocStorage.getBooks();
		booksList.forEach((book, i) => {
			if (book.isbnNumber === isbnNumber) {
				booksList.splice(i, 1);
			}
		});

		localStorage.setItem("books", JSON.stringify(booksList));
	}

	static getBooks() {
		let booksList = null;

		if (localStorage.getItem("books") === null) {
			booksList = [];
		} else {
			booksList = JSON.parse(localStorage.getItem("books"));
		}
		return booksList;
	}
}

class Book {
	constructor(bookTitle, bookAuthor, isbnNumber) {
		this.bookTitle = bookTitle;
		this.bookAuthor = bookAuthor;
		this.isbnNumber = isbnNumber;
	}
}

class UI {
	static #changeBookColor = setInterval(() => {
		const bookSpan = document.getElementById("bookSpan");
		bookSpan.style.color = `
		rgb(${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)}
        )`;
	}, 600);

	static #changelistColor = setInterval(() => {
		const listSpan = document.getElementById("listSpan");
		listSpan.style.color = `
    rgb(${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)}
        )`;
	}, 600);

	static displayBooks() {
		let booksList = LocStorage.getBooks();
		booksList.forEach((book) => UI.addBook(book));
	}

	static addBook(book) {
		const booksContainer = document.getElementById("booksContainer");

		const newBookDiv = document.createElement("div");
		const newBookFrag = new DocumentFragment();
		const newBookXButton = document.createElement("button");

		newBookDiv.className = "book";
		newBookDiv.id = "book";
		newBookXButton.textContent = "X";
		newBookXButton.dataset.isbn = book.isbnNumber;

		for (let i in book) {
			const newBookP = document.createElement("p");
			newBookP.textContent = book[i];
			newBookFrag.append(newBookP);
		}

		newBookFrag.appendChild(newBookXButton);
		newBookDiv.appendChild(newBookFrag);
		booksContainer.appendChild(newBookDiv);

		newBookXButton.addEventListener("click", function (e) {
			e.target.parentElement.remove();
			LocStorage.removeBooks(e.target.dataset.isbn);
		});
	}
}

// EVENTLISTENERS

document.forms[0].addEventListener("submit", function (e) {
	e.preventDefault();

	if (
		e.target.bookTitle.value.length <= 0 ||
		e.target.bookAuthor.value.length <= 0 ||
		e.target.isbnNumber.value === ""
	) {
		alert("Please fill in all the fields");
		return;
	} else {
		let newBook = new Book(
			e.target.bookTitle.value,
			e.target.bookAuthor.value,
			e.target.isbnNumber.value,
		);

		UI.addBook(newBook);

		LocStorage.addBook(newBook)


	}

	document.forms[0].reset();
});

document.addEventListener("DOMContentLoaded", function () {
	UI.displayBooks();
});
