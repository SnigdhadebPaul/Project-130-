song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist=0;
song1status = "";
song2status = "";
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");

}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses);

}
function draw() {
    image(video, 0, 0, 500, 400);
    song1status = song1.isPlaying();
    fill("red");
    stroke("red");
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();


        if (song1status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "playing-Harry Potter Song";
        }

    }
    if (scorerightWrist > 0.2){ 
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (song2status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "playing-Peter Pan Song";
        }

    }



}
function modelloaded() {
    console.log("poseNet is initialized");


}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("     leftWristX=   " + leftWristX + "      leftWristY   " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("     rightWristX=   " + rightWristX + "      rightWristY   " + rightWristY);

    }
}
