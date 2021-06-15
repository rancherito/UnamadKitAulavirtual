(() => {
	let protocol = location.protocol == "https:" ? 'https' : 'http'
	if(window.location.pathname != '/login'){

	/*{
		let wrapper = htmlToElement(`<div class="cd-anunces"></div>`);
		let anunces = document.querySelectorAll('.page-content>.ng-scope > *:nth-child(2) > .row')[0]
		anunces.parentNode.appendChild(wrapper);
		wrapper.appendChild(anunces)
	}*/
	document.head.appendChild(htmlToElement('<link rel="stylesheet" href="https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css">'))
	document.head.appendChild(htmlToElement('<link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet"></link>'))

	document.body.appendChild(htmlToElement(
		/*html*/
	`<div id="vueapp">
		<div v-if="applyNewStyle" v-html="styleAula"></div>
		<a id="cd-btn-modal" @click="applyNewStyle = !applyNewStyle" href="#" style="bottom: 6rem; background: var(--panel)">
			<i class="mdi" :class="applyNewStyle ? 'mdi-invert-colors-off' : 'mdi-format-color-fill'"></i>
		</a>
		<a id="cd-btn-modal" @click="modal.enable = !modal.enable" href="#">
			<span v-if="actividities">{{actividities}}</span>
			<i class="mdi mdi-school"></i>
		</a>
		<div id="modelinject" class="acd-fadeOut" style="display: none;" v-show="modal.enable">
			<div @click="modal.enable = false" style="flex: 1; height: 100%"></div>
			<div ref="modal" class="cd-dialog">
				
				
				<div class="cd-dialog-actions-top">
					<div class="mdl-typography--headline" style="color: white">{{modulesTitles[tabposition]}}</div>
					<div style="display: flex">
						<a href="#" class="f-c mdl-button mdl-button--icon" :class="tabposition == -1 ? 'active' : ''" @click="tabposition = -1">
							<i class="mdi mdi-information mdi-24px f-c"></i>
						</a>
						<a href="#" @click="loadCourses" class="f-c mdl-button mdl-button--icon" :disabled="updating">
							<i class="mdi mdi-reload mdi-24px f-c" :class="updating ? 'mdi-spin' : ''"></i>
						</a>
						
						<a href="#" @click="modal.enable = !modal.enable" class="f-c mdl-button mdl-button--icon">
							<i class="mdi mdi-close mdi-24px f-c"></i>
						</a>
					</div>
					
				</div>

				
				
				<div style="flex: 1;">
					<div class="mdl-dialog__content" v-show="tabposition == -1">
						<vcd-info/>
					</div>
					
					<div class="mdl-dialog__content f-c" style="height: 100%" v-show="tabposition == 'qr'">
						<div style="background: white; border-radius: 1rem; padding: 1rem">
							<div ref="qrplaceholder"></div>
						</div>
						<br>
						<span>NO compartas este codigo QR<span>
						
					</div>
					<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 0">
						<div v-for="course in courses_list" class="cd-list">
							<i class="cd-list-icon mdi" :class="course.homeworks.isUpdating || course.forums.isUpdating|| course.conferencesUpdating ? 'mdi-loading mdi-spin' : 'mdi-book'"></i>
							<div class="cd-list-content">
								<div class="cd-list-title">{{course.name}}</div>
								<div 
									class="cd-list-subtitle2" 
									v-if="course.homeworks.count + course.forums.count + course.conferences">

									<span v-if="course.homeworks.count" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Tareas: ' + course.homeworks.count}}</span>
									</span>
									<span v-if="course.forums.count" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Foros: ' + course.forums.count}}</span>
									</span>
									<span v-if="course.conferences" class="mdl-chip mdl-chip-sm">
										<span class="mdl-chip__text">{{'Confer.: ' + course.conferences}}</span>
									</span>
								</div>
								
								<div class="cd-list-subtitle2" v-else>
									<span style="height: 24px; display: block">Sin actividades pendientes</span>
								</div>
							</div>
						</div>
						
					</div>
					<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 1">
						<div v-if="homeworks_list.get.length + homeworks_list.archived.length">
							<vcd-helper-list></vcd-helper-list>
							<vcd-homework v-for="homework in homeworks_list.get" :data="homework"></vcd-homework>
							<vcd-homework class="acd-fadeOut" v-for="homework in homeworks_list.archived" :data="homework"></vcd-homework>
							<!--
							//BOTON PAR OCULPTAR TAREAS REALIZADAS
							<div class="cd-btn-archived" :class="{'cd-bg-secondary': homeworks.viewArchived}" @click="homeworks.viewArchived = !homeworks.viewArchived">
								<span v-show="!homeworks.viewArchived">{{homeworks_list.archived.length}}</span>
								{{homeworks.viewArchived ? 'Ocultar Realizados' : 'Ver Realizados'}}
							</div>-->
							
						</div>
						<vcd-void-box v-else text="tareas"></vcd-void-box>
					</div>

					<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 2">
						<div v-if="conferences_list.length">
							<vcd-helper-list></vcd-helper-list>
							<vcd-conference v-for="(conference, i) in conferences_list" :data="conference"></vcd-conference>
						</div>
						<vcd-void-box v-else text="coferencias"></vcd-void-box>
						
					</div>
					<div class="mdl-dialog__content acd-fadeOut" v-show="tabposition == 3">
						<div v-if="forums_list.get.length">
							<vcd-helper-list></vcd-helper-list>
							<vcd-forums v-for="forum in forums_list.get" :data="forum"></vcd-forums>
							<vcd-forums v-for="forum in forums_list.archived" :data="forum"></vcd-forums>
						</div>
						<vcd-void-box v-else text="foros"></vcd-void-box>
					</div>
				</div>
				<div class="cd-tabsbox">
					<a href="#" class="cd-nav-btn" :class="tabposition == 0 ? 'active' : ''" @click="tabposition = 0">
						<div>
							<b>{{courses_list.length}}</b>
							<i class="mdi mdi-book"></i>
						</div>
						<span>Cursos</span>
					</a>
					
					<a href="#" class="cd-nav-btn" :class="tabposition == 1 ? 'active' : ''" @click="tabposition = 1">
						<div>
							<b v-show="homeworks_list.get.length">{{homeworks_list.get.length}}</b>
							<i class="mdi mdi-bag-personal"></i>
						</div>
						<span>Tareas</span>
					</a>
					
					<a href="#" class="cd-nav-btn" :class="tabposition == 2 ? 'active' : ''" @click="tabposition = 2">
						<div>
							<b v-show="conferences_list.length">{{conferences_list.length}}</b>
							<i class="mdi mdi-message-video"></i>
						</div>
						<span >Conferencias</span>
					</a>
					
					<a href="#" class="cd-nav-btn" :class="tabposition == 3? 'active' : ''" @click="tabposition = 3">
						<div>
							<b v-show="forums_list.get.length">{{forums_list.get.length}}</b>
							<i class="mdi mdi-forum"></i>
						</div>
						<span>Foros</span>
					</a>
				
				</div>
			</div>
		</div>
	</div>
		`
	))

	
	
	
	let defdata = createStorage({
		modal: {
			enable: true
		}, 
		courses: {
			list: []
		},
		homeworks: {
			list: []
		},
		conferences:{
			list: []
		},
		forums: {
			list: []
		},
		tabposition: 0,
		internetDate: null,
		localDate: null,
		user: null,
		applyNewStyle: false
	})
	

	new Vue({
		el: '#vueapp',
		data: {
			...defdata.variables,
			months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
			updating: false, 
			protocol: protocol,
			modulesTitles: {
				'-1': 'Info', 
				0: 'Lista de cursos', 
				1: 'Tareas pendientes', 
				2: 'Conferencias', 
				3: 'Lista de Foros', 
				'qr': 'Generar Llave'
			},
			icon_link: 'mdi-cursor-pointer',
			now: (new Date()).getTime(),
			styleAula: styleAula
		},
		computed: {
			homeworks_list(){
				const l = [...this.homeworks.list].sort((a,b) => a.dateEnd > b.dateEnd ? 1 : -1)

				let l_info = {get: [], archived: []}
				l.forEach(e => {
					if (e.homeworkstds) l_info.archived.push(e)
					else l_info.get.push(e)
				});

				return l_info
			},
			conferences_list(){
				return [...this.conferences.list].sort((a,b) => a.endTime > b.endTime ? 1 : -1)
			},
			courses_list(){
				return [...this.courses.list].sort((a,b) => (b.homeworks.count + b.forums.count + b.conferences) - (a.homeworks.count + a.forums.count + a.conferences))
			},
			forums_list(){
				const l = [...this.forums.list].sort((a,b) => a.dateEnd > b.dateEnd ? 1 : -1)
				let l_info = {get: [], archived: []}
				l.forEach(e => {
					if (e.participations) l_info.archived.push(e)
					else l_info.get.push(e)
				});
				return l_info
			},
			actividities(){
				return this.homeworks_list.get.length + this.conferences_list.length +  this.forums_list.get.length
			}
		},
		watch: {
			...defdata.mutations,
		},
		methods: {
			addZeroTime(num){
				return (num > 9 ? '' : '0')+num
			},
			calculeNow(){
				//console.log('calcule time');
				//console.log(this.$root.internetDate);
				if (this.internetDate != null && this.localDate != null) this.now = this.$root.internetDate + (new Date().getTime() - this.$root.localDate);
			},
			dateDiffInDays(a, b) {
				const _MS_PER_DAY = 1000 * 60
				if (typeof a == 'string') a = new Date(a)
				if (typeof b == 'string') b = new Date(b)

				const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
				const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());
				return Math.floor((utc2 - utc1) / _MS_PER_DAY);
			},
			getCookie(name) {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) return parts.pop().split(';').shift();
			},
			async loadConferences(){
				let listconferences = []
				for (let course of this.courses.list) {
					course.conferences = 0
					course.conferencesUpdating = !0

					let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/conference/list?s=' + course.sectionId);
					if (response.ok) {
						(await response.json()).forEach(conference => {
							let a = new RegExp("^(http|https)://", "i")
							if (!a.test(conference.url)) conference.url = 'https://' + conference.url
							conference.sectionId = course.sectionId
							conference.nameCourse = course.name
							if(conference.state != "Finalizado") {listconferences.push(conference); course.conferences++}
						});
					}
					course.conferencesUpdating = !1
				}
				this.conferences.list = listconferences

			},
			async loadHomeworks(){
				var listhomework = []
				
				for (let course of this.courses.list) {
					course.homeworks.isUpdating = !0
					course.homeworks.count = 0
					let res = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/homework/list?s=' + course.sectionId);
					if(res.ok){
						(await res.json()).forEach(task => {
							let [date, hour] = task.dateEnd.split(' ');
							let [day, mount, year] = date.split('/')

							task.dateEndCustom = `${year}-${mount}-${day}T${hour}`;
							
							[date, hour] = task.dateBegin.split(' ');
							[day, mount, year] = date.split('/')

							task.dateBeginCustom = `${year}-${mount}-${day}T${hour}`;
							task.sectionId = course.sectionId
							task.nameCourse = course.name

							if (task.state == 'ACT') {
								listhomework.push(task); 
								if(task.homeworkstds == 0) course.homeworks.count++
							}
						});
					}
					course.homeworks.isUpdating = !1
				}
				this.homeworks.list = listhomework


			},
			async loadForums(){
				let listforums = []
				for (const course of this.courses.list) {
					course.forums.count = 0
					course.forums.isUpdating = !0
					let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/list?s=' + course.sectionId)
					if (response.ok) {
						for (const forum of (await response.json())) {
							forum.sectionId = course.sectionId
							forum.nameCourse = course.name
							forum.participations = 0
							if(forum.state){

								listforums.push(forum);

								//VERIFICAMOS SI HAY PARTICIPACIONES NUESTRAS EN LOS FOROS DE ANTERIORES PETICIONES, SI LAS HAY, NO LAS VERIFICAMOS, Y SI NO, LAS VERIFICAMOS
								let countParticipations = this.forums.list.find(e => e.forumId == forum.forumId)?.participations ?? 0
								if (countParticipations) forum.participations = countParticipations
								else {
									let resFourms = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/detail?f=' + forum.forumId);
									if (resFourms.ok) {
										const d = await resFourms.json()
										for (const val of d.pages) {

											let resForumPage = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/forum/answers/list?f='+ d.forumId +'&page=' + val)
											if(resForumPage.ok){
												(await resForumPage.json()).forEach(page => {
													if (page.userName.toLowerCase().replace(/\s/g, '') == this.user.name.toLowerCase().replace(/\s/g, '')) forum.participations++
												})
											}
											
											
										}
									}
								}

								if (forum.participations == 0) course.forums.count++

							}
						}
					}
					course.forums.isUpdating = !1
				}
				this.forums.list = listforums;
				
			},
			loadData2(){
				this.loadConferences()
				this.loadHomeworks()
				this.loadForums()
			},
			async loadCourses(){

				this.updating = true
				let response = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/system/courseinrole')
				if (response.ok) {
					response.json().then(data => {
						this.updating = false
						this.courses.list = data.map(d => {return {
							homeworks: {
								isUpdating: !1,
								count: 0,
								viewArchived: !1
							},
							forums: {
								isUpdating: !1,
								count: 0,
								viewArchived: !1
							},
							conferencesUpdating: !1, conferences: 0, 
							...d
						}})
						this.loadData2()
					})
				}
			}
		},

		async created(){
			this.calculeNow()
			setInterval(this.calculeNow, 1000)

			if(this.user == null){
				let responseGetUser = await fetch(this.protocol + '://aulavirtual.unamad.edu.pe/web/user/info/data')
				if (responseGetUser.ok) this.user = await responseGetUser.json()
				
			}
			

			fetch(this.protocol + '://campus.unamad.edu.pe/timeutc').then(res => res.json()).then(data=>{
				///console.log(typeof data, data);
				const pre_utc = new Date((data.currentFileTime/10000 - 11644473600000) - (1000 * 60 * 60 * 5))
				this.internetDate = (new Date(`${pre_utc.getUTCFullYear()}-${this.addZeroTime(pre_utc.getUTCMonth() + 1)}-${this.addZeroTime(pre_utc.getUTCDate())}T${this.addZeroTime(pre_utc.getUTCHours())}:${this.addZeroTime(pre_utc.getUTCMinutes())}:${this.addZeroTime(pre_utc.getUTCSeconds())}`)).getTime();
				this.localDate = (new Date()).getTime();
			}).catch( e => {
				console.log('ERROR');
				this.internetDate = (new Date()).getTime();
				this.localDate = (new Date()).getTime();
			})
			this.loadCourses()
			setInterval(()=>{
				
				console.log('Update Data');
				this.loadData2()
				
			}, 1000 * 90)
		},
		mounted(){
		}
	})
}
	
})();
