window.onload = function() {

    var name=localStorage.getItem("history");

    document.getElementById("to-read").innerHTML = name;

};
