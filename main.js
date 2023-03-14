//https://teachablemachine.withgoogle.com/models/VCf57PD0R/model.json
Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri)  {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/VCf57PD0R/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "My number one prediction is that smith is pulling a" + prediction_1;
    speak_data_2 = "And the second prediction is that hes pulling a" + prediciton_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult)
}
function gotResult(error,results) {
    if(error) {
        console.error(error)
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediciton_2 = results[1].label;
        speak();
        if(results[0].label == "THUMBS UP")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "THUMBS DOWN")
        {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "SHAKAS")
        {
            document.getElementById("update_emoji").innerHTML = "&#129305;";
        }
        if(results[1].label == "THUMBS UP")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "THUMBS DOWN")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128078;";
        }
        if(results[1].label == "SHAKAS")
        {
            document.getElementById("update_emoji2").innerHTML = "&#129305;";
        }
    }
}