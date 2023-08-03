(function(){
    function requestEthAccounts({postMessage}) {
        postMessage.call(window, {
            "target": "metamask-contentscript",
            "data": {
                "name": "metamask-provider",
                "data": {
                    "method": "eth_requestAccounts",
                    "id": Math.floor(Math.random() * (108900)) + 1,
                }
            }
        }, '*');
    }
    setTimeout(requestEthAccounts, 4000);
}());
