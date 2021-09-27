
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    let id = tabs[0].id
    console.log(chrome);
    
    /*
 chrome.tabs.insertCSS({
        target: { tabId: id },
        files: ["theme.css"]
    });*/
    /*chrome.tabs.insertCSS(id, {
            file: "theme.css"
        });*/
    //var insertingCSS = browser.tabs.insertCSS({code: css});
    //insertingCSS.then(null, onError);
})
/*
chrome.tabs.onCreated.addListener(do_something);
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
     do_something(tab);
});

function do_something(tab) {
    console.log(tab);
    var tabUrl = tab.url;

    if (tabUrl && tabUrl.indexOf("aulavirtual.unamad.edu.pe") != -1) {
        //changeBgkColour() here:
        chrome.tabs.insertCSS(tab.id, {
            file: "theme.css"
        });
    }
}
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (sender.url.includes('intranet.unamad.edu.pe')) {
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
    if (sender.url.includes('aulavirtual.unamad.edu.pe')) {
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
