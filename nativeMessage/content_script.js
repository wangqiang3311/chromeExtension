      chrome.extension.onMessage.addListener(
        function(request, sender, sendMessage) {if (request.cmd == "html")
                sendMessage(document.body.innerHTML);
            else
                sendMessage("FUCK OFF");
        });