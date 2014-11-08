# MediaSync
A small library for syncing javascript functions with timed media (audio, video and more).


## Features
* Library Independent
* Customizable
* HTML5 Audio support
* HTML5 Video support
* YouTube Support


## Demos
* [HTML5 Audio](http://fabiosoggia.github.io/MediaSync/examples/example-01-audio.html)
* [YouTube](http://fabiosoggia.github.io/MediaSync/examples/example-03-youtube.html)


## Installation

Include `mediasync.min.js` (and `mediasync-html5.min.js` if you need HTML5 audio/video support) in your HTML file and you are ready to go.

```html
<script type="text/javascript" src="src/mediasync.js"></script>
<script type="text/javascript" src="src/mediasync-html5.js"></script>
```


## Usage

After your page has loaded, you may call the script like so:

```javascript
var ms = new MediaSync(media, {
    moments: [
            { at:  0, text: "Callback parameter when media is at 0 sec" },
            // ...
            { at: 74, text: "Callback parameter when media is at 74 sec" },
        ],
    callback: function(moment, time) {
        console.log(moment.text);
    }
});
```

This example can be read as 'execute callback at 0/74 with parameters `{ at:  0/74, text: "Callback parameter when media is at 0/74 sec" }` and `time`'.

`MediaSync` accepts two parameters: media and settings. The first must be an onject with a `getCurrentTime()` method which returns the current time of the media. The second parameter is an object of options defined as below:


## Settings and Defaults
```javascript
settings = {
    callback: function() { /* ... */ },
    moments: [ /* ... */ ],
    once: true
}
```

* `callback`: (Function) [REQUIRED] is the function that will be executed when a certain moment will be reached;
* `moments`: (Array of objects) [REQUIRED] is the list of "moments" where the callback should be executed. Each moment must contain an "at" property.


## Usage with HTML5 Audio/Video
Include `mediasync.min.js` and `mediasync-html5.min.js`.

```javascript
var audio = new Audio('sample.mp3');
var media = new Html5MediaWrapper(audio);
```


## Usage with custom player/viewer
If you are using a custom lib to play a song, a video, a slideshow, whatever create a media wrapper around your player like this:

```javascript
var MyLibMediaWrapper = function (media) {
    // Where media is an instance of your player
    this.media = media;
};

MyLibMediaWrapper.prototype.getCurrentTime = function() {
    // Let's assume that the instance of your player has
    // a getElapsedTime() method wich return the current
    // position of the media.
    return this.media.getElapsedTime();
};
```


## Contribute
Feel free to fork me! =)


## Licensing
The MIT License (MIT)

Copyright (c) 2014 Fabio Soggia

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.