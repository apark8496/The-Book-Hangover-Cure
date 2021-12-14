var apiKey = "AIzaSyAnfcU8J4T1O6l-q3o2pGotNokYO1BQCMw";

var searchHistory;
if (JSON.parse(localStorage.getItem("history")) != null)
  searchHistory = JSON.parse(localStorage.getItem("history"));
else
  searchHistory = [];

var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", handleSearchClick);

searchList();


function handleSearchClick() {
  var search = document.getElementById("search").value;
  if (document.getElementById("search").value !== "") {

    bookSearched(search);

    saveSearch(search);
    renderSearch();

    document.getElementById("search").value = "";
  }
}

function bookSearched(search) {
  var getBook = document.getElementById("book-div");
  getBook.className = "has-text-centered is-size-3";

  var api = `https://www.googleapis.com/books/v1/volumes?q=${search}&intitle`;

  fetch(api)
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      // Card Container
      var bookEl = document.getElementById("book");
      bookEl.className = "";

      // Book Title
      var bookTitle = document.createElement("h3");
      bookTitle.className = "card-header-title is-size-3";
      bookTitle.textContent = data.items[0].volumeInfo.title;
      // console.log(data.items[0].volumeInfo.title);

      var cardContainer = document.createElement("div");
      cardContainer.className = "card";

      var card = document.createElement("div");
      card.className = "card-content";

      // Book Author
      var bookAuthor = document.createElement("h4");
      bookAuthor.className = "card-header-title is-size-4";
      bookAuthor.textContent = data.items[0].volumeInfo.authors;

      // Book Cover
      var bookCover = document.createElement("img");
      bookCover.className = "card-image m-3 p-2";
      bookCover.setAttribute('src', data.items[0].volumeInfo.imageLinks.thumbnail);
      // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

      //Book Description (try to show synopsis only)
      var description = document.createElement("p");
      description.className = "card-text is-size-6";
      description.textContent = data.items[0].volumeInfo.description;
      // console.log(data.items[0].volumeInfo.description);

      card.appendChild(bookTitle);
      card.appendChild(bookAuthor);
      card.appendChild(bookCover);
      card.appendChild(description);
      cardContainer.appendChild(card);
      bookEl.appendChild(cardContainer);
    });
  // console.log(api);
}

// Function for recommended books

// function recommendedBook(search) {
// var similarBookEl = document.getElementById("random-div");
// similarBookEl.className = "has-text-centered is-size-3";

//   var randomBook = document.getElementById("random");
//   randomBook.innerHTML = "";

//   // var api = "";

//   fetch(api)
//     .then(response => response.json())
//     .then((data) => {
  // var suggestionEl = document.getElementById("random");
//       console.log(data);

// for loop to show max 5 books
// for var(i=0; i<);

// Card Container

// // Book Title
// var bookTitle = document.createElement("h3");
// bookTitle.className = "card-header-title is-size-3";
// bookTitle.textContent = data.items[0].volumeInfo.title;
// // console.log(data.items[0].volumeInfo.title);

// var cardContainer = document.createElement("div");
// cardContainer.className = "card";

// var card = document.createElement("div");
// card.className = "card-content";

// // Book Author
// var bookAuthor = document.createElement("h4");
// bookAuthor.className = "card-header-title is-size-4";
// bookAuthor.textContent = data.items[0].volumeInfo.authors;

// // Book Cover
// var bookCover = document.createElement("img");
// bookCover.className = "card-image m-3 p-2";
// bookCover.setAttribute('src', data.items[0].volumeInfo.imageLinks.thumbnail);
// // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

// //Book Description (try to show synopsis only)
// var description = document.createElement("p");
// description.className = "card-text is-size-6";
// description.textContent = data.items[0].volumeInfo.description;
// // console.log(data.items[0].volumeInfo.description);

// card.appendChild(bookTitle);
// card.appendChild(bookAuthor);
// card.appendChild(bookCover);
// card.appendChild(description);
// cardContainer.appendChild(card);
// bookEl.appendChild(cardContainer);
// });
// // console.log(api);
// }

// make buttons to add books to tbr
// save tbr to local storage --> page for tbr js

function saveSearch(search) {
  if (!searchHistory.includes(search)) {
    searchHistory.push(search);
    localStorage.setItem("history", JSON.stringify(searchHistory));
  }
}

function renderSearch() {
  while (document.getElementById("history").firstChild) {
    document.getElementById("history").removeChild(document.getElementById("history").firstChild);
  }
  searchList();
}

function searchList() {
  searchHistory.forEach(function (search) {
    var historyItem = document.createElement("li");
    historyItem.className = "list-group-item";
    historyItem.textContent = search;

    historyItem.addEventListener("click", function (event) {
      bookSearched(event.target.textContent);
    });
    document.getElementById("history").appendChild(historyItem);
  });
}

// Make a button to clear Search History