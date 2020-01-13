var contextMenuItem = {
	"id" : "SeeMeaning",
	"title": "See meaning",
	"contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId == "SeeMeaning" && clickData.selectionText){
		
		

		var xhr = new XMLHttpRequest();
		xhr.open('GET', "https://dictionaryapi.com/api/v3/references/collegiate/json/"+clickData.selectionText+"?key=e6aacbf3-b030-407f-9670-5bcf7f2f57e0");
		xhr.setRequestHeader("Accept", "application/json");
		xhr.send();

		xhr.addEventListener("readystatechange", processRequest, false);
		function processRequest(e){
			if(xhr.readyState == 4 && xhr.status == 200){
				console.log("request sent");
				var response = xhr.responseText;
				console.log(response);
				x = JSON.parse(response);
				console.log(x);
				var notifOptions = {
					type: 'basic',
					title: 'Word meaning',
					message: "meaning of " + clickData.selectionText + " is " + x[0]["shortdef"],
					iconUrl: 'dict.png',
					
				};		
				chrome.notifications.create('notif', notifOptions);
			}
			else if (xhr.readyState == 4 && xhr.status == 404){
				var notifOptions = {
					type: 'basic',
					title: 'Word meaning',
					message: "Unable to find the meaning of the word",
					iconUrl: 'dict.png',
					
				};		
				chrome.notifications.create('notif', notifOptions);	
			}
		}
		
	}
});