"use strict";

const bookSpan = document.getElementById("bookSpan");
const listSpan = document.getElementById("listSpan");

const changeBookColor = setInterval(() => {
	bookSpan.style.color = `
    rgb(${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)}
        )`;
}, 600);

const changelistColor = setInterval(() => {
	listSpan.style.color = `
    rgb(${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)},
        ${Math.round(Math.random() * 255)}
        )`;
}, 600);
