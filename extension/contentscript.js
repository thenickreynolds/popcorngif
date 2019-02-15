var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // var iframe = document.createElement('iframe');
    // iframe.src = chrome.runtime.getURL('popup.html');
    // iframe.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);display:block;width:800px;height:500px;z-index:1000;background-color:white;';
    // document.body.appendChild(iframe);

    var icon = chrome.runtime.getURL('icon.png');
    var appendButton = function(elem) {
        var group = document.createElement('div');
        group.className = "toolbar-group";
        group.innerHTML = '<button type="button" tabindex="-1" class="js-toolbar-item toolbar-item tooltipped tooltipped-n" aria-label="Search for a GIF" data-toolbar-hotkey="p" data-trim-first=""><img width="16" src="' + icon + '"/></button>';
        group.onclick = function() { alert("test"); }; // only works for the first one, will need to hook up the others with a watcher or something
        elem.appendChild(group);
    }

    document.querySelectorAll(".toolbar-commenting").forEach(appendButton);
}