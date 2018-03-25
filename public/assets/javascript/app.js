//Make sure there are no headlines on page load
$(".headlineList").empty();

//Grab scrape method and then post information from db on click of button
$("#scrapeNew").on("click", function () {
    $.ajax("/scrape", {
        type: "GET"
    }).then(function () {
        $.getJSON("/headlines", function (data) {
            for (var i = 0; i < data.length; i++) {
                $(".headlineList").append(
                    //data[i].link comes up as undefined and does not currently go to the desired page on headline click
                    "<div class='headline'><h4 class='headlineTitle uk-align-center'><a href=" + data[i].link + " target='_blank' class='linkText'>" + data[i].headline + "</a><button data-id='" + data[i]._id + "' class='uk-button uk-button uk-align-right saveButton'><span class='saveButtonText'>Save Article</span></button></h4></div><div class='description'><p class='descriptionParagraph uk-align-center'>" + data[i].teaser + "</p></div>");
                console.log("The link is: " + data[i].link);
            }
        });
    });
});

//grab specific article id
$(document).on("click", ".saveButton", function () {
    var theId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/headlines/" + theId
    }).then(function (data) {
        console.log("THE ID IS: " + theId);
        //grab all headlines and match id from api to grabbed id to find the right data
        $.getJSON("/headlines", function (data) {
            for (var i = 0; i < data.length; i++) {
                //if id matches id from headlines, save all that data into a variable
                if (data[i]._id === theId) {
                    var matchingId = data[i];
                    console.log(matchingId);
                    //theoretically post to a saved api
                    $.ajax({
                        method: "POST",
                        url: "/saved",
                    }).then(function (data) {
                        console.log("HEADLINE: " + matchingId.headline);
                        //display articles that were saved on the saved articles page
                        //Would look similar to home page, but with additional buttons of comment on article and delete article
                        //if user clicks on comment on article, a module would pop up with a textarea so the user could add comments to said article and save them
                        //the comments/notes would be saved in an associated collection so that it would be connected to the id of the specific article.
                        //if the user clicks "delete article", the article would be removed from the page and the saved collection
                    });
                }
            }
        })
    });
});

//