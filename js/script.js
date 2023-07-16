"use strict";

class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
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
		const books = [
			{
				title: "book 1",
				author: "author 1",
				isbn: 123,
			},
			{
				title: "book 2",
				author: "author 2",
				isbn: 456,
			},
			{
				title: "book 3",
				author: "author 3",
				isbn: 789,
			},
		]

		books.forEach((book) => {
			UI.addBook(book)
		})
	}

	static addBook(book) {
		const booksContainer = document.getElementById("booksContainer");

		const newBookDiv = document.createElement("div");
		const newBookFrag = new DocumentFragment();
		const newBookXButton = document.createElement("button");

		newBookDiv.className = "book";
		newBookXButton.textContent = "X";
		
		for (let i in book) {
			const newBookP = document.createElement("p");
			newBookP.textContent = book[i];
			newBookFrag.append(newBookP);
		}

		newBookFrag.appendChild(newBookXButton);
		newBookDiv.appendChild(newBookFrag);
		booksContainer.appendChild(newBookDiv);
	}
}

UI.displayBooks()


