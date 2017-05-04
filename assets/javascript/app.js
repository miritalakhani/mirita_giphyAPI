      var movies = ["elephant","plant", "kid", "river", "turtle"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+movie+"&api_key=dc6zaTOxFJmzC&limit=10 ";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // To see response
          console.log(response);
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
          // Creating a div to hold the image
          var movieDiv = $("<div>");
          // Storing the rating data
          var p = $("<p>").text("Rating: " + results[i].rating);
          var animalImage = $("<img>");
          animalImage.addClass('pictures');
          animalImage.attr("src", results[i].images.fixed_height.url);

           // adding the attributes to each image
          animalImage.attr( "src", response.data[i].images.fixed_width_still.url);         
          animalImage.attr( "data-still",response.data[i].images.fixed_width_still.url);
          animalImage.attr( "data-animate",response.data[i].images.fixed_width.url);
          animalImage.attr( "data-state", "still" );
          $('.photo').append(animalImage); 
          ////////////////

          // Appending the paragraph and image tag to the animalDiv
          movieDiv.append(p);
          movieDiv.append(animalImage);

          // Prependng the Div to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(movieDiv);
          }

          $("#movies-view").prepend(movieDiv);
          });

      }

      // Function to displaying Giphy data
      function renderButtons() {

        // Deleting the images prior to adding new movies
        $("#buttons-view").empty();
        // Looping through the array
        for (var i = 0; i < movies.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("movie");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
        }
      }

      // This function handles events where a image button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();
        // Adding image from the textbox to our array
        movies.push(movie);
        // Calling renderButtons 
        renderButtons();
      });

      // Adding a click event listener to all elements 
      $(document).on("click", ".movie", displayMovieInfo);

     $(document).on('click',".pictures", function(event){
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log(state);
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

    // Calling the renderButtons function to display the intial buttons
    renderButtons();