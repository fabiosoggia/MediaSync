/*
 * MediaSync
 *
 * Copyright 2014, Fabio Soggia
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 */

/**
 *	Create a MediaSync object.
 *	@param media object an object with method "getCurrentTime()"
 *	@param settings object with properties: moments, callback and once (optional).
 */
var MediaSync = function (media, settings) {
	this.media = media;

	this.moments = settings.moments;
	this.moments.sort(function(a, b){ return a.at - b.at; });
	this.minTime = this.moments[0].at;
	this.maxTime = this.moments[this.moments.length-1].at;

	this.callback = settings.callback;

	this.once = (settings.once === false) ? false : true;
	this.last = -1;

	this.update();
};

/**
 *	Return the index of the moment with max "at" value but less or equal than time.
 */
MediaSync.prototype.search = function(time) {
	if (time < this.minTime) {
		return -1;
	}

	if (time > this.maxTime) {
		return this.moments.length-1;
	}

	// Binary search of the "moment"

	var minIndex = 0;
	var maxIndex = this.moments.length - 1;
	var currentIndex;
	var currentElement;
	var nextElement;

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = this.moments[currentIndex];
		nextElement = this.moments[currentIndex + 1];

		if (time >= currentElement.at && time < nextElement.at) {
			return currentIndex;
		}

		if (time > currentElement.at) {
			minIndex = currentIndex + 1;
		}
		else {
			maxIndex = currentIndex - 1;
		}
	}
};

/**
 *	Check the for time changes and execute the callback when appropriate.
 */
MediaSync.prototype.update = function() {
	var time = 0;
	if (!this.media.getCurrentTime) {
		console.log("Unable to call getCurrentTime on media");
	} else {
		time = this.media.getCurrentTime();
	}

	var target = this.search(time);

	if (target != -1) {
		if (this.last != target || !this.once) {
			this.last = target;
			this.callback(this.moments[target], time);
		}
	}

	// This is a kind of "game loop" implementation
	var self = this;
	requestAnimationFrame(function () {
		self.update.call(self);
	});
};