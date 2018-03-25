# Mongo News Scraper

![Mongo Scraper Gif](public/assets/images/mongoscraper.gif)

* In this app, the opening page has a top navbar with "Home", "Saved Articles", and a button that reads "Scrape New Articles". 

* If the user clicks on "Scrape New Articles", cheerio is used to grab article headlines, teasers, and urls from the NPR main page. 

* The information is saved into a database using MongoDB

* The information is pulled from the database and displayed below the newspaper image with a headline and teaser and a save button.

**Future Plans**: 

* When the user clicks "Save Article", the article information will be saved and can be found on a "Saved Articles" page. 

* On this page, the information from the article will display with two buttons, "Comment on Article" and "Delete Article"

* If the user clicks on "Comment", a module will appear with a textarea in which the user can add notes/comments and save them to the associated headline.

* If the user clicks "Delete", the article will be deleted from the Saved Articles page 

