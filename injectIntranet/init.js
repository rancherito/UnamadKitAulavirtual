(()=>{
    function htmlToElement(html) {var template = document.createElement('template');html = html.trim();template.innerHTML = html;return template.content.firstChild;}
    let protocol = location.protocol == "https:" ? 'https' : 'http'
    if(window.location.pathname != '/login'){

        document.body.appendChild(htmlToElement(/* html */
            `
            <div id="appvue" style="position: fixed; right: 1rem; top: 1rem; display: flex; align-items: center; z-index: 100">
                <a @click="loadData" style="padding: 1rem; color: #fff; border-radius: .5rem; display: block" class="cd-bg-primary" href="#">
                   <i class="m-menu__link-icon flaticon-calendar-3" style=" margin-right: .5rem;"></i> 
                   {{data.length == 0 ? 'Sincronizando...' : 'HORARIO sincronizado'}}
                </a>
            </div>
            `    
       ) )

        
        const init = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * ((new Date().getDay()) - 1))
        const end = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * (8 - (new Date().getDay())))

        function join(t) {
            return [{day: '2-digit'}, {month: '2-digit'}, {year: 'numeric'}].map((m) => (new Intl.DateTimeFormat('en', m)).format(t)).join('-');
        }

        


        new Vue({
            el: '#appvue',
            data: {
                isLoading: false,
                data: []
            },
            methods: {
                loadData(){
                    this.isLoading = true
                    fetch(protocol + '://intranet.unamad.edu.pe/alumno/horario-semana/get?start='+join(init)+'&end='+join(end)).then(e => e.json()).then(data => {
                        //console.log(data);
                        this.data = data;
                        chrome.runtime.sendMessage(data);
                        this.isLoading = false
                    }).catch( e => {
                        this.isLoading = false
                    })
                }
            },
            created(){
                chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
                    console.log(message);
                });
                this.loadData()
            }
        })
    }
})()