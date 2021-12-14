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
  getBook.className = "";

  var api = `https://www.googleapis.com/books/v1/volumes?q=${search}&intitle`;

  fetch(api)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // Card Container
      var bookEl = document.getElementById("book");
      bookEl.className= "card row";

      // Book Cover
      var bookCover = document.createElement("img");
      bookCover.className = "card";
      bookCover.setAttribute('src', data.items[0].volumeInfo.imageLinks.thumbnail);
      console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

    // Book Title
      var bookTitle = document.createElement("h3");
      bookTitle.className = "card-header-title has-text-centered";
      bookTitle.textContent = data.items[0].volumeInfo.title;
      console.log(data.items[0].volumeInfo.title);

      // Book Author
      var bookAuthor = document.createElement("h5");
      bookAuthor.className = "card-header-title has-text-centered is-size-5";
      bookAuthor.textContent = data.items[0].volumeInfo.authors;


      //Book Description
      var description = document.createElement("p");
      description.className = "card-content is-size-7"
      description.textContent = data.items[0].volumeInfo.description;
      console.log(data.items[0].volumeInfo.description);

      bookEl.appendChild(bookCover);
      bookEl.appendChild(bookTitle);
      bookEl.appendChild(bookAuthor);
      bookEl.appendChild(description);
    });
  console.log(api);
}

// Function for recommended books

// function recommendedBook(search) {
//   var similarBookEl = document.getElementById("random-div");
//   similarBookEl.className = "";

//   // var api = "";

//   fetch(api)
//     .then(response => response.json())
//     .then((data) => {
//       console.log(data)
//       var randomEl = document.getElementById("random");

//     });
// Function for recommended books

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