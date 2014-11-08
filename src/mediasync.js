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

	this.once = !settings.once^true;
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

	// TO DO: replace with a binary search
	var target = null;
	for (var i = 1; i < this.moments.length; i++) {
		target = this.moments[i];
		if (time < target.at) {
			return i - 1;
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