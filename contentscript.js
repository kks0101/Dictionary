 
console.log("content script");
/*var iframe = document.createElement('iframe');
iframe.src = chrome.extension.getURL("modal.html");
//iframe.src = "https://google.co.in"
iframe.frameBorder = 0;
iframe.id = "myFrame";
iframe.height = "400";
$(iframe).show();
$(iframe).appendTo("body");
*/
var div1 = document.createElement('div');
div1.setAttribute('id', 'myModal');
div1.setAttribute('class', 'modal');
var div2 = document.createElement('div');
div2.setAttribute('class', 'modal-content');
/*var span = document.createElement('span');
span.setAttribute('class', 'close');
span.setAttribute*/
var content = document.createElement('p');
content.setAttribute('id', 'displayText')
content.innerHTML = "hello there!";
div2.appendChild(content);
div1.appendChild(div2);
document.body.appendChild(div1);
var modal = document.getElementById("myModal");
window.onclick = function(event){
	if(event.target == modal){
		modal.style.display = "none";
	}
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            switch (request.type){
                case "openModal":
                	
                    console.log(request.message);
                    
                    
                    var xhr = new XMLHttpRequest();
					xhr.open('GET', "https://dictionaryapi.com/api/v3/references/collegiate/json/"+request.message+"?key=e6aacbf3-b030-407f-9670-5bcf7f2f57e0");
					xhr.setRequestHeader("Accept", "application/json");
					xhr.send();

					xhr.addEventListener("readystatechange", processRequest, false);
					function processRequest(e){
						if(xhr.readyState == 4 && xhr.status == 200){
							//console.log("request sent");
							var response = xhr.responseText;
							//console.log(response);
							x = JSON.parse(response);
							//console.log(x);
							var displayMeaning = document.querySelector('.modal-content p');
							displayMeaning.innerHTML = x[0]["shortdef"];
						
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
						var modal = document.getElementById("myModal");
                    	modal.style.display = "block";
					}

                    break;
            }
});


