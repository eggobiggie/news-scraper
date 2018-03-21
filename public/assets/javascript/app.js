$.getJSON("/headlines", function(data) {
    for (var i = 0; i < data.length; i++) {
        $(".headlineList").append(
            "<div class='headline'><h4 class='headlineTitle uk-align-center'><a href=" + data[i].link + " target='_blank' class='linkText'>" + data[i].headline + "</a><button class='uk-button uk-button uk-align-right saveButton'><span class='saveButtonText'>Save Article</span></button></h4></div><div class='description'><p class='descriptionParagraph uk-align-center'>" + data[i].teaser + "</p></div>");
            console.log("The link is: " + data[i].link);
    }
});

