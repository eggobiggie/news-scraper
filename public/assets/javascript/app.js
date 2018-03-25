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
                    $.ajax({
                        method: "POST",
                        url: "/saved",
                    }).then(function (data) {
                        console.log("HEADLINE: " + matchingId.headline);
                        $(".savedHeadlineList").append("<h4>" + matchingId.headline + "</h4>");
                    });
                }
            }
        })
    });
});