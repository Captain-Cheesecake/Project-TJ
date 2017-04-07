/**
* Author : Victor Dibia
* Title : TJVision ... nodejs to capture and i
*/

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');
var config = require("./config");
var watson = require('watson-developer-cloud');
var exec = require('child_process').exec;

var visual_recognition = new VisualRecognitionV3({
  api_key: config.VisionKey,
  version_date: config.VisionVersion
});

//processImage("shot.jpg")
/**
 * [processImage send the given image file to Watson Vision Recognition for Analysis]
 * @param  {[type]} imagefile [description]
 * @return {[type]}           [description]
 */
function processImage(imagefile){
  var params = {
    images_file: fs.createReadStream(imagefile)
  };

  var resultstring = "Objects in the image are: " ;

  visual_recognition.classify(params, function(err, res) {
    if (err){
      console.log(err);
    } else {
      result = res.images[0].classifiers[0].classes
      if(result !== null & result.length > 0){
        result.forEach(function(obj){
          console.log(obj.class)
          resultstring = resultstring + obj.class + ", "
        })

        console.log(resultstring)
        speak(resultstring);
      }
      //console.log("================\n",JSON.stringify(result), null, 2));
    }
  });
}



var text_to_speech = watson.text_to_speech({
  username: config.TTSUsername,
  password: config.TTSPassword,
  version: 'v1'
});
speak("Bingo is a mean dog")
function speak(textstring){
  var params = {
    text: textstring,
    voice: config.voice,
    accept: 'audio/wav'
  };
  text_to_speech.synthesize(params).pipe(fs.createWriteStream('output.wav')).on('close', function() {
    var create_audio = exec('ffplay -autoexit output.wav', function (error, stdout, stderr) {
    }) // if on mac

  });
}
