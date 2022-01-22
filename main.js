song="";
rightwristX=0
rightwristY=0
leftwristX=0
leftwristY=0
scoreleftwrist=0
scorerightwrist=0
function setup(){
    canvas = createCanvas(555,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posent=ml5.poseNet(video ,modelLoaded);
poseNet.on('pose',gotPose)
}
function preload(){
song=loadSound("music.mp3")
}
function play_song(){
    song.play()
}
function gotPose(result){
    if(result.length>0){
        console.log(result)
        rightwristX=result[0].pose.rightWrist.x
        rightwristY=result[0].pose.rightWrist.y
        leftwristX=result[0].pose.leftWrist.x
        leftwristY=result[0].pose.lefttWrist.y
        scoreleftwrist=result[0].pose.keypoints[9].score
        scorerightwrist=result[0].pose.keypoints[10].score


    }

}

function draw(){
    image(video,0,0,555,400);
    fill("red");
    stroke("red");
    
    if(scorerightwrist>0.2){
        circle(rightwristY,rightwristX,20);

        if(rightwristY>0 &&rightwristY<=100)
        {
          document.getElementById("sp").innerHTML="speed: 0.5x";
          song.rate(0.5);
        }
        
        else if(rightwristY>100 && rightwristX<=200)
        {
            document.getElementById("sp").innerHTML="speed:1x";
            song.rate(1);
        }
        else if(rightwristY>200 && rightwristX<=300)
        {
            document.getElementById("sp").innerHTML="speed:1.5x";
            song.rate(1.5);
        }
        else if(rightwristY>300 && rightwristX<=400)
        {
            document.getElementById("sp").innerHTML="speed:2x";
            song.rate(2);
        }
        else if(rightwristY>400 && rightwristX<=500)
        {
            document.getElementById("sp").innerHTML="speed:2.5x";
            song.rate(2.5);
        }
    }
    if(scoreleftwrist>0.2)
    {
        circle(leftwristX,leftwristY,20)
        var1=Number(leftwristY);
        var2=floor(var1*2);
        var3=var2/1000
        document.getElementById("vol").innerHTML="volume="+var3;
        song.setVolume(var3);
    }
}