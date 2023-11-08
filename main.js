var canvas;
var video;
var musica;
var pose_net;
var pulso_esqX=0;
var pulso_esqY=0;
var pulso_dirX=0;
var pulso_dirY=0;
var score_pulso_esq=0;
var score_pulso_dir=0;

function preload(){
    musica=loadSound("music.mp3");
}

function setup( ){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    pose_net=ml5.poseNet(video, model_loaded);
    pose_net.on("pose", got_poses);
}

function got_poses(results){
    if(results.length>0){
        console.log(results);
        score_pulso_esq=results[0].pose.keypoints[9].score;
        

        pulso_esqX=results[0].pose.leftWrist.x;
        pulso_esqY=results[0].pose.leftWrist.y;
        pulso_dirX=results[0].pose.rightWrist.x;
        pulso_dirY=results[0].pose.rightWrist.y;

        console.log("valorX do pulso esquerdo: "+pulso_esqX);
        console.log("valorY do pulso esquerdo: "+pulso_esqY);
        console.log("valorX do pulso direito: "+pulso_dirX);
        console.log("valorY do pulso direito: "+pulso_esqY);
    }


}

function model_loaded(){
    console.log("pose net foi carregado");
}

function play(){
    musica.play();
    musica.setVolume(1);
    musica.rate(1);

}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    
    if(score_pulso_esq>0.2){
        console.log("entrou");
        circle(pulso_esqX, pulso_esqY, 20);
        var numero_pulso_esq=Number(pulso_esqY);
        var remove_decimais=floor(numero_pulso_esq);
        var volume=remove_decimais/500;
        document.getElementById("volume").innerHTML="volume: "+volume;
        musica.setVolume(volume);
    }
}