window.onload = function() {

    var name=localStorage.getItem("container");

    //document.getElementById("to-read").innerHTML = name;
    $(count).html(function(i, val) { return +val+1 }); 
   
    savefav();

    $('.btn').on('click',function(){
        console.log('i was clicked'); 
        $(place).toggle();
        });
    // This will display the card info again 
        $('#listbtn').on('click',function(){ 
    
        });
};

function savefav(){
    var place=$('#to-read');
    var list =JSON.parse(localStorage.getItem('container'));
    var name=list.volumeInfo.title;
    var img=list.volumeInfo.imageLinks.thumbnail;
    place.append('<button class="dropdown-item" id="listbtn"><img src='+img+' width="40" height="40"> '+name+'</button>');
}

