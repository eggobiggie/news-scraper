
request("https://www.npr.org/", function (error, response, html) {
    var $ = cheerio.load(html);
    var results = [];
    $("div.story-text").each(function(i, element) {
        var title = $(element).find("a").find("h1").text();
        var teaser = $(element).find("a").find("p").text();
        results.push({
            title: title,
            teaser: teaser
        });
    });
    console.log(results);
});
