

 function invoke(){
	 
	 chrome.tabs.getSelected(null, function (tab) {

	 chrome.tabs.sendMessage(tab.id, {"cmd": "html"}, function(response) {
		 console.log(response);
		
		 var bg = chrome.extension.getBackgroundPage();
		 bg.connectToNative(response);
  });
});

	
     updateResult("result1", "invoke..");
  }

 
function updateResult(obj, state){
	document.getElementById(obj).innerHTML = state;
}


document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#button1').addEventListener(
      'click', invoke);
});

