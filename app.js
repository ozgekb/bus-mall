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

function reportResult(){
  var body = document.getElementsByTagName('body')[0];
  for (var i = 0; i < imageList.length; i++){
    var parag = document.createElement('p');
    parag.innerText = imageList[i].imageName + '      has been voted    ' + imageList[i].numClicked + '     times     ' + '   and has been shown    ' + imageList[i].numShown + '    times.';
    body.appendChild(parag);
  }
}

function processClick(event){
  var imageId = parseInt(event.target.id);
  imageList[imageId].numClicked++;
  if(totalShown == 3){

    // disable event listener.
    for(i = 0; i < 25; i++){
      document.getElementById(currentImageList[i]).removeEventListener("click",
       onClick);
    }
    reportResult();
    return;
  }
  totalShown++;
  displayNewImageSet();
}
displayNewImageSet();
