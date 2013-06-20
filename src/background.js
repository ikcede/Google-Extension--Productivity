// background.js

// Note that the tab.onCreated listener also listens to iFrames...

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

// Function for extracting the domain of the page from a string
function extractDomain(urlStr) {
	var loc = document.createElement('a');
	loc.href = urlStr;
	return loc.hostname;
}

/* Structure of the localStorage object

prod: bool
time: int (ms)
timer: bool 
unproductive: array of Strings

*/

// localStorage.removeItem("productive.ly");

// Tab events
chrome.tabs.onCreated.addListener(function(tab) {

	var prod = open("productive.ly");

	// Get the current tab
	chrome.tabs.getSelected(null, function(curTab) {
		
		// If productivity is on and the tab is not productive
		if(prod.prod && prod.unproductive.indexOf(extractDomain(curTab.url)) > -1) {
			chrome.tabs.insertCSS(
				curTab.id,
				{   
					code:"body{opacity:.2 !important;}"
				}   
			);
		}
	});
	
});

chrome.tabs.onUpdated.addListener(function(tab){

	var prod = open("productive.ly");
	
	// Get the current tab
	chrome.tabs.getSelected(null, function(curTab) {
		
		// If productivity is on and the tab is not productive
		if(prod.prod && prod.unproductive.indexOf(extractDomain(curTab.url)) > -1) {
			chrome.tabs.insertCSS(
				curTab.id,
				{   
					code:"body{opacity:.2 !important;}"
				}   
			);
		}
		else {
			chrome.tabs.insertCSS(
				curTab.id,
				{   
					code:"body{opacity:1 !important;}"
				}   
			);
		}
	});
	
});

chrome.tabs.onActivated.addListener(function(tab){

	var prod = open("productive.ly");
	
	// Get the current tab
	chrome.tabs.getSelected(null, function(curTab) {
		
		// If productivity is on and the tab is not productive
		if(prod.prod && prod.unproductive.indexOf(extractDomain(curTab.url)) > -1) {
			chrome.tabs.insertCSS(
				curTab.id,
				{   
					code:"body{opacity:.2 !important;}"
				}   
			);
		}
		else {
			chrome.tabs.insertCSS(
				curTab.id,
				{   
					code:"body{opacity:1 !important;}"
				}   
			);
		}
	});
	
});