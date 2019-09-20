//my apiKey
var apiKey = "hbuLCrXiCc4bb7xSVC1SQFONfoCfWBwj"

var giffButtons = ["obama", "bush", "cat", "dog", "crash", "slip", "drunk", "stupid"]; 

// this function renders initial buttons
function renderButtons() {

    $("#buttons-view").empty()

    // Looping through initial array
    for (i = 0; i < giffButtons.length; i++){
    var button = $("<button>"); 
        button.addClass("giphy");
        button.attr("data-giphy", giffButtons[i]);
        button.text(giffButtons[i]);
        $("#buttons-view").append(button)
        
    }
}

renderButtons();

//this function will add new giffs to an array
$("#form-id").on("click", function(event){
    event.preventDefault();   // stops the page from refreshing
    // debugger;       
    var newGiff = $("#add-giff").val().trim(); // grabs the value from search bar
    console.log(newGiff);
    giffButtons.push(newGiff); // adds new item to an array
    
    renderButtons(); //calls the function responsible to add the button to the screen
    $("#add-giff").val("");
    // console.log(this)
});

$("#buttons-view").on("click", ".giphy", function() {
    // debugger;
    // getting the button data-value
    var selection = $(this).attr("data-giphy");
    console.log(selection)  
    
    //constracting URL 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ selection + "&api_key=" + apiKey + "&limit=10";
    
    // Performing an Ajax call 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(queryURL);
        console.log(response);

        // saving AJAX results in the var
     var results = response.data
     
     for (var i=0; i < results.length; i++) {
        
        var selectionDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating)
        var giffDiv = $("<img>");
        giffDiv.attr("src", results[i].images.fixed_height.url); // if you add _still will be a still image 
        // giffDiv.attr("data-value", results[i]) // trial for still/animate
        giffDiv.attr("data-animated", results[i].images.fixed_height.url); 
        giffDiv.attr("data-still", results[i].images.fixed_height_still.url); 
        giffDiv.attr("data-state", "still"); 
        
        selectionDiv.attr("src", results[i].images.fixed_still) // trial for still/animate
        selectionDiv.append(p);
        selectionDiv.append(giffDiv);
        
        $("#display").prepend(selectionDiv);

     }

   });
});
    
    // code to animate the giffs 
    
   $(".gif").on("click", function() {
//     alert("I was clicked")    
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // // Then, set the image's data-state to animate
        // // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      })