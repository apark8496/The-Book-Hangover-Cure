
// Load Previous Search History on load
var searchHistory;
if (JSON.parse(localStorage.getItem("history")) != null)
  searchHistory = JSON.parse(localStorage.getItem("history"));
else
  searchHistory = [];

var searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", handleSearchClick);

searchList();

// Search Click Function
function handleSearchClick() {
  var search = document.getElementById("search").value;
  if (document.getElementById("search").value !== "") {

    bookSearched(search);
    recommendedBook(search);

    saveSearch(search);
    renderSearch();

    document.getElementById("search").value = "";
  }
}

// Current Book Search
function bookSearched(search) {
  var getBook = document.getElementById("book-div");
  getBook.className = "has-text-centered is-size-3";

  var bookApi = `https://www.googleapis.com/books/v1/volumes?q=${search}&intitle`;

  fetch(bookApi)
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

      //Book Synopsis
      var description = document.createElement("p");
      description.className = "card-text is-size-6";
      description.textContent = data.items[0].volumeInfo.description;
      // console.log(data.items[0].volumeInfo.description);


      // Add in API for Drink REC
      
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
function recommendedBook(search) {
  var similarBookEl = document.getElementById("random-div");
  similarBookEl.className = "has-text-centered is-size-3";

  var recApi = `https://www.googleapis.com/books/v1/volumes?q=${search}`;

  fetch(recApi)
    .then(response => response.json())
    .then((data) => {
      console.log(data);

      // for loop to show max 5 books
      for (i = 1; i <= 5; i++) {

      // Card Container
      var recBookEl = document.getElementById("random");
      recBookEl.className = "";

      // Book Title
      var recBookTitle = document.createElement("h3");
      recBookTitle.className = "card-header-title is-size-3";
      recBookTitle.textContent = data.items[i].volumeInfo.title;
      // console.log(data.items[0].volumeInfo.title);

      var recCardContainer = document.createElement("div");
      recCardContainer.className = "card";

      var recCard = document.createElement("div");
      recCard.className = "card-content";

      // Book Author
      var recBookAuthor = document.createElement("h4");
      recBookAuthor.className = "card-header-title is-size-4";
      recBookAuthor.textContent = data.items[i].volumeInfo.authors;

      // Book Cover
      var recBookCover = document.createElement("img");
      recBookCover.className = "card-image m-3 p-2";
      recBookCover.setAttribute('src', data.items[i].volumeInfo.imageLinks.thumbnail);
      // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

      // Book Synopsis
      var recDescription = document.createElement("p");
      recDescription.className = "card-text is-size-6";
      recDescription.textContent = data.items[i].volumeInfo.description;
      // console.log(data.items[0].volumeInfo.description);

      recCard.appendChild(recBookTitle);
      recCard.appendChild(recBookAuthor);
      recCard.appendChild(recBookCover);
      recCard.appendChild(recDescription);
      recCardContainer.appendChild(recCard);
      recBookEl.appendChild(recCardContainer);
      }
    });
}


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
      recommendedBook(event.target.textContent);
    });
    document.getElementById("history").appendChild(historyItem);
  });
}

// Make a button to clear Search History
$(".clearBtn").on("click", function(event) {
  event.preventDefault();
  localStorage.clear();
  location.reload();
});