'use strict';
// As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

// Global Variables
var imageSectionTag = document.getElementById('imageContainer');
var leftImageTag = document.getElementById('left_image');
var middleImageTag = document.getElementById('middle_image');
var rightImageTag = document.getElementById('right_image');
var totalClicks = 0;

var rightImgOnThePage = null;
var leftImgOnThePage = null;
var middleImgOnThePage = null;

// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
var NewImage = function(name, imgUrl) {
  this.name = name;
  this.imgURL = imgUrl;

  NewImage.allImages.push(this);
};

NewImage.allImages = [];

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
var renderNewImages = function(leftIndex, rightIndex, middleIndex){
  leftImageTag.src = NewImage.allImages[leftIndex].imgURL;
  rightImageTag.src = NewImage.allImages[rightIndex].imgURL;
  middleImageTag.src = NewImage.allImages[middleIndex].imgURL;
};

var pickNewImages = function(){
  //pick a new image...
  console.log('pick a new image');

  var leftIndex = Math.ceil(Math.random() * NewImage.allImages.length - 1);

  do {
    var rightIndex = Math.ceil(Math.random() * NewImage.allImages.length - 1);
    var middleIndex = Math.ceil(Math.random() * NewImage.allImages.length - 1);
  } while((rightIndex === leftIndex) || (rightIndex === middleIndex) || (leftIndex === middleIndex));

  leftImgOnThePage = NewImage.allImages[leftIndex];
  rightImgOnThePage = NewImage.allImages[rightIndex];
  middleImgOnThePage = NewImage.allImages[middleIndex];

  renderNewImages(leftIndex, rightIndex, middleIndex);
};


// Attach an event listener to the section of the HTML page where the images are going to be displayed.
var handleClickOnImg = function(event){
  console.log('i am alive');

  if(totalClicks < 10) {
    var clickedImage = event.target;
    var id = clickedImage.id;

    if(id === 'left_image' || id === 'right_image' || id === 'middle_image'){
      //track the images
      //increment th image in the left_image slot's click
      //if image is right, increment right
      if (id === 'left_image'){
        leftImgOnThePage.clicks++;
      }
      if (id === 'middle_image') {
        middleImgOnThePage.clicks++;
      }

      if (id === 'right_image'){
        rightImgOnThePage.clicks++;
      }
      leftImgOnThePage.timesShown++;
      rightImgOnThePage.timesShown++;
      middleImgOnThePage.timesShown++;
  
      pickNewImages();
    }
  }
  totalClicks ++;
  if(totalClicks === 9) {
    imageSectionTag.removeEventListener('click', handleClickOnImg);
    console.log('you have seen 20 images, thanks!');
  }
};

imageSectionTag.addEventListener('click', handleClickOnImg);
// Once the users ‘clicks’ a product, generate three new products for the user to pick from.

// As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
// Add onto your constructor function a property to hold the number of times a product has been clicked.

// After every selection by the viewer, update the newly added property to reflect if it was clicked.

// As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
// By default, the user should be presented with 25 rounds of voting before ending the session.
// Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.
// As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
// Create a prototype property attached to the product object that keeps track of all the products that are currently being considered.

// After voting rounds have been completed, remove the event listeners on the product.

// Display the list of all the products followed by the votes received and number of times seen for each. Example: Banana Slicer had 3 votes

new NewImage('bag', './img/bag.jpg');
new NewImage('banana', './img/banana.jpg');
new NewImage('bathroom', './img/bathroom.jpg');
new NewImage('boots', './img/boots.jpg');
new NewImage('breakfast', './img/breakfast.jpg');
new NewImage('bubblegum', './img/bubblegum.jpg');
new NewImage('chair', './img/chair.jpg');
new NewImage('bag', './img/cthulhu.jpg');
new NewImage('bag', './img/dog-duck.jpg');
new NewImage('bag', './img/dragon.jpg');
new NewImage('bag', './img/pen.jpg');
new NewImage('bag', './img/pet-sweep.jpg');
new NewImage('bag', './img/scissors.jpg');
new NewImage('bag', './img/shark.jpg');
new NewImage('bag', './img/sweep.png');
new NewImage('bag', './img/tauntaun.jpg');
new NewImage('bag', './img/unicorn.jpg');
new NewImage('bag', './img/usb.gif');
new NewImage('bag', './img/water-can.jpg');
new NewImage('bag', './img/wine-glass.jpg');

pickNewImages();
