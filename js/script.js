class Book {
	constructor(bookTitle, bookAuthor, isbnNumber) {
		this.bookTitle = bookTitle;
		this.bookAuthor = bookAuthor;
		this.isbnNumber = isbnNumber;
	}
}

class CustomStorage {
	static getBooksFromLocalStorage() {
		let booksList = null;

		if (localStorage.getItem("books") === null) {
			booksList = [];
		} else {
			booksList = JSON.parse(localStorage.getItem("books"));
		}
		return booksList;
	}

	static setBooksToLS(book) {
		let booksList = CustomStorage.getBooksFromLocalStorage();
		booksList.push(book);
		localStorage.setItem("books", JSON.stringify(booksList));
	}

	static removeBooks(isbnNumber) {
		let booksList = CustomStorage.getBooksFromLocalStorage();
		booksList.forEach((book, i) => {
			if (Number(book.isbnNumber) === Number(isbnNumber)) {
				booksList.splice(i, 1);
			}
		});
		localStorage.setItem("books", JSON.stringify(booksList));
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

	static displayBooks(booksList = CustomStorage.getBooksFromLocalStorage()) {
		booksList.forEach((book) => this.addNewBook(book));
	}

	static addNewBook(book) {
		const booksContainer = document.getElementById("booksContainer");
		const booksContMid = document.createElement("div");
		const newBookDiv = document.createElement("div");
		const newBookFrag = new DocumentFragment();
		const newBookXButton = document.createElement("button");

		booksContMid.className = "booksContMid";
		newBookDiv.className = "book";
		newBookDiv.id = "book";
		newBookXButton.textContent = "X";
		newBookXButton.dataset.isbn = Number(book.isbnNumber);

		for (let i in book) {
			const newBookP = document.createElement("p");
			newBookP.textContent = book[i];
			newBookFrag.append(newBookP);
		}

		newBookFrag.appendChild(newBookXButton);
		newBookDiv.appendChild(newBookFrag);
		booksContMid.appendChild(newBookDiv);
		booksContainer.appendChild(booksContMid);

		newBookXButton.addEventListener("click", function (e) {
			e.target.parentElement.remove();
			CustomStorage.removeBooks(e.target.dataset.isbn);
		});
	}
}

// EVENTLISTENERS

document.forms[0].addEventListener("submit", function (e) {
	e.preventDefault();
	let booksList = JSON.parse(localStorage.getItem("books"));

	if (
		e.target.bookTitle.value.length <= 0 ||
		e.target.bookAuthor.value.length <= 0 ||
		e.target.isbnNumber.value === ""
	) {
		alert("Please fill in all the fields");
		return;
	}

	let newBook = new Book(
		e.target.bookTitle.value,
		e.target.bookAuthor.value,
		e.target.isbnNumber.value,
	);

	if (booksList.some((book) => Number(book.isbnNumber) === Number(newBook.isbnNumber))) {
		return;
	}

	UI.addNewBook(newBook);
	CustomStorage.setBooksToLS(newBook);

	document.forms[0].reset();
});

document.forms[1].addEventListener("submit", function (e) {
	e.preventDefault();
	let booksList = JSON.parse(localStorage.getItem("books"));

	if (
		booksList.some((book) => book.bookTitle.toLowerCase() === e.target.findBook.value.toLowerCase())
	) {
		return;
	} else if (
		booksList.some((book) => book.bookAuthor.toLowerCase() == e.target.findBook.value.toLowerCase())
	) {
		return;
	} else if (booksList.some((book) => Number(book.isbnNumber) == Number(e.target.findBook.value))) {
		return;
	}

	booksList = booksList.filter((val) => {
		if (
			val.bookTitle === e.target.findBook.value ||
			val.bookAuthor === e.target.findBook.value ||
			val.isbnNumber === e.target.findBook.value
		)
			return val;
	});

	localStorage.setItem("books", JSON.stringify(booksList));
});

document.addEventListener("DOMContentLoaded", function () {
	UI.displayBooks();
});
