// 

var topics = ["kitten", "puppy", "space", "video games", "keanu reeves"];

// Create buttons
function buttonLoop() {
    $("#buttonList").empty();
    for(let i=0; i<topics.length; i++){
        var newTerm = $(`<button class="btn-secondary">`);
        newTerm.text(topics[i]);
        $("#buttonList").append(newTerm);
    }
}

// Function from hitting the "Add Term" button
function addTerm() {
    var term = $("#searchInput").val().trim();
    var isDuplicate = topics.includes(term);

    // Check if added term is not blank or a duplicate
    if(term !== "" && !isDuplicate){
        topics.push(term);
        buttonLoop();
        console.log(`Added ${term} to the list!`);
    }
    else{
        console.log(`ERROR: Added term is blank, duplicated or contains illegal characters!`);
    }
}

// Function from hitting the term buttons
function addResult() {
    var term = $(this).text();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=10";;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for(let i=0; i<10; i++){
            var newGif = $(`<div class="gifChunk">`);
            var image = $(`<img src="${response.data[i].images.fixed_height.url}">`);
            var rated = $(`<p>`).text(`Rated: ${response.data[i].rating.toUpperCase()}`);
            newGif.append(image);
            newGif.append(rated);
            $("#resultList").prepend(newGif);
        }
        console.log(response);
    });
}

$(document).ready(function(){ buttonLoop(); });
$(document).on("click", ".btn-primary", addTerm);
$(document).on("click", ".btn-secondary", addResult);