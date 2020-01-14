var contextMenuItem = {
	"id" : "SeeMeaning",
	"title": "See meaning",
	"contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId == "SeeMeaning" && clickData.selectionText){
		
			console.log(clickData.selectionText);
		  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		   chrome.tabs.sendMessage(tabs[0].id, {type: "openModal", message: clickData.selectionText});
		  });
		

		
		
	}
});