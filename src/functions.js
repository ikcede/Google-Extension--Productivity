
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
		return {
			prod:false,
			time:-1,
			timer:false,
			unproductive:[]
		};
	} 
	else return JSON.parse(str);
}

function save(obj, dataStr) {
	localStorage[dataStr] = JSON.stringify(obj);
}

// Extracting a domain
function extractDomain(urlStr) {
	var loc = document.createElement('a');
	loc.href = urlStr;
	return loc.hostname;
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
		
		// Get the current tab
		chrome.tabs.getSelected(null, function(tab) {
			var dom = extractDomain(tab.url);
			
			// If it's unproductive: remove from blocked list and unblock
			if(prod.unproductive.indexOf(dom) > -1) {
				chrome.tabs.insertCSS(tab.id,{code:"body{opacity:1 !important;}"});
			}
		});
		
	}
	// Already OFF
	else {
		$("#productivity .flip").removeClass("off").addClass("on").text("ON");
		chrome.browserAction.setIcon({path:"iconplus.png"});
		
		prod.prod = true;
		save(prod, "productive.ly");
		
		// Get the current tab
		chrome.tabs.getSelected(null, function(tab) {
			var dom = extractDomain(tab.url);
			
			// If it's unproductive: block it and add to unproductive list
			if(prod.unproductive.indexOf(dom) > -1) {
				chrome.tabs.insertCSS(tab.id,{code:"body{opacity:.2 !important;}"});
			}
		});
	}
});

$(document).on("click", "#flippage", function() {
	
	// Get the current tab
	chrome.tabs.getSelected(null, function(tab) {
	
		var dom = extractDomain(tab.url);
	
		// Open productivity object
		var prod = open("productive.ly");

		// Already Productive:
		// Make unproductive and filter if productivity is ON
		if($("#page .flip").hasClass("on")) {
			$("#page .flip").removeClass("on").addClass("off").text("Unproductive");
			if(prod.unproductive.indexOf(dom) < 0) {
				prod.unproductive.push(dom);
			}
			if(prod.prod) {
				chrome.tabs.insertCSS(tab.id,{code:"body{opacity:.2 !important;}"});
			}
		}
		// Already Unproductive
		// Make productive and unfilter
		else {
			$("#page .flip").removeClass("off").addClass("on").text("Productive");
			if(prod.unproductive.indexOf(dom) > -1) {
				prod.unproductive.splice(prod.unproductive.indexOf(dom), 1);
			}
			chrome.tabs.insertCSS(tab.id,{code:"body{opacity:1 !important;}"});
		}
		
		save(prod, "productive.ly");
	
	});
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
	
	// Get the current tab
	chrome.tabs.getSelected(null, function(tab) {
		var dom = extractDomain(tab.url);
	
		// The page is unproductive
		if(prod.unproductive.indexOf(dom) > -1) {
			$("#page .flip").removeClass("on").addClass("off").text("Unproductive");
		}
	});
});