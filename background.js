chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (sender.origin.includes('intranet.unamad.edu.pe')) {
        localStorage.setItem('schedule', JSON.stringify(message))
       chrome.cookies.getAllCookieStores(function (cookieStores) {
            let storeid = ''
            for (let x = 0; x < cookieStores.length; x++)
                if (cookieStores[x].tabIds.indexOf(sender.tab.id) != -1) {
                    storeid = cookieStores[x].id;
                    break;
                }
            chrome.cookies.getAll({
                storeId: storeid,
                url: sender.url
            }, (cks) => {
                let spss = cks.find(e => e.name.toUpperCase() == 'INTXAUTH')?.value ?? ''
                chrome.tabs.sendMessage(sender.tab.id, {
                    qrstring: spss
                });
            })

        })
    }
    if (sender.origin.includes('aulavirtual.unamad.edu.pe')) {
        let schedule = localStorage.getItem('schedule') ?? '[]'
        chrome.tabs.sendMessage(sender.tab.id, {
            schedule: JSON.parse(schedule)
        });

        chrome.cookies.getAllCookieStores(function (cookieStores) {
            let storeid = ''
            for (let x = 0; x < cookieStores.length; x++)
                if (cookieStores[x].tabIds.indexOf(sender.tab.id) != -1) {
                    storeid = cookieStores[x].id;
                    break;
                }
            chrome.cookies.getAll({
                storeId: storeid,
                url: sender.url
            }, (cks) => {
                let spss = cks.find(e => e.name.toUpperCase() == 'LAUXAUTH')?.value ?? ''
                chrome.tabs.sendMessage(sender.tab.id, {
                    qrstring: spss
                });
            })

        })
    }


    return true
});
