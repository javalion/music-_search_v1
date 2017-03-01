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

//Handler for a successful album search
var successfulSearchHandler = function(results) {
    var $html = "";
	if (results.albums.items.length > 0) {
	$(results.albums.items).each(function (idx, album){
		var id = album.id;
		var imageUrl = album.images[0].url;
		var name = album.name;
		var link = album.external_urls.spotify;
		var artist = album.artists[0].name;
		$html += '<li><a href="album.html?id=' + id + '"><div class="album-wrap"><img class="album-art" src="' + imageUrl + '"></div></a><a href="' + link + '"><span class="album-title">' + name + '</span></a><span class="album-artist">' + artist + '</span></li>';
	}); } else {
		$html = '<li class="no-albums"><i class="material-icons icon-help">help_outline</i>No albums found that match: ' + $('#search').val() + '</li>';
	}
	
	$('#albums').html($html);
};

initialize();