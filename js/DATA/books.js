let BOOKS = [
	{
		bookTitle: "The Republic",
		bookAuthor: "Plato",
		isbnNumber: 1,
	},
	{
		bookTitle: "The Prince",
		bookAuthor: "Niccolo Machiavelli",
		isbnNumber: 2,
	},
	{
		bookTitle: "1984",
		bookAuthor: "George Orwell",
		isbnNumber: 3,
	},
	{
		bookTitle: "The Great Gatsby",
		bookAuthor: "F. Scott Fitzgerald",
		isbnNumber: 4,
	},
	{
		bookTitle: "The Lord of the Rings",
		bookAuthor: "J.R.R. Tolkien",
		isbnNumber: 5,
	},
	{
		bookTitle: "Harry Potter",
		bookAuthor: "J.K. Rowling",
		isbnNumber: 6,
	},
	{
		bookTitle: "A Game of Thrones",
		bookAuthor: "George R. R. Martin",
		isbnNumber: 7,
	},
];

localStorage.setItem("books", JSON.stringify(BOOKS));