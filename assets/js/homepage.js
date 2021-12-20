var apiKey = "AIzaSyAnfcU8J4T1O6l-q3o2pGotNokYO1BQCMw";
var tbrBtnEl = document.querySelector("#readLater");

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
    recommendedBook(search);
    renderSearch();

    document.getElementById("search").value = "";
  }
}

function bookSearched(search) {
  var getBook = document.getElementById("book-div");
  getBook.className = "has-text-centered is-size-3";
  $('#book').empty();

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

      //Book Description (try to show synopsis only)
      var description = document.createElement("p");
      description.className = "card-text is-size-6";
      description.textContent = data.items[0].volumeInfo.description;
      // console.log(data.items[0].volumeInfo.description);

      var saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.className = "readLater";
      

      

      card.appendChild(bookTitle);
      card.appendChild(bookAuthor);
      card.appendChild(bookCover);
      card.appendChild(description);
      card.appendChild(saveButton);
      cardContainer.appendChild(card);
      bookEl.appendChild(cardContainer);

      $(document).on("click", ".readLater", function() {
        console.log("this");
        var count = $("#count");
        localStorage.setItem('container',JSON.stringify(data.items[0]));
        $(count).html(function(i, val) { return +val+1 });  
        savefav();
      });
    });
  // console.log(api);
  
}

// Function for recommended books

function recommendedBook(search) {
 var similarBookEl = document.getElementById("random-div");
 similarBookEl.className = "has-text-centered is-size-3";
  $('#random').empty();
   

   var recApi = `https://www.googleapis.com/books/v1/volumes?q=${search}&intitle`;

   fetch(recApi)
     .then(response => response.json())
     .then((data) => {
   var suggestionEl = document.getElementById("random");
       console.log(data);

// for loop to show max 5 books
  for (let i = 1; i <= 5; i++) {
  
      // Card Container
      var recbookEl = document.getElementById("random");
      recbookEl.className = "";

      // Book Title
      var recbookTitle = document.createElement("h3");
      recbookTitle.className = "card-header-title is-size-3";
      recbookTitle.textContent = data.items[i].volumeInfo.title;
      // console.log(data.items[0].volumeInfo.title);

      var reccardContainer = document.createElement("div");
      reccardContainer.className = "card";

      var reccard = document.createElement("div");
      reccard.className = "card-content";

      // Book Author
      var recbookAuthor = document.createElement("h4");
      recbookAuthor.className = "card-header-title is-size-4";
      recbookAuthor.textContent = data.items[i].volumeInfo.authors;

      // Book Cover
      var recbookCover = document.createElement("img");
      recbookCover.className = "card-image m-3 p-2";
      recbookCover.setAttribute('src', data.items[i].volumeInfo.imageLinks.thumbnail);
      // console.log(data.items[0].volumeInfo.imageLinks.thumbnail);

      //Book Description (try to show synopsis only)
      var recdescription = document.createElement("p");
      recdescription.className = "card-text is-size-6";
      recdescription.textContent = data.items[i].volumeInfo.description;
      // console.log(data.items[0].volumeInfo.description);

      reccard.appendChild(recbookTitle);
      reccard.appendChild(recbookAuthor);
      reccard.appendChild(recbookCover);
      reccard.appendChild(recdescription);
      reccardContainer.appendChild(reccard);
      recbookEl.appendChild(reccardContainer);
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
  localStorage.removeItem("history");
  location.reload();
});


//create function to save books





