// background.js

// Note that the tab.onCreated listener also listens to iFrames...

chrome.tabs.onCreated.addListener(function(tab) {

	var str = localStorage["unproductiveTabs"];
	if(typeof str == 'undefined') {
		str = {};
	}
	else {
		str = JSON.parse(localStorage["unproductiveTabs"]);
	}
	
	if (typeof str[tab.id.toString()] == "undefined" ? false : str[tab.id.toString()] == "1") return;

	var x = confirm("Click OK if this frame is going to be productive.");
	
	if(!x) {
	
		str[tab.id.toString()] = "1";
		localStorage["unproductiveTabs"] = JSON.stringify(str);
		
		chrome.tabs.insertCSS(
			tab.id,
			{   
				code:"body{opacity:.4 !important;}"
			}   
		);
		
	}
	
});


chrome.tabs.onActivated.addListener(function(tab){

	var str = localStorage["unproductiveTabs"];
	
	if(typeof str == 'undefined') {
		return;
	}
	else {
		str = JSON.parse(localStorage["unproductiveTabs"]);
	}
	
	if (typeof str[tab.tabId.toString()] == "undefined") {
		return;
	}
	else {
		if(str[tab.tabId.toString()] != "1") {
			return;
		}
	}
	
	chrome.tabs.insertCSS(
		tab.tabId,
		{   
			code:"body{opacity:.4 !important;}"
		}   
	);
});

chrome.tabs.onUpdated.addListener(function(tabId) {
	
	var str = localStorage["unproductiveTabs"];
	
	if(typeof str == 'undefined') {
		return;
	}
	else {
		str = JSON.parse(localStorage["unproductiveTabs"]);
	}
	
	if (typeof str[tabId.toString()] == "undefined") {
		return;
	}
	else {
		if(str[tabId.toString()] != "1") {
			return;
		}
	}
	
	chrome.tabs.insertCSS(
		tabId,
		{   
			code:"body{opacity:.5 !important;}"
		}   
	);

});