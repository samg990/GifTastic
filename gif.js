$(document).ready(function() {
  var topics = [
    "kobe bryant",
    "steph curry",
    "shaq",
    "magic johnson",
    "tracy mcgrady",
    "yao ming",
    "lebron james",
    "kevin durant",
    "larry bird",
    "michael jordan",
    "dennis rodman",
  ];

  function renderButtons() {
    $(".buttons").empty();

    for (var i = 0; i < topics.length; i++) {
      var btns = $("<button>");
      btns.addClass("nba");
      btns.attr("data-person", topics[i]);
      btns.text(topics[i]);
      $(".buttons").append(btns);
    }

    $("button").on("click", function() {
      var person = $(this).attr("data-person");
      // console.log("TCL: renderButtons -> person", person)

      $(".gifs").empty();

      var queryURL =
        "https://api.giphy.com/v1/gifs/search?api_key=dLvQpRDDeLvheVdT5O7dOaPTFWUTEcOP&q=" +
        person +
        "&limit=10&offset=0&rating=G&lang=en";

      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
        // console.log("OUTPUT: renderButtons -> response", response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gif = $(".gifs");

          var rate = $("<p>").text("Rating: " + results[i].rating);

          var imgGif = $("<img>");
          imgGif.attr("src", results[i].images.fixed_height_still.url);
          imgGif.attr("date-still", results[i].images.fixed_height_still.url);
          imgGif.attr("date-animate", results[i].images.fixed_height.url);
          imgGif.attr("date-state", "still");
          imgGif.addClass("pageGif");

          gif.append(rate);
          gif.append(imgGif);

          $(".gifs").append(gif);
        }

        $(".pageGif").click(function() {
          var playPause = $(this).attr("date-state");
          console.log(playPause);
          console.log(results);

          if (playPause === "still") {
            $(this).attr("src", $(this).attr("date-animate"));
            $(this).attr("date-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("date-still"));
            $(this).attr("date-state", "still");
          }
        });
      });
    });
  }

  // $(document).on("click", ".nba", displayGif);

  renderButtons();

  $("#submit").on("click", function(event) {
    event.preventDefault();
    var player = $("#btnInput").val();

    topics.push(player);

    renderButtons();
  });
});
