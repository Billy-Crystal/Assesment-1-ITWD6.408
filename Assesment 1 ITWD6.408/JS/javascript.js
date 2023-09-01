function loadRSS() {
    //Use CORS API website as proxy
    let proxy = "https://cors-anywhere.herokuapp.com/";

    //Declare the URL where we fetch RSS file
    let url = "https://www.nasa.gov/rss/dyn/educationnews.rss";
    //NASA RSS: https://www.nasa.gov/content/nasa-rss-feeds
    //     NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss
    //CNN RSS: https://edition.cnn.com/services/rss/
    //    CNN RSS top stories: http://rss.cnn.com/rss/edition.rss
    //BBC RSS: http://feeds.bbci.co.uk/news/rss.xml

    //Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", proxy + url, true);
    xhttp.send();

    //Process RSS file when it has been loaded successfully
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Load XML file as "XML" format and parse/process it by calling function parseRSS()
            let rss = this.responseXML;
            parseRSS(rss);
        }
    };
}

//Data: assume we have a list of top 5 movies
let topMovies = [
    {
        id: 0,
        title: "The Shawshank Redemption",
        year: 1994,
        image_url: "Images/movie0.jpg",
    },
    {
        id: 1,
        title: "The Godfather ",
        year: 1972,
        image_url: "Images/movie1.jpg",
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        image_url: "Images/movie2.jpg",
    },
    {
        id: 3,
        title: "12 Angry Men",
        year: 1957,
        image_url: "Images/movie3.jpg",
    },
    {
        id: 4,
        title: " Schindler's List",
        year: 1993,
        image_url: "Images/movie4.jpg",
    },
];

//Slideshow: Manual
let slideIndex = 0; //Initial slide = 0
function nextSlide() {
    //Change the slide_index
    if (slideIndex < topMovies.length - 1) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    //Update the image title and source for the img
    document.getElementById("manual-slide-title").innerHTML =
        topMovies[slideIndex].title;
    document.getElementById("manual-slide-image").src =
        topMovies[slideIndex].image_url;
}

function previousSlide() {
    //Change the slide_index
    if (slideIndex > 0) {
        slideIndex--;
    } else {
        slideIndex = topMovies.length - 1;
    }
    //Change the image source for the img
    document.getElementById("manual-slide-title").innerHTML =
        topMovies[slideIndex].title;
    document.getElementById("manual-slide-image").src =
        topMovies[slideIndex].image_url;
}

//Slideshow: Automatic
let autoSlideIndex = 0; //Initial slide = 0
function autoSlideShow() {
    //Change the slide_index
    if (autoSlideIndex < topMovies.length - 1) {
        autoSlideIndex++;
    } else {
        autoSlideIndex = 0;
    }
    //Change the image source for the img
    document.getElementById("auto-slide-title").innerHTML =
        topMovies[autoSlideIndex].title;
    document.getElementById("auto-slide-image").src =
        topMovies[autoSlideIndex].image_url;
    //Wait 2 seconds
    setTimeout(autoSlideShow, 2000); //Auto change slide every 2 seconds
}
//execute the function when loading the webpage
autoSlideShow(); // Call to run auto slideshow

function parseRSS(rss) {
    //Load all "items" inside the RSS document, each item is a news
    let items = rss.getElementsByTagName("item");
    let rssContent = ""; //varible "rssContent" is used to store rss content in HTML format

    //Loop through all "items" (news) and extract child node content: "title", "link", "description" and "pubdate"
    for (let i = 0; i < items.length; i++) {
        let nodes = items[i].children;
        //Extract "title", "link", "description" and "pubdate" of each "node"
        let title, pubdate, description, link;
        for (let j = 0; j < nodes.length; j++) {
            if (nodes[j].tagName == "title") {
                title = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "link") {
                link = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "description") {
                description = nodes[j].childNodes[0].nodeValue;
            } else if (nodes[j].tagName == "pubDate") {
                pubdate = nodes[j].childNodes[0].nodeValue;
            }
        }

        //Format the extracted information above in HTML format and append it to the "rssContent" variable
        //each item (news) is wrapped inside a <div>
        rssContent += `<div class="col-12 col-md-6">
                          <div style="background-color: lightgray; margin: 1em; height: 95%">
                              <h3>${title}</h3>
                              <p style="font-style: italic;">${pubdate}</p>
                              <p>${description}</p>
                              <p><a href="${link}">Read more</a></p>
                          </div>	
                      </div>`;
    }
    //Display the "rssContent" on the webpage
    document.getElementById("rssFeed").innerHTML = rssContent;
}
//DROPDOWN MENU TO SELECT MOVIE
//Populate the select "options" with all the movies in the array when the page is loaded
function loadMyMovies() {
    let movieSelect = document.getElementById("my-movieList");
    for (var i = 0; i < topMovies.length; i++) {
        //Create a new child HTML node/element as "<option>" (as a child node)
        let node = document.createElement("option");
        //Assign option "text content" and "value" to this new node
        node.value = topMovies[i].id.toString();
        node.textContent = topMovies[i].title.toString();
        //Append the above HTML node (option) to the parent node "movieList"
        movieSelect.appendChild(node);
    }
    //Set the first movie as selected option in drop-down list
    movieSelect.selectedIndex = "0";
}
//call to execute this function when loading the webpage
loadMyMovies();

//When user select an option in the dropdown menu (select), display that option
function displayMyMovie() {
    //Get the selected movie "option value"
    let selectedMovieIndex = document.getElementById("my-movieList").value;
    document.getElementById("my-movieTitle").innerHTML =
        topMovies[selectedMovieIndex].title;
    document.getElementById("my-movieYear").innerHTML =
        topMovies[selectedMovieIndex].year;
    document.getElementById("my-movieImageURL").src =
        topMovies[selectedMovieIndex].image_url;
}

//WEB PAGE CUSTOMIZATION
//Read More/less function
document.getElementById("detailed").style.display = "none"; //Hide content

function expandText() {
    //Find the expandBtn element on HTML file
    let expandBtn = document.getElementById("expandBtn");

    //Check whether to expand or collapse text based on the text display on the button
    if (expandBtn.value.toLowerCase() == "more") {
        document.getElementById("detailed").style.display = "block"; //Show content
        expandBtn.value = "LESS";
        expandBtn.textContent = "LESS";
    } else {
        document.getElementById("detailed").style.display = "none"; //Hide content
        expandBtn.value = "MORE";
        expandBtn.textContent = "MORE";
    }
}

//Change text size
//text size set current state
function setFontSize() {
    // Get the selected value
    let selectedTextSize = document.getElementById("text-size").value;

    // Set the font size for the elements
    document.getElementById("abstract").style.fontSize = selectedTextSize;
    document.getElementById("detailed").style.fontSize = selectedTextSize;
}

// Call setFontSize to initially set the font size
setFontSize();
function customizeText() {
    //get the selected value
    let selectedTextSize = document.getElementById("text-size").value;
    //chance the text style accordingly
    document.getElementById("abstract").style.fontSize = selectedTextSize;
    document.getElementById("detailed").style.fontSize = selectedTextSize;
}

//Change background color
function changeColor() {
    //get the selected color
    let selectedBGColor = document.getElementById("colorOption").value;
    //chance the color accordinly
    document.getElementById("demo-2").style.backgroundColor = selectedBGColor;
}
