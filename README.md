# TJBot-Visual
A short guide on how to turn your Raspberry Pi from NOOB to a TJBot with IBM Watson services

(please note that this only the software side of things, for body plans go here http://www.instructables.com/id/Build-TJ-Bot-Out-of-Cardboard/ and for folding go here http://www.instructables.com/id/Build-TJ-Bot-Out-of-Cardboard/step3/Folding-TJBot-Part-1/ and here http://www.instructables.com/id/Build-TJ-Bot-Out-of-Cardboard/step4/Folding-TJBot-Part-2/ )

Standard rules apply with this project so you are going to need some basic hardware and some extras

You will need:
- Micro USB
- USB (or 3.5mm jack) Speakers - (I find these often work better than bluetooth)
- USB Microphone
- Pi Cam
- Keyboard
- Mouse
- WIFI dongle / Ethernet cable

now you are ready for 
# Step 1

Go to the Raspberry Pi website and download a NOOBS of your choosing https://www.raspberrypi.org/downloads/noobs/ or raspian if you are more advanced and load it onto your sd card, plug it into your pi with all the other parts and its now ready, run noobs (or raspian) and let it finish installing

# Step 2

First make these commands in the terminal
- sudo apt-get update
- sudo apt-get dist-upgrade
- curl -L https://deb.nodesource.com/setup_6.x | sudo -E bash
- sudo apt-get install -y nodejs
- sudo apt-get alsa-base alsa-utils libasound2-dev

Three very important packages, most sytems only have 2 of the three at this point

If you got through that without errors then you should be good to go for the next parts!

# Step 3

Now if you chose a speaker that dosen't use the 3.5mm jack skip to the line

ok for the rest of you you need to do
- sudo raspi-config
then select the advanced option
now down to audio and then force to 3.5mm jack (this helps if you are using a permanent case that will make it harder to change later)
now tap right key twice to get to finish and your done

----------------------------------------------------------------------------------

If you have a USB audio, you need to update your /usr/share/alsa/alsa.config to set the USB audio as the default device. Begin with running the following command to make sure your USB is connected and listed there.
- lsusb 
Next is to detect the card number of your USB audio.
- aplay -l 
Take a note of the card number associated with your USB Audio. Then go to the also.config file to set it as default.
- sudo nano /usr/share/alsa/alsa.conf
Look for

- defaults.ctl.card 0
- defaults.pcm.card 0
and update the card number (0 here) to the card number of your USB audio.

for bluetooth speakers, here is a good tutorial https://www.raspberrypi.org/magpi/bluetooth-audio-raspberry-pi-3/

This next bit is important if you want to make your TJBot wireless and have the visual feature running (or at least only 1 or 2 wires left) 
do
- sudo raspi-config
go to interfacing and choose camera, activate this
then do the same with SSH (for wireless TJ)
finally finish up by pressing enter on finish

# Step 4

Now for the good bit do the following commands in order
- git clone https://github.com/Captain-Cheesecake/TJBot-Visual
- git clone https://github.com/Captain-Cheesecake/TJBot-Visual-Otherparts
- cd TJBot-Visual
- npm install
- npm rebuld
- cd
- cd TJBot-Visual-Otherparts
- npm install
- npm rebuld
- cd
(If you have any issues just prefix 'sudo' and it should work)

(Also if npm rebuild didn't work try this)
- rm -r node_modules
- npm install
and you're good!

# Step 5

To make TJBot work you must have Watson API's available to you, the way to do this is IBM Bluemix https://console.eu-gb.bluemix.net
first things first make a free account, then go to the catalog and find 'Conversation', 'Text to speech' and 'speech to text'

start all of these services (leave the names and credentials as is)
now, back on your pi do
- cd TJBot-Visual
- cp config.default.js config.js
now open config.js in leafpad or nano
for nano just do
- nano config.js
and in each slot put the credentials like this

exports.credentials.conversation = {
	password: 'xxxxxxxxxxxx',
	username: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

When you get to text to speech the second time, click new credential, leave everything as is and click add, now use this second credential instead of the first to prevent errors
# Step 6

In this step we create the replies that TJ will be using when you talk to him
for this we need Watson conversation but instead of clicking credentials stay where you are, you want to,
- Launch tool
- In workspaces click import and drag the workspace-sample into the window and have the 'everything (intents, entitys and dialog) box selected
- you can edit this as you wish (intents must have 5 variations)
- go back to workspaces and click the three dots, then view details

this is your workspace key, just put it here
- exports.conversationWorkspaceId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

# Step 7

This can get a bit tricky so stay with me here,
you need to copy
- tjvision.js
- the CONTENTS of node_modules, not the file

from TJBot-Visual-Otherparts to TJBot-Visual, you can do this in file manager because it is easier, just drag and drop
for the node_modules files click skip if it says that the file already exists, you wont need these but you will need the ones that are missing

# Step 8
If you did all that correct you can now run the code!
- cd TJBot-Visual (skip if already there)
- sudo node conversation.js

now you can talk to watson, and he can talk to you, for example:
- Watson, please introduce yourself
- Watson, tell me a joke
- what can you see around you

# Troubleshooting

If you see TJBot's response on the terminal but don't hear TJBot talking, there is a good chance that one of these two things has happened: 1)The audio output is directed to a wrong channel (you can fix it from raspi-config), 2)Your sound modules are blocked. In that case, go to /etc/modprobe.d/ and remove blacklist-rgb-led.conf

Then run the following command:
- sudo update-initramfs -u

Reboot and confirm the "snd" modules are running by executing the command "lsmod". This should solve the problem.
- lsmod

