sound = "" ;
function preload() {
    sound = loadSound("music.mp3");
}

scoreLeftWrist = 0;
rightWristx = 0;
rightWristy = 0;
leftWristx = 0;
leftWristy = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model has loaded");
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("Right Wrist X = " + rightWristx + "Right Wrist Y = " + rightWristy);
        console.log("Left Wrist X = " + leftWristx + "Left Wrist Y = " + leftWristy);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
    
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");

    if(scoreLeftWrist > 0.1) {
        circle(leftWristx, leftWristy, 10);
        NumberLeftY = Number(leftWristy);
        LeftYFloor = floor(NumberLeftY)
        volume = LeftYFloor/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        sound.setVolume(volume);
    } 
}

function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}