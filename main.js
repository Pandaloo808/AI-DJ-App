song="";
score_rightWrist=0;
score_leftWrist=0;
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
function preload(){
  song=loadSound("music.mp3");
}
function setup(){
  canvas=createCanvas(600,500);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();
  poseNet=ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
function modelLoaded(){
  console.log('poseNet is initialized');
}
function gotPoses(results){
  if(results.length>0){
    console.log(results);
    score_rightWrist=results[0].pose.keypoints[10].score;
    score_leftWrist=results[0].pose.kewpoints[9].score;
    console.log("score_rightWrist="+score_rightWrist+"score_leftWrist="+score_leftWrist);
    leftWristX=results[0].pose.leftWrist.X;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX= "+leftWristX+"leftWristY= "+leftWristY);
    rightWristX=results[0].pose.rightWrist.X;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX= "+rightWristX+"rightWristY= "+rightWristY);
  }
}function draw(){
  image(video,0,0,600,500);
  fill("#FF0000");
  stroke("#FF0000");
  if(score_rightWrist>0.2){
    circle(rightWristX, rightWristY, 20);
    
  if(rightWristY>0 && rightWristY<=100){
    document.getElementById("speed").innerHTML="speed=0.5x";
    song.rate(0.5);
  }
  if(rightWristY>100 && rightWristY<=200){
    document.getElementById("speed").innerHTML="speed=1.0x";
    song.rate(1);
  }
  if(rightWristY>200 && rightWristY<=300){
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
  }
  if(rightWristY>300 && rightWristY<=400){
    document.getElementById("speed").innerHTML="speed=2.0x" 
    song.rate(2);
  }
  else if(rightWristY>400){
    document.getElementById("speed").innerHTML="speed=2.5x"
    song.rate(2.5);
}
}
if(score_leftWrist>0.2){
  circle(leftWristX, leftWristY, 20);
  InNumberLeftWristY=Number(leftWristY);
  new_leftWrist_Y=floor(InNumberLeftWristY*2);
  leftWristY_divide_1000=new_leftWristY/1000;
  document.getElementById("volume").innerHTML="volume="+leftWrist_divide_1000;
  song.setVolume(leftWristY_divide_100);
}
function play(){
  song.play();
  song.setVolume(1);
  song.rate(1);
}
