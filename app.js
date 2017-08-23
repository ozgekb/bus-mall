function Image (imageName, filePath, imageId){
  this.imageName = imageName;
  this.filePath = filePath;
  this.imageId = imageId;
  this.numShown = 0;
  this.numClicked = 0;
}
var imageFileList = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg',
  'breakfast.jpg','bubblegum.jpg','chair.jpg','cthulhu.jpg','dogDuck.jpg',
  'dragon.jpg','pen.jpg','petSweep.jpg','scissors.jpg','shark.jpg','unicorn.jpg',
  'sweep.png','tauntaun.jpg','usb.gif','waterCan.jpg','wineGlass.jpg'];

var imageList = [];
for (var i = 0; i < imageFileList.length; i++){
  var newImage = new Image(imageFileList[i], 'img/' + imageFileList[i], i);
  imageList.push(newImage);
}
var currentImageList = [];

var displayNewImageSet = function (){
  var index1 = Math.floor(Math.random() * 20);
  while(currentImageList.includes(index1)){
    index1 = Math.floor(Math.random() * 20);
  }
  var index2 = Math.floor(Math.random() * 20);
  while(index2 == index1 || currentImageList.includes(index2)){
    index2 = Math.floor(Math.random() * 20);
  }
  var index3 = Math.floor(Math.random() * 20);
  while(index3 == index1 || index3 == index2 || currentImageList.includes(index3)){
    index3 = Math.floor(Math.random() * 20);
  }

  var body = document.getElementsByTagName('body')[0];

  for (var i = 0; i < currentImageList.length; i++){
    var img = document.getElementById(currentImageList[i]);
    body.removeChild(img);
  }
  currentImageList[0] = index1;
  currentImageList[1] = index2;
  currentImageList[2] = index3;

  for (var i = 0; i < currentImageList.length; i++){
    var img = document.createElement('img');
    var index = currentImageList[i];
    imageList[index].numShown++;
    img.src = imageList[index].filePath;
    img.id = imageList[index].imageId;
    body.appendChild(img);
    img.addEventListener('click',onClick);
  }

};
var totalShown = 0;
function onClick(){
  processClick(event);
}
var chartImageList = [];
var numberOfClicked = [];
function reportResult(){
  var body = document.getElementsByTagName('body')[0];
  for (var i = 0; i < imageList.length; i++){
    //var parag = document.createElement('p');
    //parag.innerText = imageList[i].imageName + '      has been voted    ' + imageList[i].numClicked + '     times     ' + '   and has been shown    ' + imageList[i].numShown + '    times.';
    //body.appendChild(parag);
    if ( imageList[i].numShown > 0){
      numberOfClicked.push(imageList[i].numClicked);
      chartImageList.push(imageList[i].imageName);
    }
  }
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var chartConfig = {
    type: 'bar',
    data: {
      labels: chartImageList, // x-axis labels for every entry in your data set. It should match up with the number of things you're plotting (if it's a bar chart)
      datasets: [{ // <-- notice that this can be an array of multiple data sets.
          // each data set is its own object literal.
        label: '# of Votes', // <-- the label of this one data set
        data: numberOfClicked, // <-- where your data actually goes. just the numbers
        backgroundColor: [ // <-- this can be either one single color or a color for each item in your bar chart.
          'rgb(191, 191, 63)',
          'rgb(127, 191, 63)',
          'rgb(63, 191, 191)',
          'rgb(63, 63, 191)',
          'rgb(191, 63, 191)',
          'rgb(63, 127, 191)',
          'rgb(63, 127, 191)',
          'rgb(191, 63, 127)',
          'rgb(191, 63, 127)',
          'rgb(191, 63, 191)',
          'rgba(191, 63, 155, 0.6)',
          'rgba(63, 178, 191, 0.6)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(161, 63, 191, 0.6)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgb(127, 191, 63)',
          'rgb(63, 191, 191)',
          'rgb(63, 63, 191)',
          'rgb(191, 63, 191)',
          'rgb(63, 127, 191)',
          'rgb(63, 127, 191)',
          'rgb(191, 63, 127)',
          'rgb(191, 63, 127)',
          'rgb(191, 63, 127)',
          'rgb(191, 63, 191)',
        ],
        borderWidth: 5 // border width in pixels
      }]
    },
    options: {
        // maintainAspectRatio: false,
        // animation: {
        //   duration: 1000
        // },
      title: {
        display: true,
        text: 'Analysis of the products'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  };
  body.appendChild(canvas);
  var myChart = new Chart(ctx, chartConfig);
}

function processClick(event){
  var imageId = parseInt(event.target.id);
  imageList[imageId].numClicked++;
  if(totalShown == 25){

     // disable event listener.
    for(i = 0; i < currentImageList.length; i++){
      document.getElementById(currentImageList[i]).removeEventListener('click',onClick);
    }
    reportResult();
    return;
  }
  totalShown++;
  displayNewImageSet();
}
displayNewImageSet();
