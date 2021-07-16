function lists() {
    // Change this list if you want to block different stuff
    fetch("https://raw.githubusercontent.com/StevenBlack/hosts/master/data/StevenBlack/hosts")
    .then(function(response) {
    response.text().then(function(text) {
        var final_pls = text.replaceAll("0.0.0.0 ", "");
        final_pls = final_pls.replaceAll('/^.*#.*$/mg, ";', "")
        final = final_pls.split("\n");
        final = final.filter(function(value) {
            return value.indexOf('#') < 0;
        });
        final = final.filter(function(value) {
            return value.indexOf('') < 0;
        });
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


