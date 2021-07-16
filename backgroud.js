chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({ url: "thanks.html" });
});

function lists() {
    fetch("https://raw.githubusercontent.com/StevenBlack/hosts/master/data/StevenBlack/hosts")
    .then(function(response) {
    response.text().then(function(text) {
        var final_pls = text.replaceAll("0.0.0.0 ", "");
        final_pls = final_pls.replaceAll('/^.*#.*$/mg, ";', "")
        final = final_pls.split("\n");
        final = final.filter(function(value) {
            return value.indexOf('#') < 0;
        });
        console.log(final);
        final = final.filter(item => item);
        console.log(final);
        for (let i = 0; i < final.length; i++) {
            let url_h = "*://".concat(final[i]);
            url_h = url_h.concat("/*")
            final[i] = url_h;
        }
        console.log(final);
        chrome.webRequest.onBeforeRequest.addListener(
            function () { return { cancel: true }},
            { urls: final},
            ["blocking"]
        )
    });
  });
}

lists()


