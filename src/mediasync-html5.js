/*
 * MediaSync - HTML5 Media Wrapper
 *
 * Copyright 2014, Fabio Soggia
 * Released under the MIT Licence
 * http://opensource.org/licenses/MIT
 *
 */

/**
 *	Sample wrapper for HTML5 audio/video tag.
 */
var Html5MediaWrapper = function (media) {
	this.media = media;
};

Html5MediaWrapper.prototype.getCurrentTime = function() {
	return this.media.currentTime;
};