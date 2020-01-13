var contextMenuItem = {
	"id" : "SeeMeaning",
	"title": "See meaning",
	"contexts": ["selection"]
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addLstener(function(clickData){
	if(clickData.menuItemId == "SeeMeaning" && clickData.selectionText){
		
	}
})