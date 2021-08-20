(()=>{
    function htmlToElement(html) {var template = document.createElement('template');html = html.trim();template.innerHTML = html;return template.content.firstChild;}
    let protocol = location.protocol == "https:" ? 'https' : 'http'
    if(window.location.pathname != '/login'){

        document.body.appendChild(htmlToElement(/* html */
            `
            <div id="appvue" style="position: fixed; right: 1rem; top: 1rem; display: flex; align-items: center; z-index: 100">
                <a @click="isOpenQr = true" style="padding: 1rem; color: #fff; border-radius: .5rem; display: block; margin-right: .5rem" class="cd-bg-primary" href="#">
                    <i>
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#fff" d="M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z" />
                        </svg>
                    </i> 
                </a>
                <a @click="loadData" style="padding: 1rem; color: #fff; border-radius: .5rem; display: block" class="cd-bg-primary" href="#">
                    <i style="margin-right: .5rem;">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="#fff" d="M18,11V12.5C21.19,12.5 23.09,16.05 21.33,18.71L20.24,17.62C21.06,15.96 19.85,14 18,14V15.5L15.75,13.25L18,11M18,22V20.5C14.81,20.5 12.91,16.95 14.67,14.29L15.76,15.38C14.94,17.04 16.15,19 18,19V17.5L20.25,19.75L18,22M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14C13.36,20.45 12.86,19.77 12.5,19H5V8H19V10.59C19.71,10.7 20.39,10.94 21,11.31V5A2,2 0 0,0 19,3Z" />
                        </svg>
                    </i> 
                    {{data.length == 0 ? 'Sincronizando...' : 'HORARIO sincronizado'}}
                </a>
                <div v-show="isOpenQr" id="wrapqrgenerator" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5);" class="f-c">
                    <div class="qrcontent f-c cd-bg-primary" style="padding: 1rem;border-radius: 1rem;color: white;">

                        <div style="background: white; border-radius: 1rem; padding: 1rem">
                            <div ref="qrplaceholder"></div>
                        </div>
                        <br>
                        <span style="text-align: center">Este código QR es único y solo te pertenece a ti, ¡No lo compartas!<span>
                        <br>
                        
                        <br>
                        <a @click="isOpenQr = false" style="padding: 1rem; color: #fff; border-radius: .5rem; display: block; background: var(--primary-hover)"href="#"> 
                            Cerrar
                        </a>
                    </div>
                </div>
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
                data: [],
                isOpenQr: false
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
                    if (message.qrstring != undefined) {
						let bqr = new QRCode({
							content: message.qrstring,
							width: 400,
							height: 400
						});

						this.$refs.qrplaceholder.innerHTML = bqr.svg()
					}
                });
                this.loadData()
            }
        })
    }
})()