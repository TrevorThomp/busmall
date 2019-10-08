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

// Images array
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

// Constructor Function
var Product = function(name, imgUrl) {
  this.name = name;
  this.imgURL = imgUrl;
  this.timesShown = 0;
  this.clicks = 0;
  this.previouslyShown = false;
  this.ratio = 0;
  Product.allImages.push(this);
};
Product.allImages = [];

// Loops through array of images creating functions
(function() {
  for (var i = 0; i < images.length; i++) {
    var name = images[i][0];
    var src = images[i][1];
    new Product(name, src);
  }
})();

// Prototype to track # of clicks
Product.prototype.clicked = function() {
  this.clicks++;
};

// Prototype to track timesShown
Product.prototype.amountShown = function() {
  this.timesShown++;
};

Product.prototype.conversionRatio = function() {
  var ratio = this.clicks / this.timesShown;
  return Math.round(ratio * 100);
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
    conversionChartData();
    displayResults();
    displayBarChart();
    displayBarChart2();
  }
};

imageSectionTag.addEventListener('click', handleClickOnImg);

// Invokes function to pull images from array of images
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

// Function that returns conversion ratio
var conversionChartData = function() {
  var conversionData = [];
  for (var i = 0; i < Product.allImages.length; i++) {
    conversionData.push(Product.allImages[i].conversionRatio());
  }
  return conversionData;
};

// Function to display image labels
var chartLabels = function(images) {
  var labelsArr = [];
  for (var i = 0; i < images.length; i++) {
    labelsArr.push(images[i].name);
  }
  return labelsArr;
};

// Function to hold # of clicks for chart data
var chartData = function(images) {
  var dataArr = [];
  for (var i = 0; i < images.length; i++) {
    dataArr.push(images[i].clicks);
  }
  return dataArr;
};

// Function to hold # of timesShown for chart data
var chartShown = function(images) {
  var shownData = [];
  for (var i = 0; i < images.length; i++) {
    shownData.push(images[i].timesShown);
  }
  return shownData;
};

// Random RGB function
var randomRGB = function() {
  var max = 255;
  var min = 0;
  var number = function() {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  var color = `rgb(${number()}, ${number()}, ${number()})`;
  return color;
};

// Stores random RGB in array to call on later for chart colors
var chartColors = function() {
  var backgroundColor = [];
  for (var i = 0; i < Product.allImages.length; i++) {
    backgroundColor.push(randomRGB());
  }
  return backgroundColor;
};

// Chart integration
function displayBarChart() {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels(Product.allImages),
      datasets: [
        {
          label: '# of Clicks',
          data: chartData(Product.allImages),
          backgroundColor: chartColors(),
          borderColor: chartColors(),
          borderWidth: 1
        },
        {
          label: '# of Times Shown',
          data: chartShown(Product.allImages),
          backgroundColor: chartColors(),
          borderColor: chartColors(),
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
            },
            scaleLabel: {
              display: true,
              labelString: 'Number of Clicks'
            }
          }
        ]
      }
    }
  });
}

// Conversion Ratio Bar Chart
function displayBarChart2() {
  var ctx = document.getElementById('conversionChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels(Product.allImages),
      datasets: [
        {
          label: 'Clicked Conversion',
          data: conversionChartData(Product.allImages),
          backgroundColor: chartColors(),
          borderColor: chartColors(),
          borderWidth: 1
        },
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            max: 100,
            callback: function(value) {
              return value + '%';
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'Percentage'
          }
        }]
      }
    }
  });
}

