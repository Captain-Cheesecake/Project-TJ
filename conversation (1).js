/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

//for the purpose of following the copyright attached there have been changes to this code, parts have been added to make this work

var picture = 'what can you see around you';
var welcome = 'Hi there! I\'m Watson, it\'s nice to meet you!'
var thinking = 'Hold on i\'m thinking'
//var thinking2 = 'err, thats a bit tricky'
var q = 0
//var name = 'kevin'
//var realname = ''
var TJBot = require('tjbot');
var config = require('./config');
var question =  0
var answer = ''
var random = 0

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
var WORKSPACEID = config.conversationWorkspaceId;

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['microphone', 'speaker', 'camera'];

// set up TJBot's configuration
var tjConfig = {
    log: {
        level: 'verbose'
    }
};

// instantiate our TJBot!

var tj = new TJBot(hardware, tjConfig, credentials);

console.log("You can ask me to introduce myself or tell you a joke.");
console.log("Try saying, \"" + tj.configuration.robot.name + ", please introduce yourself\" or \"" + tj.configuration.robot.name + ", who are you?\"");
console.log("You can also say, \"" + tj.configuration.robot.name + ", tell me a joke!\"");

while (q <1) {
	tj.speak(welcome);
	q=q+1;
	question = question +1
}
//setTimeout(namechange,10000)

//function namechange(){
//	if (0<question <2){
//		question = question +1
//		tj.speak('Is your name '+name+'?')
//		tj.listen(answer)
//		if (answer = 'yes'){
//			tj.speak('Hello Kevin!')
//		}else if (answer = 'Yes'){
//			tj.speak('Hello Kevin!')
//		}else{
//			tj.speak('Oh sorry, my mistake, what is your name?')
//		}
//		tj.listen(realname)
//	}
//}

//if (random = 1){
//	thinking = ''
//}else if (random = 2){
//	thinking = 'ohh, thats a tricky one'
//} else{
//	thinking = 'hmmmm'
//}

// listen for utterances with our attentionWord and send the result to
// the Conversation service
tj.listen(function(msg) {
    // check to see if they are talking to TJBot
    if (msg.startsWith(tj.configuration.robot.name)) {
        // remove our name from the message
        var turn = msg.toLowerCase().replace(tj.configuration.robot.name.toLowerCase(), "");
        // send to the conversation service
        tj.speak(thinking)
//	tj.speak(thinking2)
        tj.converse(WORKSPACEID, turn, function(response) {
            // speak the result
            tj.speak(response.description);
        });
    } else if (msg.startsWith(picture)){
	tj.speak('certainly')
	const tjvision = require('./tjvision');
	let val = tjvision.camera();
	}
});
