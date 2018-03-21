$.getJSON("/headlines", function(data) {
    for (var i = 0; i < data.length; i++) {
        $(".headlineList").append(
            "<div class='headline'><h3 class='headlineTitle uk-align-center'><a href='" + data[i].link + " 'target='_blank'>" + data[i].headline + "</a><button class='uk-button uk-button uk-float-right uk-box-shadow-large saveButton'><span class='saveButtonText'>Save Article</span></button></h3></div><div class='description'><p class='descriptionParagraph uk-align-center'>" + data[i].teaser + "</p></div>");
            console.log(data[i].link);
    }
});

