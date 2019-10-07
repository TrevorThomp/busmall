'use strict';

// Global Variables
var imageSectionTag = document.getElementById('imageContainer');
var leftImageTag = document.getElementById('left_image');
var middleImageTag = document.getElementById('middle_image');
var rightImageTag = document.getElementById('right_image');
var totalClicks = 0;
var rightImgOnThePage = null;
var leftImgOnThePage = null;
var middleImgOnThePage = null;
var voted = [];


var Product = function(name, imgUrl) {
  this.name = name;
  this.imgURL = imgUrl;
  this.timesShown = 0;

  Product.allImages.push(this);
};

Product.allImages = [];

console.log(Product.allImages);

Product.prototype.clicks = 0;


// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
var renderNewImages = function(leftIndex, rightIndex, middleIndex){
  leftImageTag.src = Product.allImages[leftIndex].imgURL;
  rightImageTag.src = Product.allImages[rightIndex].imgURL;
  middleImageTag.src = Product.allImages[middleIndex].imgURL;
};

var pickNewImages = function(){
  var leftIndex = Math.ceil(Math.random() * Product.allImages.length - 1);

  do {
    var rightIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
    var middleIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
  } while((rightIndex === leftIndex) || (rightIndex === middleIndex) || (leftIndex === middleIndex));

  leftImgOnThePage = Product.allImages[leftIndex];
  rightImgOnThePage = Product.allImages[rightIndex];
  middleImgOnThePage = Product.allImages[middleIndex];

  renderNewImages(leftIndex, rightIndex, middleIndex);
};

// Number of rounds allowed for user
var numberOfRounds = 25;


// Attach an event listener to the section of the HTML page where the images are going to be displayed.
var handleClickOnImg = function(event){

  if(totalClicks < numberOfRounds) {
    var clickedImage = event.target;
    var id = clickedImage.id;

    if(id === 'left_image' || id === 'right_image' || id === 'middle_image'){

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
  totalClicks++;
  if(totalClicks === numberOfRounds) {
    imageSectionTag.removeEventListener('click', handleClickOnImg);
    console.log('you have been through 25 rounds of images, thanks!');
  }
};

imageSectionTag.addEventListener('click', handleClickOnImg);

// Create a prototype property attached to the product object that keeps track of all the products that are currently being considered.

// Display the list of all the products followed by the votes received and number of times seen for each. Example: Banana Slicer had 3 votes

new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('usb', './img/usb.gif');
new Product('water-can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');

pickNewImages();
