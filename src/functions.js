
/* Structure of the localStorage object

prod: bool
time: int (ms)
timer: bool 
unproductive: Array (of Strings)

*/

// Functions to deal with localStorage
function open(dataStr) {
	var str = localStorage[dataStr];
	
	if(!str || typeof(str) === "undefined") {
		return {};
	} 
	
	else return JSON.parse(str);
}

function save(obj, dataStr) {
	localStorage[dataStr] = JSON.stringify(obj);
}

// Events
$(document).on("click", "#flipprod", function() {

	var prod = open("productive.ly");

	// Already ON
	if($("#productivity .flip").hasClass("on")) {
		$("#productivity .flip").removeClass("on").addClass("off").text("OFF");
		chrome.browserAction.setIcon({path:"iconminus.png"});
		
		prod.prod = false;
		save(prod, "productive.ly");
	}
	// Already OFF
	else {
		$("#productivity .flip").removeClass("off").addClass("on").text("ON");
		chrome.browserAction.setIcon({path:"iconplus.png"});
		
		prod.prod = true;
		save(prod, "productive.ly");
	}
});

$(document).on("click", "#flippage", function() {
	// Already ON
	if($("#page .flip").hasClass("on")) {
		$("#page .flip").removeClass("on").addClass("off").text("Unproductive");
	}
	// Already OFF
	else {
		$("#page .flip").removeClass("off").addClass("on").text("Productive");
	}
});

$(document).on("click","#settimer", function() {
	// Show timer
	// Pause timer
	
});

// Ready function
$(document).ready(function() {
	// Get data from prod
	var prod = open("productive.ly");
	
	if(prod.prod) {
		chrome.browserAction.setIcon({path:"iconplus.png"});
	}
	else {
		$("#productivity .flip").removeClass("on").addClass("off").text("OFF");
		chrome.browserAction.setIcon({path:"iconminus.png"});
	}
});