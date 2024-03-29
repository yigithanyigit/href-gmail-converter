// Get the current tab URL
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = new URL(tabs[0].url);
    const site = url.hostname;
    chrome.storage.sync.get('enabledSites', function(data) {
        const enabledSites = data.enabledSites || [];
        document.getElementById('toggleExtension').checked = enabledSites.includes(site);
    });
    document.getElementById('toggleExtension').addEventListener('change', (event) => {
        chrome.storage.sync.get('enabledSites', function(data) {
            let enabledSites = data.enabledSites || [];
            if (event.target.checked) {
                if (!enabledSites.includes(site)) {
                    enabledSites.push(site);
                }
            } else {
                enabledSites = enabledSites.filter(s => s !== site);
            }
            chrome.storage.sync.set({enabledSites: enabledSites}, function() {
                console.log('Enabled sites are set to ' + JSON.stringify(enabledSites));
            });
        });
    });
});