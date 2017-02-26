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
	console.log(results);
};

initialize();