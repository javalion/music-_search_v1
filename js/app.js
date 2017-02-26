"use strict";

function initialize() {
	// Setup Event Handlers
	setupEventHandlers();
}

function setupEventHandlers() {
	$('.search-form').submit(handleSearch);
}

// Handlers
var handleSearch = function(evt) {
	evt.preventDefault();
	var url = 'https://api.spotify.com/v1/search?type=album&q=' + encodeURI($('#search').val());
    $.getJSON(url, successfulSearchHandler).fail(function(jqXhr){alert(jqXhr.statusText);});
};

var successfulSearchHandler = function(results) {
    var $html = "";
	if (results.albums.items.length > 0) {
	$(results.albums.items).each(function (idx, album){
		$html += '<li><div class="album-wrap"><img class="album-art" src="' + album.images[0].url + '"></div><span class="album-title">' + album.name + '</span><span class="album-artist">' + album.artists[0].name + '</span></li>';
	}); } else {
		$html = '<li class="no-albums"><i class="material-icons icon-help">help_outline</i>No albums found that match: ' + $('#search').val() + '</li>';
	}
	
	$('#albums').html($html);
};

initialize();