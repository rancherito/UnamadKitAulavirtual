(()=>{
    let protocol = location.protocol == "https:" ? 'https' : 'http'
    if(window.location.pathname != '/login'){
        chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
            console.log(message);
        });
        console.log('JMAON CON PANNNNNN');
        const init = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * ((new Date().getDay()) - 1))
        const end = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * (8 - (new Date().getDay())))

        function join(t) {
            return [{day: '2-digit'}, {month: '2-digit'}, {year: 'numeric'}].map((m) => (new Intl.DateTimeFormat('en', m)).format(t)).join('-');
        }

        fetch(protocol + '://intranet.unamad.edu.pe/alumno/horario-semana/get?start='+join(init)+'&end='+join(end)).then(e => e.json()).then(data => {
            //console.log(data);
            chrome.runtime.sendMessage(data);
        })
    }
})()