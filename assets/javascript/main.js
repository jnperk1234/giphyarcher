$(document).ready(function(){
    var topics = [];
    function displayArcherChar(){
        var x = $(this).data("search");
        console.log(x);

        var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response){
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++){
                var charDiv = $("<div class = 'col-md-4'>");
                var rating = results [i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var charImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                charImage.attr("src", staticSrc);
                charImage.addClass("archerGiphy");
                charImage.attr("data-state", "still");
                charImage.attr("data-still", staticSrc);
                charImage.attr("data-animate", defaultAnimatedSrc);
                charDiv.append(p);
                charDiv.append(charImage);
                $("#gifArea").prepend(charDiv);
            }
            
        });
    }
        $("#addChar").on("click", function(event){
            event.preventDefault();
            var newChar = $("#archerInput").val().trim();
            topics.push(newChar);
            console.log(topics);
            $("#archerInput").val('');
            displayButtons();
        });

    function displayButtons(){
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++){
            var a = $('<button class = "btn btn-primary">');
            a.attr("id", "char");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }

    displayButtons();
    $(document).on("click", "#char", displayArcherChar);
    $(document).on("click", ".archerGiphy", pausePlayGifs);

    function pausePlayGifs(){
        var state = $(this).attr("data-state");
        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
});