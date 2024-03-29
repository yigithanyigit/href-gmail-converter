chrome.runtime.sendMessage({message: "getTabUrl"}, function(response) {
    const url = new URL(response.url);
    const site = url.hostname;

    chrome.storage.sync.get('enabledSites', function(data) {
        const enabledSites = data.enabledSites || [];
        if (enabledSites.includes(site)) {
            alert('Href to Gmail is enabled!');
            const mailtoLinks = document.querySelectorAll('a[href^="mailto:"]');
            mailtoLinks.forEach(mailtoLink => {
                console.log('Mailto link:', mailtoLink);
                const mailtoParts = mailtoLink.href.split(':');
                const emailAndParameters = mailtoParts.length > 1 ? mailtoParts[1] : '';
                const emailParts = emailAndParameters.split('?');
                const emailAddress = emailParts[0];
                let emailParameters = emailParts.length > 1 ? emailParts[1] : '';
                emailParameters = emailParameters.replace('subject', 'su');
                mailtoLink.href = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=' + emailAddress + '&' + emailParameters;
            });
        }
    });
});