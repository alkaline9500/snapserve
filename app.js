const nodeWebcam = require('node-webcam');
const fs = require('fs');
const express = require('express');
const player = require('play-sound')(opts = {})
const app = express();

const options = {
    width: 1280,
    height: 720, 
    quality: 100,
    delay: 1,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "base64"
};

const webcam = nodeWebcam.create(options);

app.get('/', (req, res) => {
    player.play('camera.mp3', err => err && console.log(err));
    webcam.capture('picture', (err, data) => {
        if (err) {
            console.log(err);
            res.send("A problem occurred.");
        } else {
            res.send(`<img src="${data}"/>`);
        }
    }); 
});

app.listen(3000, () => {
    console.log("Listening at port 3000....");
});
