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

/* Structure of the localStorage object

prod: bool
time: int (ms)
timer: bool 
unproductive: Array (of Strings)

*/

localStorage.removeItem("productive.ly");

chrome.tabs.onCreated.addListener(function(tab) {

	var prod = open("productive.ly");

	if(prod.prod) {
	
		chrome.tabs.insertCSS(
			tab.id,
			{   
				code:"body{opacity:.2 !important;}"
			}   
		);
	}
	
});


chrome.tabs.onActivated.addListener(function(tab){

	var prod = open("productive.ly");
	
	if(prod.prod) {
		chrome.tabs.insertCSS(
			tab.id,
			{   
				code:"body{opacity:.2 !important;}"
			}   
		);
	}
	else {
		chrome.tabs.insertCSS(
			tab.id,
			{   
				code:"body{opacity:1 !important;}"
			}   
		);
	}
	
});