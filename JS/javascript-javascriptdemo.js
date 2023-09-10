function openNav() {
    document.getElementById("myNav").style.display =
        "block"; /*Show the curtain menu*/
}

function closeNav() {
    document.getElementById("myNav").style.display =
        "none"; /*Hide the curtain menu*/
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

//------------------------------------------------------------------------------------------------------
//ADD NEW MOVIE TO THE LIST
//Add a new movie to the existing list
function AddItemToList() {
    //Get entered item data
    let newItemTitle = document.getElementById("my-movie-title").value;
    let newItemYear = document.getElementById("my-movie-year").value;
    let newItemUrl = document.getElementById("my-movie-image-url").value;
    let newId = topMovies.length;

    //Validate input before adding new item
    if (newItemTitle == "" || newItemYear == "" || newItemUrl == "") {
        alert("ERROR. DATA IS INCOMPLETE!");
    } else {
        //Add a new item
        topMovies.push({
            id: newId,
            title: newItemTitle,
            year: parseInt(newItemYear),
            image_url: newItemUrl,
        });
        //document.write(allAccounts[1].user + "," + allAccounts[1].pass);
        alert("NEW ITEM ADDED SUCCESSFULLY!");

        //Reload the drop-down list
        //Remove all current options
        document.getElementById("my-movieList").options.length = 0;
        //Load updated options
        loadMyMovies();

        //Empty the inputs
        document.getElementById("my-movie-title").value = "";
        document.getElementById("my-movie-year").value = "";
        document.getElementById("my-movie-image-url").value = "";
    }
}

//------------------------------------------------------------------------------------------------------
//ADD NEW COMMENT
//Data: Assume we have a list of existing comments stored in an array "allComments"
let allComments = [
    { name: "Ian", comment: "Recommended, good one" },
    { name: "Aman", comment: "I don't like this movie" },
    { name: "John", comment: "Love it" },
];

//----------
//Load all existing comments and display them on HTML
function loadComments() {
    //Loop through all comments in the array "allComments"
    for (var i = 0; i < allComments.length; i++) {
        let name = allComments[i].name;
        let comment = allComments[i].comment;
        //
        //Create a new HTML node/element <P> to display this comment
        let node = document.createElement("P");
        let textnode = document.createTextNode(name + ": " + comment);
        node.appendChild(textnode); //Append the content (created TextNode) to the HTML Node (child)
        let parrent_node = document.getElementById("comment-list"); //Get the id of parent node "comment-list"
        parrent_node.appendChild(node); //Append the above child HTML node to the parent node
    }
}
//Call to run this loadComments function when the webpage is loaded.
loadComments();

//----------
//Add a new comment
function addComment() {
    //Get entered value/data by user
    let enteredCommentName = document.getElementById("comment_name").value;
    let enteredCommentText = document.getElementById("comment_text").value;

    //Add this new comment to the array
    allComments.push({ name: enteredCommentName, comment: enteredCommentText });
    alert("Thank you for your comment!");

    //Display this new comment on HTML page
    //Create a new child HTML node/element as "<p>" (paragraph) (as a child node)
    let node = document.createElement("P");
    //Create a new TextNode
    let textnode = document.createTextNode(
        enteredCommentName + ": " + enteredCommentText
    );
    //Append the content (created TextNode) to the HTML Node (child)
    node.appendChild(textnode);
    //Get the id of parent node "comment-list"
    let parrent_node = document.getElementById("comment-list");
    //Append the above child HTML node to the parent node
    parrent_node.appendChild(node);

    //Clear comment box
    document.getElementById("comment_name").value = "";
    document.getElementById("comment_text").value = "";
}

// Get elements
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const searchModal = document.getElementById("searchModal");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

// Event listeners
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
searchButton.addEventListener("click", googleSearch);

// Functions
function openModal() {
    searchModal.style.display = "block";
}

function closeModal() {
    searchModal.style.display = "none";
}

function googleSearch() {
    const query = searchInput.value.trim();
    if (query !== "") {
        const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
            query
        )}`;
        window.open(googleSearchUrl, "_blank");
        closeModal();
    }
}
