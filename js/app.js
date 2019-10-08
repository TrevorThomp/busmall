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
var numberOfRounds = 25;

// Constructor Function
var Product = function(name, imgUrl) {
  this.name = name;
  this.imgURL = imgUrl;
  this.timesShown = 0;
  this.clicks = 0;
  Product.allImages.push(this);
};
Product.allImages= [];

// Prototype array to hold clicked items
Product.prototype.imagesConsidered = [];

// Renders random images to DOM
var renderNewImages = function(leftIndex, rightIndex, middleIndex){
  leftImageTag.src = Product.allImages[leftIndex].imgURL;
  rightImageTag.src = Product.allImages[rightIndex].imgURL;
  middleImageTag.src = Product.allImages[middleIndex].imgURL;
};

// Generate 3 random images that can't be the same
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

// Event Listener tracking clicks and displaying new images upon click
var handleClickOnImg = function(event){

  if(totalClicks < numberOfRounds) {
    var clickedImage = event.target;
    var id = clickedImage.id;

    if(id === 'left_image' || id === 'right_image' || id === 'middle_image'){

      if (id === 'left_image'){
        leftImgOnThePage.clicks++;
        Product.prototype.imagesConsidered.push(leftImgOnThePage);
      }
      if (id === 'middle_image') {
        middleImgOnThePage.clicks++;
        Product.prototype.imagesConsidered.push(leftImgOnThePage);
      }

      if (id === 'right_image'){
        rightImgOnThePage.clicks++;
        Product.prototype.imagesConsidered.push(leftImgOnThePage);
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
    displayResults();
    console.log('you have been through 25 rounds of images, thanks!');
  }
};

imageSectionTag.addEventListener('click', handleClickOnImg);

// Images to be displayed
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

// Generates results to body
function displayResults() {
  var main = document.getElementById('results');
  var div = document.createElement('div');
  var h2 = document.createElement('h2');
  h2.textContent = 'Results';
  var ul = document.createElement('ul');
  for (var i = 0; i < Product.allImages.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${Product.allImages[i].name} has ${Product.allImages[i].clicks} votes and was shown ${Product.allImages[i].timesShown} times.`;
    ul.appendChild(li);
  }
  div.appendChild(h2);
  div.appendChild(ul);
  main.appendChild(div);
}

// STRETCH - Random generated amount of img tags
var numberOfImages = Math.floor(Math.random() * 5) + 1;

function appendImages() {
  var randomIndex = Math.floor(Math.random() * 20) + 1;
  for (var i = 0; i < numberOfImages; i++) {
    var randomImages = Product.allImages[randomIndex].imgURL;
    var stretch = document.getElementById('stretch');
    var img = document.createElement('img');
    img.setAttribute('src', randomImages);
    stretch.appendChild(img);
  }}


