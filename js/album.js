"use strict";

function initialize() {
	// Validate the Incoming Request
    var validRequest = validateRequest();
	if (validRequest) {
		// Request the album data
        requestAlbumData();
	}
}

var validateRequest = function() {
 return true;
};

var requestAlbumData = function() {
  var albumId = getParameterValue("id");
  $.getJSON('https://api.spotify.com/v1/albums/' + albumId, processAlbumData);
};

var processAlbumData = function(data) {
	var imageUrl = data.images[0].url;
	var albumTitle = data.name;
	var releaseDate = data.release_date;
	var artist = data.artists[0].name;
	var html = '<div><img class="album-cover-image" src="' + imageUrl + '" width="50%"></div><div class="album-title">' + albumTitle +
	'</div><div class="album-year">' + releaseDate + '</div><div class="album-artist">' + artist + '</div>';
	$(data.tracks.items).each(function (idx, track) {
		html +='<li class="song">' + track.name + '</li>';
	});
	$('#album').html(html);
};

// Get the value of a query string parameter
function getParameterValue(str){
	var value = "";
	var paramIdx = window.location.href.indexOf("&" + str + "=");
	if (paramIdx === -1) {
		paramIdx = window.location.href.indexOf("?" + str + "=");
	}
	if (paramIdx > -1) {
		var startIdx = window.location.href.indexOf("=",paramIdx) + 1;
		var endIdx = window.location.href.indexOf('&',startIdx);
		if (endIdx === -1) {
			endIdx = window.location.href.length;
		}
		value = window.location.href.substring(startIdx, endIdx);
	}
	return value;
}

initialize();