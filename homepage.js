var apiKey = "AIzaSyAnfcU8J4T1O6l-q3o2pGotNokYO1BQCMw";

var searchHistory;
if(JSON.parse(localStorage.getItem("history")) != null)
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

    var api = "https://www.googleapis.com/books/v1/volumes?q=" + search + "+intitle";

    fetch(api)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            var bookEl = document.getElementById("book");
            
            var cardTitle = document.createElement("h3");
           
            cardTitle.className = "card-title";
            cardTitle.textContent = data.items[0].volumeInfo.title;
            console.log(data.items[0].volumeInfo.title);

            var bookImage = document.createElement("img");
            //bookImage.className = "card";
            bookImage.setAttribute('src',data.items[0].volumeInfo.imageLinks.thumbnail);
            console.log(data.items[0].volumeInfo.imageLinks.thumbnail);
            //createing a link to the Novel decsription next
            var disc = document.createTextNode(data.items[0].volumeInfo.description);
            console.log(data.items[0].volumeInfo.description);


            var card = document.createElement("div");
            card.className = "card-body";

            // synopsis
            var synopsis = document.createElement("p");
            synopsis.className = "card-text";
            synopsis.textContent = "Synopsis:" + data.description;

            
        
            bookEl.appendChild(cardTitle);
            bookEl.appendChild(bookImage);
            
            console.log(bookImage);
            bookEl.appendChild(disc);
            });
    console.log(api);
}

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