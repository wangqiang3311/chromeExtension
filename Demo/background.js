//调用connectToNativeHost函数连接到本地程序，完成后使用port.postMessage函数将纤细传递给应用程序
//将信息写入I/O流与本地程序通信
function getClickHandler() {
      return function(info, tab) { 
	  
	    console.log(info);
		console.log(tab);

		chrome.tabs.sendMessage(tab.id, {"cmd": "html"}, function(response) {
		console.log(response);
	    connectToNative(response);
	});

   };
};

//在浏览器启动时即创建右键菜单，在页面链接上右击鼠标会显示该菜单，当点击"start program"的时候就会调用getClickHandler（）函数处理
 chrome.contextMenus.create({
    "title" : "noteFirst",
    "type" : "normal",
     "id": "callapp",
    "contexts" : ["page"],
     "enabled": true,
    "onclick" : getClickHandler()
});



var host_name = "com.google.chrome.demo";
var port = null;


function connectToNative(message) {
    console.log('Connecting to native host: ' + host_name);
    port = chrome.runtime.connectNative(host_name);
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
    sendNativeMessage(message);
}

function sendNativeMessage(msg) {
    message = {"text" : msg};
    console.log('Sending message to native app: ' + JSON.stringify(message));
    port.postMessage(message);
    console.log('Sent message to native app: ' + msg);
}

function onNativeMessage(message) {
    console.log('recieved message from native app: ' + JSON.stringify(message));
}

function onDisconnected() {
    console.log(chrome.runtime.lastError);
    console.log('disconnected from native app.');
    port = null;
}