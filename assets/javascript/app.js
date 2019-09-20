//my apiKey
var apiKey = "hbuLCrXiCc4bb7xSVC1SQFONfoCfWBwj"

var giffButtons = ["Obama", "George W Bush", "Cat", "Dog", "Goofy", "Donald Duck", "Aladin"]; 

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
$("#form-id").submit(function(event){
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
        giffDiv.attr("src", results[i].images.fixed_height_still.url); // if you add _still will be a still image 
        giffDiv.attr("data-still", results[i].images.fixed_height_still.url); 
        giffDiv.attr("data-animated", results[i].images.fixed_height.url); 
        giffDiv.attr("data-state", "still"); 
        giffDiv.addClass("gif");
        
        // selectionDiv.attr("src", results[i].images.fixed_still) // trial for still/animate
        selectionDiv.append(giffDiv);
        selectionDiv.append(p);
        
        $("#display").prepend(selectionDiv);
        

     }

   });
});
    
    // code to animate/stop the giffs 
    
   $("#display").on("click", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      })