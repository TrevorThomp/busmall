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

var images = [
  ['bag', './img/bag.jpg'],
  ['banana', './img/banana.jpg'],
  ['bathroom', './img/bathroom.jpg'],
  ['boots', './img/boots.jpg'],
  ['breakfast', './img/breakfast.jpg'],
  ['bubblegum', './img/bubblegum.jpg'],
  ['chair', './img/chair.jpg'],
  ['cthulhu', './img/cthulhu.jpg'],
  ['dog-duck', './img/dog-duck.jpg'],
  ['dragon', './img/dragon.jpg'],
  ['pen', './img/pen.jpg'],
  ['pet-sweep', './img/pet-sweep.jpg'],
  ['scissors', './img/scissors.jpg'],
  ['shark', './img/shark.jpg'],
  ['sweep', './img/sweep.png'],
  ['tauntaun', './img/tauntaun.jpg'],
  ['unicorn', './img/unicorn.jpg'],
  ['usb', './img/usb.gif'],
  ['water-can', './img/water-can.jpg'],
  ['wine-glass', './img/wine-glass.jpg']
];

// Loops through array of images creating functions
var instantiateImages = function() {
  for (var i = 0; i < images.length; i++) {
    var name = images[i][0];
    var src = images[i][1];
    var data = new Product(name, src);
  }
};

// Constructor Function
var Product = function(name, imgUrl) {
  this.name = name;
  this.imgURL = imgUrl;
  this.timesShown = 0;
  this.clicks = 0;
  this.previouslyShown = false;
  Product.allImages.push(this);
};

Product.allImages = [];

console.log(Product.allImages);

// Prototype array to hold clicked items
Product.prototype.clicked = function() {
  this.clicks++;
};

Product.prototype.amountShown = function() {
  this.timesShown++;
};

// Renders random images to DOM
var renderNewImages = function(leftIndex, rightIndex, middleIndex) {
  leftImageTag.src = Product.allImages[leftIndex].imgURL;
  rightImageTag.src = Product.allImages[rightIndex].imgURL;
  middleImageTag.src = Product.allImages[middleIndex].imgURL;
};

// Generate 3 random images that can't be the same or from previous selection
var pickNewImages = function() {
  var leftIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
  var middleIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
  var rightIndex = Math.ceil(Math.random() * Product.allImages.length - 1);

  while(Product.allImages[leftIndex].previouslyShown) {
    leftIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
  }

  while(rightIndex === leftIndex || Product.allImages[rightIndex].previouslyShown) {
    rightIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
  }

  while(leftIndex === middleIndex || rightIndex === middleIndex || Product.allImages[middleIndex].previouslyShown) {
    middleIndex = Math.ceil(Math.random() * Product.allImages.length - 1);
  }

  for (var i = 0; i < Product.allImages.length; i++) {
    Product.allImages[i].previouslyShown = false;
  }

  leftImgOnThePage = Product.allImages[leftIndex];
  rightImgOnThePage = Product.allImages[rightIndex];
  middleImgOnThePage = Product.allImages[middleIndex];

  Product.allImages[leftIndex].previouslyShown = true;
  Product.allImages[rightIndex].previouslyShown = true;
  Product.allImages[middleIndex].previouslyShown = true;

  renderNewImages(leftIndex, rightIndex, middleIndex);
};

// Event Listener tracking clicks and displaying new images upon click
var handleClickOnImg = function(event) {
  if (totalClicks < numberOfRounds) {
    var clickedImage = event.target;
    var id = clickedImage.id;

    if (id === 'left_image' || id === 'right_image' || id === 'middle_image') {
      if (id === 'left_image') {
        leftImgOnThePage.clicked();
      }
      if (id === 'middle_image') {
        middleImgOnThePage.clicked();
      }

      if (id === 'right_image') {
        rightImgOnThePage.clicked();
      }
      leftImgOnThePage.amountShown();
      rightImgOnThePage.amountShown();
      middleImgOnThePage.amountShown();

      pickNewImages();
    }
  }
  totalClicks++;
  if (totalClicks === numberOfRounds) {
    imageSectionTag.removeEventListener('click', handleClickOnImg);
    alert('You have seen 25 rounds of images! Thanks for participating.');
    displayResults();
    displayChart();
  }
};

imageSectionTag.addEventListener('click', handleClickOnImg);

// Invokes function to pull images from array of images
instantiateImages();
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
  }
}

var genLabels = function(images) {
  var labelsArr = [];
  for (var i = 0; i < images.length; i++) {
    labelsArr.push(images[i].name);
  }
  return labelsArr;
};

var genData = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].clicks);
  }
  return dataArr;
};

var genShown = function(images) {
  var shownData = [];
  for (var i = 0; i < images.length; i++) {
    shownData.push(images[i].timesShown);
  }
  return shownData;
};

// Chart integration
function displayChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: genLabels(Product.allImages),
      datasets: [
        {
          label: '# of Clicks',
          data: genData(Product.allImages),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        },
        {
          label: '# of Times Shown',
          data: genShown(Product.allImages),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}
